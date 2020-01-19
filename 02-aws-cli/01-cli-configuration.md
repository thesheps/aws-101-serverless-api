# Getting Started

If you haven't already, make sure you've got `Python` available to run the AWS CLI, then follow this guide to get the AWS CLI installed: [AWS CLI Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html).

Once you're installed and set up, open up your favourite terminal and type `aws --version` to verify your installation:

```bash
aws --version
aws-cli/1.17.0 Python/3.7.6 Darwin/19.2.0 botocore/1.14.0
```

## AWS Authentication

If you started this module from the beginning you should have created an admin-level login called `aws-101` together with a default `access key` and `secret key` which you should have downloaded and put somewhere safe. We're now going to use these to configure the `AWS CLI` to be able to authenticate and authorise with AWS! Grab that terminal session once more, and type:

`aws configure`

You'll then be presented with a short questionnaire which asks for your AWS Access Key ID and your AWS Secret Access Key:

```bash
AWS Access Key ID [********************]: REDACTEDACCESSKEYID
AWS Secret Access Key [********************]: REDACTEDSLIGHTLYLONGERSECRETKEY
Default region name [eu-west-1]:
Default output format [None]:
```

:mega: **NOTE**: Hey. Don't go committing your credentials into source control. These are the keys to your AWS Kingdom, and unless you're very careful with them they could fall into the hands of [Naughty Hackers](https://rhinosecuritylabs.com/aws/aws-iam-credentials-get-compromised/). There'll be a follow-up security article/session coming sometime soon!

Let's validate that we're authenticated properly:

`aws lambda list-functions`

You should hopefully be rewarded with a list of the Lambda functions that you currently have deployed into your AWS account with the default region (eu-west-1):

```json
{
  "Functions": []
}
```

If you're getting any other errors at this stage please feel free to reach out to whoever's running your session - It's highly recommended to get this last stage working before continuing into the rest of the exercise!

:mega: **NOTE**: EVERY example that you see in these workshops will rely on these credentials being configured correctly. 'tis just the way of the world.

If everything is tickety-boo: [go here to continue your journey!](./02-create-lambda.md)
