# This block defines an IAM role that the Lambda executes as
resource "aws_iam_role" "lambda_execution_role" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# This block defines an IAM role that the ApiGateway executes as
resource "aws_iam_role" "apigateway_execution_role" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# This block defines an IAM policy that allows the invocation of Lambdas
resource "aws_iam_policy" "invoke_lambda" {
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "lambda:InvokeFunction",
      "Resource": "*"
    }
  ]
}
EOF
}

# This block attaches the invoke lambda policy to the ApiGateway role
resource "aws_iam_role_policy_attachment" "api_gateway_invoke_lambda" {
  role       = aws_iam_role.apigateway_execution_role.name
  policy_arn = aws_iam_policy.invoke_lambda.arn
}
