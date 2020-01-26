# The Complete Application

We're first gonna need to install a couple of other dependencies for our _new_ stack, namely the `@aws-cdk/aws-lambda` and `@aws-cdk/aws-apigateway` packages:

`$ npm i @aws-cdk/aws-lambda @aws-cdk/aws-apigateway`

Once these have been added, you should be able to take the following code snippet and plumb it into your codefile. The following is our _dev complete_ `Construct` for our hello-world application:

```typescript
import { Stack, Construct, StackProps } from "@aws-cdk/core";
import { Function, Code, Runtime } from "@aws-cdk/aws-lambda";
import {
  Stage,
  RestApi,
  LambdaIntegration,
  Deployment,
  EndpointType
} from "@aws-cdk/aws-apigateway";

export class AssetsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Lambda definition
    const handler = new Function(this, "HelloWorldLambda", {
      functionName: "helloWorld",
      code: Code.fromAsset("../../assets/code/hello-world.zip"),
      handler: "hello-world.handler",
      runtime: Runtime.NODEJS_12_X
    });

    // Api Gateway definition
    const api = new RestApi(this, "HelloWorldApiGateway", {
      restApiName: "Hello World",
      endpointTypes: [EndpointType.REGIONAL]
    });

    // Default ANY method
    const method = api.root.addMethod("ANY", new LambdaIntegration(handler));

    // API Deployment
    const deployment = new Deployment(this, "TestDeployment", { api });

    // Deployment stage
    new Stage(this, "TestStage", {
      stageName: "Test",
      deployment
    });

    // Ensures that the deployment is not created before the method is ready
    deployment.node.addDependency(method);
  }
}
```

At only `44 lines of code` this is quite a light example of a `CDK Stack`, but we can see straight away how each of the classes we're instantiating represent one of the AWS components we've already been introduced to:

- Lambda Function
- Api Gateway
- Rest API
- HTTP Method
- Lambda Integration
- Deployment
- Stage

Let's try and `synth` our _new_ stack, and see what happens!

`$ npx cdk synth`

This time around you should see a _lot_ more information pumped to the terminal - A full listing of all the intended resources, including a bunch of `iam` policies that will allow the stack to be actually created and _applied_ by AWS. Shall we deploy it?

```bash
$ npx cdk deploy
This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
...

Do you wish to deploy these changes (y/n)?
```

The output from our deploy command this time includes some information about some `IAM` changes which are due to be deployed. On this occasion these changes are created in order for the `ApiGateway` to integrate with our `Lambda` and so are quite safe to apply.

:mega: **NOTE**: With great power comes great responsibility. Always make sure you thoroughly review any changes to IAM policies to make sure you understand the impact of the changes!

```bash
....
Resource creation Initiated
 12/14 | 13:27:57 | CREATE_COMPLETE      | AWS::ApiGateway::Deployment | TestDeployment (TestDeploymentD77B5686)
 12/14 | 13:27:59 | CREATE_IN_PROGRESS   | AWS::ApiGateway::Stage      | TestStage (TestStage3097EB68)

 ✅  HelloWorldStack

Outputs:
HelloWorldStack.HelloWorldApiGatewayEndpoint67A5FC72 = https://XXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/prod/

Stack ARN:
arn:aws:cloudformation:eu-west-1:XXXXXXXXXXXX:stack/HelloWorldStack/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

Whoop! With any luck this stack should have applied successfully, and you should now have an API Url you can visit with your browser!

```bash
$ curl https://XXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/prod/
"Hello, World!"
```

And so ends another recipe. If you'd like to **Tear Down** this infrastructure, the `cdk` can help us here too:

```bash
$ npx cdk destroy
Are you sure you want to delete: HelloWorldStack (y/n)? y
HelloWorldStack: destroying...
...
 ✅  HelloWorldStack: destroyed
```

Again you'll see a bunch of output from `CloudFormation` here as AWS works out what needs to be done to destroy your infrastructure.

## Wrapping Up

The `AWS CDK` is just one of example of a number of similar infrastructure-as-code frameworks out there which manages the overhead of tracking infrastructure state and working out what changes need to be made in order to reach a desired end state. In the next exercise we'll take a dive into `Terraform` - An Infrastructure as Code tool which doesn't rely on `CloudFormation` to manage your infrastructure!

[Go here to continue your journey!](../03-terraform)
