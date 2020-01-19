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

    const handler = new Function(this, "HelloWorldLambda", {
      functionName: "helloWorld",
      code: Code.fromAsset("../../assets/hello-world.zip"),
      handler: "hello-world.handler",
      runtime: Runtime.NODEJS_12_X
    });

    const api = new RestApi(this, "HelloWorldApiGateway", {
      restApiName: "Hello World",
      endpointTypes: [EndpointType.REGIONAL]
    });

    const method = api.root.addMethod("ANY", new LambdaIntegration(handler));

    const deployment = new Deployment(this, "TestDeployment", {
      api
    });

    new Stage(this, "TestStage", {
      stageName: "Test",
      deployment
    });

    deployment.node.addDependency(method);
  }
}
