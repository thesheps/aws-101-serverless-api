# The API Gateway

Right. We've used the CLI to clean up our `Lambda` from [Recipe #1](../01-aws-console/README.md), we've then used the CLI to create a role and our simple Lambda! Shall we use the CLI to define our API Gateway, too?

Let's.

## Tidying Up

```bash
aws apigateway get-rest-apis
```

**OUTPUT**:

```json
{
  "items": [
    {
      "id": "XXXXXXXXXXX",
      "name": "Hello World",
      "createdDate": 1578841436,
      "apiKeySource": "HEADER",
      "endpointConfiguration": {
        "types": ["REGIONAL"]
      }
    }
  ]
}
```

1. Let's use the CLI to destroy this ApiGateway so we can re-create it from scratch. Go ahead and run in the following terminal command: (note the id indicated in the above output).

`aws apigateway delete-rest-api --rest-api-id XXXXXXXXXXX`

2. If you list the rest-apis you should now be presented with an empty list:

```json
{
  "items": []
}
```

## Creating the ApiGateway

1. Let's go ahead and recreate the _exact_ Api Gateway we had from the previous exercise. Open up your terminal and run in the following AWS instructions:

```bash
aws apigateway create-rest-api --name 'Hello World' --endpoint-configuration types=REGIONAL
```

**OUTPUT**:

```json
{
  "id": "XXXXXXXXXX",
  "name": "Hello World",
  "createdDate": 1578847631,
  "apiKeySource": "HEADER",
  "endpointConfiguration": {
    "types": ["REGIONAL"]
  }
}
```

Here we're using the `create-rest-api` method of the `apigateway` resource, and specifying the REGIONAL endpoint-configuration. These details match one-for-one the parameters we specified in [Recipe #1](../01-aws-console/README.md).

2. Now we have an ApiGateway created, we can create the HTTP Method, and configure it to proxy its call to our Lambda! The first thing we need if we're to create an HTTP method is an existing `ApiGateway Resource` to create it against. Luckily our previous command has created one of those for us already.

:mega: **NOTE**: For more information on `ApiGateway Resources`, please [go here](https://docs.aws.amazon.com/apigateway/api-reference/resource/).

`aws apigateway get-resources --rest-api-id XXXXXXXXXX`

**OUTPUT**:

```json
{
  "items": [
    {
      "id": "XXXXXXXXXX",
      "path": "/"
    }
  ]
}
```

Ok, now that we've obtained the `Resource`, we can go ahead and define a `Method` against it, and configure it to integrate with our Lambda!

```bash
aws apigateway put-method \
    --rest-api-id XXXXXXXXXX \
    --http-method ANY \
    --resource-id XXXXXXXXXX \
    --authorization-type NONE
```

**OUTPUT**:

```json
{
  "httpMethod": "ANY",
  "authorizationType": "NONE",
  "apiKeyRequired": false
}
```

Cool! Ok, almost there. The next piece of the puzzle is slightly more involved, so we'll talk through what we're doing and what the result of this operation is. You're first going to need the `Arn` of your Lambda. Grab your terminal, and list your functions!

`aws lambda list-functions`

**OUTPUT**:

```json
{
  "Functions": [
    {
      "FunctionName": "helloWorld",
      "FunctionArn": "arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:helloWorld",
      ...
    }
  ]
}
```

Make sure to take a note of this `FunctionArn`, we're going to need this when we create our Lambda integration.

## More Roles Shenanigans

Right now if we attach our `Lambda` to our `ApiGateway` unfortunately the default execution role of the `ApiGateway` will not have sufficient permissions to execute the Lambda! We need to fix this, luckily the `IAM` service of the AWS CLI can help us here:

1. Create the Api Gateway Execution Role

```bash
aws iam create-role \
    --role-name hello-world-api-gateway \
    --assume-role-policy-document file://assets/api-gateway-execution-trust-policy.json
```

**OUTPUT**:

```json
{
  "Role": {
    "Path": "/",
    "RoleName": "hello-world-api-gateway",
    "RoleId": "AROAZMPVF3OVSMBOTM66S",
    "Arn": "arn:aws:iam::XXXXXXXXXXXX:role/hello-world-api-gateway"
  }
  ...
}
```

2. Create the Lambda Invocation Policy

```bash
aws iam create-policy \
    --policy-name invoke-lambda \
    --policy-document file://assets/invoke-lambda-policy.json
```

**OUTPUT**:

```json
{
    "Policy": {
        "PolicyName": "invoke-lambda",
        "PolicyId": "XXXXXXXXXXXXXXXXXXXXX",
        "Arn": "arn:aws:iam::XXXXXXXXXXXX:policy/invoke-lambda",
        ...
    }
}
```

3. Attach the invoke-lambda policy to our ApiGateway execution role

```bash
aws iam attach-role-policy \
    --role-name hello-world-api-gateway \
    --policy-arn arn:aws:iam::XXXXXXXXXXXX:policy/invoke-lambda
```

If this is successful there should be no further output.

## Create ApiGateway/Lambda Integration

Right. Now we have everything in place we can now use the `put-integration` to update our `ANY` Api Gateway method with an integration to our Lambda:

```bash
aws apigateway put-integration
    --rest-api-id XXXXXXXXXX
    --resource-id XXXXXXXXXX
    --http-method ANY
    --integration-http-method POST
    --type AWS_PROXY
    --credentials arn:aws:iam::XXXXXXXXXXXX:role/hello-world-api-gateway
    --uri arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:helloWorld/invocations
```

As before, we're configuring our integration against known AWS resources and selecting the `ANY` http method created in the previous step. All the other parameters we're specifying are outputs from the previous steps (`rest-api-id`, `resource-id` and `credentials`). The `--uri` line looks _super_ complicated, but essentially all we're doing here is providing a full Uri execution path to the Lambda. It's pretty well documented [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-integration-types.html), so take a look!

## Deploying the API

Let's recap...

We've:

- Created our `Lambda`.
- Created our `ApiGateway`.
- Updated our default `Resource` with a single `ANY` Http Method.
- Created a new `ApiGateway` execution role with the permission to invoke `Lambdas`.
- Provided an integration between the `ApiGateway` and our `Lambda`.

Everything is in order, looks like we can get our API deployed and tested!

`aws apigateway create-deployment --rest-api-id XXXXXXXXXX --stage-name test`

**OUTPUT**:

```json
{
  "id": "v3i8eh",
  "createdDate": 1578851197
}
```

Looks like the API is deployed! So what's its Url? Every `ApiGateway` Rest Api can be discovered providing you know the unique ID belonging to the RestApi: `https://{RestApiId}.execute-api.{Region}.amazonaws.com/{Stage}`

So curl it!

`curl https://XXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/test`

**OUTPUT**:
`"Hello, World!"`

Neat, huh?

## Wrapping Up

Well done for making it this far! The purpose of this exercise was to drive home just _how much stuff_ AWS can do for you, but also an opportunity to peek behind the curtain of just how many moving parts there are behind some of the services in the AWS catalogue, and how much heavy-lifting you need to do using the default CLI to build a simple API.

The next few exercises explore `AWS Abstractions`. In answer to the complexities of AWS resource creation there now exist a number of so-called `IaC` (**I**nfrastructure **A**s **C**ode) libraries that hide away a lot of these underlying API calls, instead allowing you to concentrate on _Building The Solution_, rather than having to write an infinite amount of shell scripts...

[Get cracking!](../03-aws-cdk)
