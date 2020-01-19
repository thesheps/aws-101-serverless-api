# The Lambda

Similarly to the first Recipe, our first task here is to create our helloWorld Lambda which will return our simple `Hello, World!` message. We're going to do this using the AWS CLI, so first let's make sure everything is working as expected:

```bash
aws lambda list-functions
```

As before this should reward you with a list of the functions currently deployed to your AWS account in the default region. If you've not tidied up after the previous exercise, this will list the previously-deployed helloWorld Lambda:

```json
"Functions": [
    {
        "FunctionName": "helloWorld",
        "FunctionArn": "arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:helloWorld",
        "Runtime": "nodejs12.x",
        "Role": "arn:aws:iam::XXXXXXXXXXXX:role/service-role/helloWorld-role-XXXXXXXX",
        "Handler": "index.handler",
        ...
    }
]
```

:mega: **NOTE**: for _any_ of the commands you execute using the AWS CLI you can specify the `help` argument which generates a man page for whichever [sub]command you are executing. If you're ever unsure about what a command does, just add help to the end of the command!

1. Let's use the CLI to destroy this Lambda so we can re-create it from scratch. Go ahead and run in the following terminal command:

`aws lambda delete-function --function-name helloWorld`

2. If you list the functions you should now be presented with an empty list:

```json
{
  "Functions": []
}
```

3. Let's go ahead and recreate the _exact_ function we had from the previous exercise. Open up your terminal and run in the following AWS instructions:

```bash
aws lambda create-function \
    --function-name helloWorld \
    --runtime nodejs12.x \
    --zip-file fileb://assets/hello-world.zip \
    --handler hello-world.handler
```

Here we're using the `create-function` method of the `lambda` resource, and specifying the `nodejs 12.x` runtime. We've zipped up the hello-world.js script file and are calling out the name of the function handler as hello-world.handler. These details match one-for-one the parameters we specified in [Recipe #1](../01-aws-console/README.md).

Once you've entered this CLI command, you'll be presented with the following error:

`aws: error: the following arguments are required: --role`

Hmm. Looks like the AWS console did this for us in the background in [Recipe #1](../01-aws-console/README.md)? We're going to have to manually configure this ourselves before we can get any further!

:mega: **NOTE**: A word on _Roles_. As mentioned earlier in this series - Users, Groups, Roles and Policies are out of scope for this module, suffice to say that the Lambda we're creating here needs to have an `execution role` defined for it to run. This tells the Lambda what it _can_ and _can't_ do. For the purposes of this exercise our Lambda is very, very stupid, so we're going to go ahead and create a new IAM role that has no permissions at all!

## Create Lambda Execution Role

1. Go ahead and use the `create-role` method of the aws-cli to help you out with this. Here we're specifying the `role-name` of "hello-world" and are specifying an `assume-role-policy-document` using the provided .json policy document. This defines a `Trust Relationship` between the `Role` we're creating and the `Lambda` we're creating to _assume that role_. Don't worry too much about what this means right now.

```bash
aws iam create-role \
    --role-name hello-world-lambda \
    --assume-role-policy-document file://assets/lambda-execution-trust-policy.json
```

If this is successful, you should see some output that looks similar to the following:

```json
{
  "Role": {
    "Path": "/",
    "RoleName": "hello-world",
    "RoleId": "REDACTEDROLEID",
    "Arn": "arn:aws:iam::XXXXXXXXXXXX:role/hello-world",
    "CreateDate": "2020-01-12T15:57:07Z",
    "AssumeRolePolicyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Service": ["lambda.amazonaws.com"]
          },
          "Action": ["sts:AssumeRole"]
        }
      ]
    }
  }
}
```

:mega: **NOTE**: You're going to need the `Arn` field for the next step so make sure you copy it somewhere! An `Arn` is the **A**mazon **R**esource **N**ame. Think of it as the unique identifier for any Resource you find in AWS.

## Create the Lambda (part 2!)

Having taken note of the Arn for the previous step, we can now revisit the Lambda creation code from before, appending the newly-created role Arn from the previous step:

```bash
aws lambda create-function \
    --function-name helloWorld \
    --runtime nodejs12.x \
    --zip-file fileb://assets/hello-world.zip \
    --handler hello-world.handler \
    --role arn:aws:iam::XXXXXXXXXXXX:role/hello-world
```

**OUTPUT**:

```json
{
  "FunctionName": "helloWorld",
  "FunctionArn": "arn:aws:lambda:eu-west-1:XXXXXXXXXXXX:function:helloWorld",
  "Runtime": "nodejs12.x",
  "Role": "arn:aws:iam::XXXXXXXXXXXX:role/hello-world",
  "Handler": "hello-world.handler",
  "CodeSize": 288,
  "Description": "",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2020-01-12T16:12:26.612+0000",
  "CodeSha256": "ZglI3MB3j5pAxrSOM8+JI71TbujLe2GXWILVkK9uYE0=",
  "Version": "$LATEST",
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "RevisionId": "47333816-0261-46e6-b66a-6245b7cabf2b",
  "State": "Active",
  "LastUpdateStatus": "Successful"
}
```

Much better!!!

## Testing the Lambda

Why not use the AWS CLI to invoke our Lambda and see if everything is working as expected?

`aws lambda invoke --function-name helloWorld /dev/stdout`

**OUTPUT**:

```json
{
  "statusCode":200,
  "body":"\"Hello, World!\""
}
{
  "StatusCode": 200,
  "ExecutedVersion": "$LATEST"
}
```

:mega: **NOTE**: If you're using Windows you may have to substitute `/dev/stdout` for an output filename!

If everything is looking good: [go here to continue your journey!](./03-create-api-gateway.md)
