// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from "aws-cdk-lib";
import {aws_codepipeline as codepipeline, aws_codepipeline_actions as actions, aws_codebuild as codebuild, pipelines} from "aws-cdk-lib";
import {Construct} from "constructs";

export interface PipelineStackProps extends cdk.StackProps {
  name: string;
  branch: string;
  domain: string;
}

export class PipelineStack extends cdk.Stack {
  public readonly pipeline: pipelines.CdkPipeline;

  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    this.pipeline = new pipelines.CdkPipeline(this, "Pipeline", {
      pipelineName: `${props.name}-DeliveryPipeline`,
      cloudAssemblyArtifact,
      sourceAction: new actions.GitHubSourceAction({
        actionName: "GitHub",
        output: sourceArtifact,
        oauthToken: cdk.SecretValue.secretsManager("github-token"),
        trigger: actions.GitHubTrigger.WEBHOOK,
        owner: "ffxiv-tracker",
        repo: "ffxiv-tracker",
        branch: props.branch,
      }),
      synthAction: pipelines.SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: `npm run build && npm run cdk-build`,
        environmentVariables: {
          REACT_APP_HOST: {
            type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            value: `https://${props.domain}`,
          },
        }
      }),
    });
  }
}
