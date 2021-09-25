#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {PipelineStack} from "./pipeline-stack";
import {FrontEndStage} from "./frontend-stage";

const app = new cdk.App();

const staging = new PipelineStack(app, "Staging-DeliveryPipeline", {
    name: "App-Staging",
    branch: "develop",
});

const stagingStage = new FrontEndStage(app, "Staging-App", {
    stage: "staging",
});

staging.pipeline.addApplicationStage(stagingStage);

const prod = new PipelineStack(app, "Prod-DeliveryPipeline", {
    name: "App-Prod",
    branch: "main",
});

const prodStage = new FrontEndStage(app, "Prod-App", {
    stage: "prod",
});

prod.pipeline.addApplicationStage(prodStage);