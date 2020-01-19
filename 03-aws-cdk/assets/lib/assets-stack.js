"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@aws-cdk/core");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const aws_apigateway_1 = require("@aws-cdk/aws-apigateway");
class AssetsStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const handler = new aws_lambda_1.Function(this, "HelloWorldLambda", {
            functionName: "helloWorld",
            code: aws_lambda_1.Code.fromAsset("../../assets/hello-world.zip"),
            handler: "hello-world.handler",
            runtime: aws_lambda_1.Runtime.NODEJS_12_X
        });
        const api = new aws_apigateway_1.RestApi(this, "HelloWorldApiGateway", {
            restApiName: "Hello World",
            endpointTypes: [aws_apigateway_1.EndpointType.REGIONAL]
        });
        const method = api.root.addMethod("ANY", new aws_apigateway_1.LambdaIntegration(handler));
        const deployment = new aws_apigateway_1.Deployment(this, "TestDeployment", {
            api
        });
        new aws_apigateway_1.Stage(this, "TestStage", {
            stageName: "Test",
            deployment
        });
        deployment.node.addDependency(method);
    }
}
exports.AssetsStack = AssetsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXNzZXRzLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTZEO0FBQzdELG9EQUE4RDtBQUM5RCw0REFNaUM7QUFFakMsTUFBYSxXQUFZLFNBQVEsWUFBSztJQUNwQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sT0FBTyxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDckQsWUFBWSxFQUFFLFlBQVk7WUFDMUIsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDO1lBQ3BELE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUM7UUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLHdCQUFPLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQ3BELFdBQVcsRUFBRSxhQUFhO1lBQzFCLGFBQWEsRUFBRSxDQUFDLDZCQUFZLENBQUMsUUFBUSxDQUFDO1NBQ3ZDLENBQUMsQ0FBQztRQUVILE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLGtDQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFekUsTUFBTSxVQUFVLEdBQUcsSUFBSSwyQkFBVSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN4RCxHQUFHO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxzQkFBSyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDM0IsU0FBUyxFQUFFLE1BQU07WUFDakIsVUFBVTtTQUNYLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQTdCRCxrQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgQ29uc3RydWN0LCBTdGFja1Byb3BzIH0gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7IEZ1bmN0aW9uLCBDb2RlLCBSdW50aW1lIH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7XG4gIFN0YWdlLFxuICBSZXN0QXBpLFxuICBMYW1iZGFJbnRlZ3JhdGlvbixcbiAgRGVwbG95bWVudCxcbiAgRW5kcG9pbnRUeXBlXG59IGZyb20gXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheVwiO1xuXG5leHBvcnQgY2xhc3MgQXNzZXRzU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBGdW5jdGlvbih0aGlzLCBcIkhlbGxvV29ybGRMYW1iZGFcIiwge1xuICAgICAgZnVuY3Rpb25OYW1lOiBcImhlbGxvV29ybGRcIixcbiAgICAgIGNvZGU6IENvZGUuZnJvbUFzc2V0KFwiLi4vLi4vYXNzZXRzL2hlbGxvLXdvcmxkLnppcFwiKSxcbiAgICAgIGhhbmRsZXI6IFwiaGVsbG8td29ybGQuaGFuZGxlclwiLFxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTJfWFxuICAgIH0pO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IFJlc3RBcGkodGhpcywgXCJIZWxsb1dvcmxkQXBpR2F0ZXdheVwiLCB7XG4gICAgICByZXN0QXBpTmFtZTogXCJIZWxsbyBXb3JsZFwiLFxuICAgICAgZW5kcG9pbnRUeXBlczogW0VuZHBvaW50VHlwZS5SRUdJT05BTF1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1ldGhvZCA9IGFwaS5yb290LmFkZE1ldGhvZChcIkFOWVwiLCBuZXcgTGFtYmRhSW50ZWdyYXRpb24oaGFuZGxlcikpO1xuXG4gICAgY29uc3QgZGVwbG95bWVudCA9IG5ldyBEZXBsb3ltZW50KHRoaXMsIFwiVGVzdERlcGxveW1lbnRcIiwge1xuICAgICAgYXBpXG4gICAgfSk7XG5cbiAgICBuZXcgU3RhZ2UodGhpcywgXCJUZXN0U3RhZ2VcIiwge1xuICAgICAgc3RhZ2VOYW1lOiBcIlRlc3RcIixcbiAgICAgIGRlcGxveW1lbnRcbiAgICB9KTtcblxuICAgIGRlcGxveW1lbnQubm9kZS5hZGREZXBlbmRlbmN5KG1ldGhvZCk7XG4gIH1cbn1cbiJdfQ==