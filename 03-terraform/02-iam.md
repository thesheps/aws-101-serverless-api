# IAM

In the previous workshops we've already had to do a bunch of changes in `IAM` to give our `API Gateway` the correct permissions to be able to execute our `Lambda`. In this exercise we're going to explicitly define these resources using `Terraform Resource stanzas`. You can find this code defined in the [iam.tf code file](./assets/iam.tf).

:mega: **NOTE**: IAM stands for **I**dentity and **A**ccess **M**anagement. You'll use this AWS service to define any users, groups and roles you'll ever need to use in AWS. There'll be another extended session on this subject so keep 'em peeled!

## Lambda

The first thing we need to define is our `Lambda Execution Role`. This is the Role that the Lambda will run as. The only thing we need to define here is the ability for the Lambda to actually execute. We need no further permissions:

```terraform
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
```

## Api Gateway

This is a wee bit more involved. Here we need to define our execution role for our Api Gateway, and assign it a policy such that it's able to invoke lambdas. This needs 3 different `Terraform stanzas` - One for the role, one for the `Invoke Lambda policy`, and one to attach the 2 together!

```terraform
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
```

But how does it know the correct order in which to create these resources? If you look at the `aws_iam_role_policy_attachment` resource block above, you'll see it refers to other blocks in the same file. `aws_iam_role.apigateway_execution_role` refers to an `aws_iam_role` resource defined in the same file with the name of `apigateway_execution_role`.

It is by these references to other `Terraform resources` that the `Terraform` engine is able to build a dependency graph between different components, and ensure that the components are built in the correct order.

[Go here](./03-lambda.md) to continue your journey!
