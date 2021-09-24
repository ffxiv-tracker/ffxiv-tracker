#!/usr/bin/env node
import 'source-map-support/register';
import {App} from 'aws-cdk-lib';
import {FrontEndStack} from './stack';

const app = new App();
new FrontEndStack(app, 'FrontEndStack', {});