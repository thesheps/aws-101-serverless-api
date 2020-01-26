# The Stack

By now we should hopefully have a good idea of the component parts of our application, so this exercise is going to _jump straight into the good stuff_.

The [getting started](./01-getting-started.md) guide of this recipe introduces a simple stack which essentially produces a [noop](<https://en.wikipedia.org/wiki/NOP_(code)>):

```typescript
import * as cdk from "@aws-cdk/core";

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}
```

:mega: **NOTE**: This exercise assumes some base familiarity with `Typescript`. If you're unsure of anything, there are plenty of docs out there to assist!

Let's try to actually _deploy_ this stack and see what happens!

```bash
$ npx cdk deploy
HelloWorldStack: deploying...
HelloWorldStack: creating CloudFormation changeset...
 0/2 | 13:06:37 | CREATE_IN_PROGRESS   | AWS::CDK::Metadata | CDKMetadata
 0/2 | 13:06:38 | CREATE_IN_PROGRESS   | AWS::CDK::Metadata | CDKMetadata Resource creation Initiated
 1/2 | 13:06:38 | CREATE_COMPLETE      | AWS::CDK::Metadata | CDKMetadata
 2/2 | 13:06:40 | CREATE_COMPLETE      | AWS::CloudFormation::Stack | HelloWorldStack

 ✅  HelloWorldStack

Stack ARN:
arn:aws:cloudformation:eu-west-1:XXXXXXXXXXXX:stack/HelloWorldStack/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

The output here _seems_ to indicate that our `Cloudformation Stack` was indeed created, but that it doesn't actually _contain_ anything. Let's try and add some more stuff to it!

The main concept of this `Typescript` flavour of CDK is for all of your resources to be defined within the constructor of your stack. By passing around the scope of this `construct` you can add additional resources and extend the stack. [So let's do that! ](./03-the-complete-app.md)
