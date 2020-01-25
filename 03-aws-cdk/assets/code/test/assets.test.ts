import { expect, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import Assets = require("../lib/assets-stack");

describe("Assets Stack", () => {
  const app = new cdk.App();
  const stack = new Assets.AssetsStack(app, "MyTestStack");

  describe("Lambda", () => {
    it("has a Lambda named helloWorld", () => {
      expect(stack).to(
        haveResource("AWS::Lambda::Function", {
          FunctionName: "helloWorld",
          Handler: "hello-world.handler",
          Runtime: "nodejs12.x"
        })
      );
    });
  });

  describe("ApiGateway", () => {
    describe("RestApi", () => {
      it("is configured with the correct EndpointConfiguration", () => {
        expect(stack).to(
          haveResource("AWS::ApiGateway::RestApi", {
            Name: "Hello World"
          })
        );
      });

      it("has an ANY HttpMethod assigned to it", () => {
        expect(stack).to(
          haveResource("AWS::ApiGateway::Method", {
            HttpMethod: "ANY"
          })
        );
      });

      it('is deployed to a stage called "Test"', () => {
        expect(stack).to(
          haveResource("AWS::ApiGateway::Stage", {
            StageName: "Test"
          })
        );
      });
    });
  });
});
