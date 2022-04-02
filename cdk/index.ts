#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {PipelineStack} from "./pipeline-stack";
import {FrontEndStage} from "./frontend-stage";

interface PipelineEnv {
    stage: string;
    branch: string;
    domain: string;
}

const envs: PipelineEnv[] = [
  {
    stage: 'Staging',
    branch: 'develop',
    domain: 'tasks-staging.tomestone.dev',
  },
  {
    stage: 'Prod',
    branch: 'main',
    domain: 'tasks.tomestone.dev',
  },
];

const app = new cdk.App();

envs.forEach(({stage, branch, domain}) => {
  new PipelineStack(app, `${stage}-DeliveryPipeline`, {
    name: `App-${stage}`,
    branch,
    domain,
  }).pipeline.addApplicationStage(
    new FrontEndStage(app, `${stage}-App`, {
      domain,
    })
  );
});
