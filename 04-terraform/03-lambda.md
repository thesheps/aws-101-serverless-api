# Lambda

Now we've created all the roles and policies we need to support our `Lambda` and `ApiGateway`, we can go ahead and actually define our Lambda! You can find this supporting code in [lambda.tf](./assets/lambda.tf)

```terraform
# This block defines a Lambda function called helloWorld
resource "aws_lambda_function" "hello_world" {
  filename      = "../assets/hello-world.zip"
  function_name = "helloWorld"
  role          = aws_iam_role.lambda_execution_role.arn
  handler       = "hello-world.handler"
  runtime       = "nodejs12.x"
}
```

If you look closely you'll see all the parameters to drive this configuration we've already used in the [aws-cli example](../02-aws-cli) earlier! We define a `.zip file` containing the javascript for our function, the handler function for the Lambda and the runtime `nodejs12.x`.

[Go here](./04-apigateway.md) to continue your journey!
