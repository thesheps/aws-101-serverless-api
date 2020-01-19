# Introduction

This is the first set in a series of workshops/follow-alongs which aim to familiarise you with **A**mazon **W**eb **S**ervices, what it can do for you, and a few patterns or recipes for creating **stuff**.

AWS has a whole catalogue of different components and services which you can fit together to build larger, more complicated solutions - the choice can be quite overwhelming! These workshops aim to try and demystify them, as well as providing a few recipes you can use going forwards.

## AWS 101 - Serverless Api

In this module we are gonna build and deploy a simple `Hello, World!` API. We are gonna use the AWS components `Lambda` and `API Gateway` to do this. The really great thing about these technologies is that they’re very, very cheap. So much so that you can get going with your skunkworks project or next-biggest-thing startup application without paying anything at all for the first bazillion or so requests.

**Lambda** is a service which allows you to deploy functions to the cloud. Ever had the need to run a batch script on a daily schedule? Ever needed to respond to a text message or email being received in a very specific way? Lambda’s been around for about 5 years now, and supports a whole bunch of languages. We're gonna focus on NodeJS for the purposes of these exercises.

**API Gateway** is a service which allows you to define, build, monitor and maintain APIs hosted on AWS. We're gonna use this to define a simple `GET` endpoint which will then route traffic to our `Lambda` function above.

## Recipes

As with many other libraries and technologies there exist a number of different _Recipes_ you can use to build a serverless API using `Lambda` and `API Gateway`. This module uses _4 different recipes_ so that you can compare and contrast:

1. Just Use The Console

   - The first iteration will just _Build The Thing_ using the provided AWS Front-end. This will give us some familiarity of the thing we're building without confusing us with Tools.

2. AWS CLI

   - AWS provide us with some nice command line tools. Let's see if we can use them to recreate and deploy our API?

3. AWS CDK

   - Along with the CLI, AWS provide a **Cloud Development Kit**. You can use this library in a similar way to Terraforming your resources but _codifying_ the resource creation in `TypeScript`, `Python`, `C#` or `Java` instead of defining it in declarative blocks. This shift from declarative programming allows more programmatic patterns to be used - for example loops, if statements, Object Oriented Programming and other abstractions.

4. Terraform

   - Terraform is an `Infrastructure-As-Code` state management framework which allows you to define AWS Resources as [declarative code blocks](https://en.wikipedia.org/wiki/Declarative_programming). This allows you to check your code into source code and easily replay your API into different environments (Dev/QA/Live).

## Pre-Flight Checklist

If you haven't already, go and get yourself:

1. An AWS Account

   - Go [here](https://portal.aws.amazon.com/billing/signup#/start) to obtain an AWS account if you don't have one already. Everything we'll be doing in these exercises will be under the "Free Tier" so it won't cost you a penny!

2. Some AWS Credentials

   - AWS and IAM credentials are beyond the scope of these exercises but the _tl;dr_ of it is that you'll need to obtain an `ACCESS_KEY` and a `SECRET_KEY` to configure your laptop to be authorised to use your AWS account. Full details for both of these steps can be found [here](https://docs.aws.amazon.com/polly/latest/dg/setting-up.html). Name your `IAM user` "aws-101". Once you're done, download your credentials. You'll need them shortly!

3. `Python` >= 2.6.5

   - The `AWS CLI` needs this so if you've not got a working `Python` environment I'd get this setup now. You can download it [here](https://www.python.org/downloads/)

4. The `AWS CLI`

   - Once you've got `Python` set-up I'd be inclined just to `pip install` this globally. `Pip` is Python's package manager - more details [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html)

5. `Node.js`

   - We're gonna be using this both to build our `Lambda` and also for the `AWS CDK` recipe. At the time of writing the LTS version of node is 12.14.1. You can download that [here](https://nodejs.org/en/)

6. `Terraform`
   - We're gonna be using this for the **Recipe #4** - Get it downloaded from [here](https://www.terraform.io/)

[Get started here!](./01-aws-console)
