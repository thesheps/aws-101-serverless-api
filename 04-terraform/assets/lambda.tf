# This block defines a Lambda function called helloWorld
resource "aws_lambda_function" "hello_world" {
  filename      = "../assets/hello-world.zip"
  function_name = "helloWorld"
  role          = aws_iam_role.lambda_execution_role.arn
  handler       = "hello-world.handler"
  runtime       = "nodejs12.x"
}
