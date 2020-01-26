# Getting Started

If you haven't already, make sure you've got `Terraform` installed! Head over to [the download page](https://www.terraform.io/downloads.html) and grab the correct and latest zip for your OS. Once you've got it downloaded, get it unzipped and add its single binary to your `path`. Once you've got it configured, verify your install:

```bash
$ terraform

Usage: terraform [--version] [--help] <command> [args]

The available commands for execution are listed below.
The most common, useful commands are shown first, followed by
less common or more advanced commands. If you're just getting
started with Terraform, stick with the common commands. For the
other commands, please read the help and docs before usage.

Common commands:
    apply              Builds or changes infrastructure
    console            Interactive console for Terraform interpolations
```

## Resource Providers

The first thing we're gonna explore in this workshop is the idea of a `Resource Provider`. Terraform is an **Abstraction Layer** which sits in front of [many different Providers](https://www.terraform.io/docs/providers/index.html). For this reason the first step of your configuration for a `Terraform` project is to pick your provider of choice. If you open the `provider.tf` file, you'll see some code which looks like the following:

```terraform
provider "aws" {
  region = "eu-west-1"
}
```

This is actually all you need to configure your project to target AWS!

## Initialisation

Once you have that `provider` stanza in place, you can go ahead and initialise your `Terraform` workspace:

`terraform init`

This will take a look at all the `.tf` files in your current directory (so make sure you've changed directory to the `./assets` subfolder). It'll then try to find a `provider` stanza across these files and do what it needs in order to enable them. In this case it's going to go out to the internet and download the latest and greatest Aws terraform provider and configure it.

:mega: **NOTE**: You'll see a whole bunch of temporary files created at this point under a .terraform folder. Make sure you don't delete these, otherwise your terraform setup will be a sad panda :panda:

## Variables

Alongside the `Resource Provider` you've configured above, you can also define _variables!_ You can see an example of this in the [variables.tf](./assets/variables.tf) file.

```terraform
variable "region" {
  default = "eu-west-1"
}
```

This should be fairly self explanatory! You can refer to this value anywhere you need by specifying the convention `var.variable_name`. If you don't specify a default value for a variable, Terraform will ask you for a value when you try to execute the plan. Default variables are overridden by the convention of a `.tfvars` file. Consider this to be an `environment` file - You'll typically have one of these per stage or environment.

[Go here](./02-iam.md) to continue your journey!
