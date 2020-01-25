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
