# Api Gateway

Shall we go ahead and create the `Api Gateway`??

```terraform
resource "aws_api_gateway_rest_api" "hello_world" {
  name = "Hello World"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_method" "any" {
  rest_api_id   = aws_api_gateway_rest_api.hello_world.id
  resource_id   = aws_api_gateway_rest_api.hello_world.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id             = aws_api_gateway_rest_api.hello_world.id
  resource_id             = aws_api_gateway_rest_api.hello_world.root_resource_id
  http_method             = aws_api_gateway_method.any.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.hello_world.arn}/invocations"
  credentials             = aws_iam_role.apigateway_execution_role.arn
}

resource "aws_api_gateway_deployment" "test" {
  depends_on  = [aws_api_gateway_integration.lambda]
  rest_api_id = aws_api_gateway_rest_api.hello_world.id
  stage_name  = "test"
}

output "api_url" {
  value = aws_api_gateway_deployment.test.invoke_url
}
```

This file is quite a bit more involved than the previous examples, so let's take a look!

1. We first define our `Rest API`, specifying the REGIONAL endpoint configuration as per the previous exercises.
2. We then define our `ANY` http method which we'll subsequently use to integrate with our Lambda.
3. We now define an `aws_api_gateway_integration` which uses the credentials we've previously configured in our [iam.tf](./assets/iam.tf) file to ensure that it has the correct permissions to invoke our `Lambda`.
4. We create an `aws_api_gateway_deployment` for our `ApiGateway`, and configure it to use a `Stage` called "test".
5. The final piece of the puzzle here is for us to declare an `output variable`. Output variables are similar to input variables, but are used to... output... In this case we're choosing to spit the invocation URL for our ApiGateway out to `std/out`.

Shall we deploy everything???

## Terraform Apply

To get everything we've defined so far (the `IAM` stuff, the `Lambda` and the `ApiGateway` stuff), just go to the terminal, `cd` to this directory and run:

`terraform apply`

The Terraform engine is gonna spin up, parse all the `.tf` files and then come up with an execution order to `apply` to the environment. It'll then ask you to confirm if that's really want you wanna do. Type "yes", unless you've changed your mind...

```bash
...
Apply complete! Resources: 9 added, 0 changed, 0 destroyed.

Outputs:

api_url = https://XXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/test
```

Go ahead and `curl https://XXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/test`! It'll hopefully return our ever-elusive "Hello, World!" String!

## Terraform Destroy

One of the great things about Terraform is its ability to both _create_ and _destroy_ resources. With a click of your fingers you can **Thanos** everything you've created!

```bash
$ terraform destroy

Plan: 0 to add, 0 to change, 9 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value:
```

Note that Terraform gives you a breakdown here of all the stuff it's going to destroy on your behalf. You can also choose to dry-run any Terraform operations, in which case it'll just generate you some output that you can review before applying or destroying :)

[Finishing up](./05-finishing-up.md)
