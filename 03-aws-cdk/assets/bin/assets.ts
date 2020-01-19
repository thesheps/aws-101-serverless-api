#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AssetsStack } from '../lib/assets-stack';

const app = new cdk.App();
new AssetsStack(app, 'AssetsStack');
