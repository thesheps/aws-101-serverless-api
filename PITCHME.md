# AWS 101: Serverless APIs

---

## INTRODUCTION!

![IMAGE](assets/img/cloud.jpg)

---

## DISAMBIGUATION!

### /dɪsamˈbɪɡjʊeɪt/ʃ(ə)n/

@css[text-white fragment](AWS)
@css[text-white fragment](Serverless)
@css[text-white fragment](IAM)
@css[text-white fragment](Lambda)
@css[text-white fragment](API Gateway)

---

## RECIPES!

![IMAGE](assets/img/chef.png)

---

## Recipe 01 - The AWS Console

- Point 'n' Click Infra
- Easy to create (and destroy!)
- Understand before you code

---

### The Lambda

> ... lets you run code without provisioning or managing servers. You pay only for the compute time you consume.

---

![IMAGE](./01-aws-console/assets/img/lambda-home.png)

---

![IMAGE](./01-aws-console/assets/img/lambda-create.png)

---

![IMAGE](./01-aws-console/assets/img/lambda-success.png)

---

### The Api Gateway

> ... is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.

---

![IMAGE](./01-aws-console/assets/img/api-gateway-home.png)

---

![IMAGE](./01-aws-console/assets/img/api-gateway-create.png)

---

![IMAGE](./01-aws-console/assets/img/api-gateway-proxy.png)

---

![IMAGE](./01-aws-console/assets/img/api-gateway-description.png)

---

```json
{
  "statusCode": 200,
  "body": "\"Hello, World!\""
}
```

---

```bash
$ curl https://XXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/prod/
"Hello, World!"
```

---

## Recipe 02 - The AWS CLI

- Reproducible
- Automated
- Version-controlled

---

### Create the Lambda

- Create a Lambda Execution Role

```bash
aws iam create-role \
    --role-name hello-world-lambda \
    --assume-role-policy-document file://assets/code/lambda-execution-trust-policy.json
```

- Create Function

```bash
aws lambda create-function \
    --function-name helloWorld \
    --runtime nodejs12.x \
    --zip-file fileb://assets/code/hello-world.zip \
    --handler hello-world.handler \
    --role arn:aws:iam::XXXXXXXXXXXX:role/hello-world
```

---

### Create the Api Gateway

1. Create the Rest API

```bash
aws apigateway create-rest-api \
    --name 'Hello World' \
    --endpoint-configuration types=REGIONAL
```

2. Get the Root Resource

```bash
aws apigateway get-resources \
    --rest-api-id XXXXXXXXXX
```

3. Create an HTTP Method

```bash
aws apigateway put-method \
    --rest-api-id XXXXXXXXXX \
    --http-method ANY \
    --resource-id XXXXXXXXXX \
    --authorization-type NONE
```

---

4. Define an Api Gateway Execution Role

```bash
aws iam create-role \
    --role-name hello-world-api-gateway \
    --assume-role-policy-document file://assets/code/api-gateway-execution-trust-policy.json
```

5. Define a Lambda Execution Policy

```bash
aws iam create-policy \
    --policy-name invoke-lambda \
    --policy-document file://assets/code/invoke-lambda-policy.json
```

---

6. Attach the Policy to the Api Gateway Role

```bash
aws iam attach-role-policy \
    --role-name hello-world-api-gateway \
    --policy-arn arn:aws:iam::XXXXXXXXXXXX:policy/invoke-lambda
```

7. Attach the Lambda to the Api Gateway

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

## Recipe 03 - The AWS CDK

- Programmatic
- Portable
- Unit Testable

---

## Recipe 04 - Terraform

- Declarative
- Agnostic
- Stateful

---

## Thank you for coming to my TED Talk
