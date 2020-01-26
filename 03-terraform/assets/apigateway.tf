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
