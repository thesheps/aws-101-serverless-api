# The API Gateway

Head to [the Api Gateway homepage](https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1#/apis/create) and select New Api. You should see something that looks like this:

![API Gateway Homepage](./assets/img/api-gateway-home.png)

:mega: **NOTE**: Make sure you're set to the region `eu-west-1` in the drop-down at the top-right of the screen! AWS supports many different geographical regions (think of each of them as being a data centre). For consistency we're gonna use `eu-west-1` (Dublin).

Enter Hello World as your Api name, and ensure that REST is selected as your Protocol. We want a Regional Endpoint Type as opposed to it being `private` (only within your AWS network). Hit `Create API`.

![API Gateway Create](./assets/img/api-gateway-create.png)

## Define HTTP Methods

Great! So what's next? We need to define a `Method` on our `Api Gateway` that we're gonna use to trigger our Lambda.

1. From the `Actions` dropdown click `Create Method`. You should now see a little dropdown appear underneath which represents the `HTTP` method you want to add.

2. Click the new dropdown, and select `ANY`. This will map _any_ http traffic from your API Gateway to your Lambda, essentially acting as a _proxy_ to your Lambda function.

3. Click the little tick to create your method.

## Proxy Configuration

Presto, Chango!

![API Gateway Proxy Configuration](./assets/img/api-gateway-proxy.png)

Now things get interesting. This screen allows us to define how our `API Gateway` interacts with whatever other AWS Services we might want it to. In this case we're gonna accept the defaults, and type `helloWorld` in the Lambda Function textbox. With any luck this should auto-complete for you!

:mega: **NOTE**: The `Use Lambda Proxy Integration` checkbox only becomes important if you choose to have your Lambda support multiple HTTP actions or to have it use other properties from a HTTP request (for instance query string parameters or the body from a HTTP post). These are considered out of scope for this introductory workshop, sorry!

Hit Save! It's gonna warn you that your Api Gateway will be able to invoke your Lambda. That's kind of the point though, right?

![API Gateway Description](./assets/img/api-gateway-description.png)

The final screen shows you a lovely breakdown of your new HTTP method on your gateway, and how it's composed to integrate with your `helloWorld` Lambda! Hit the `TEST` lightning bolt and choose `GET` from the Method dropdown. You should be rewarded with a lovely response from your Lambda when you hit Test:

```json
{
  "statusCode": 200,
  "body": "\"Hello, World!\""
}
```

## Deployment

To be able to actually use your lovely new `Api Gateway` you'll need to **DEPLOY IT**.

1. Select `Deploy Api` from the `Actions` dropdown.
2. Select `[New Stage]` and call it `Test`.
3. Hit `Deploy`.

The next page gives you _LOTS_ of information. We're only interested right now in your Invoke URL. Grab it, and curl it from your terminal:

```bash
curl https://xxxxxxxxxx.execute-api.eu-west-1.amazonaws.com/Test
```

**OUTPUT**:

```json
{"statusCode":200,"body":"\"Hello, World!\""}%
```

Congrats, you have an API! This tutorial is a whistle-stop tour in creating a Serverless API, but it is important when using Cloud abstraction tools that you have familiarity and understanding of the underlying technology before trying to create things by code.

To explore how the `AWS CLI` helps us to drive all these steps out programmatically, [head over here!](../02-aws-cli)
