// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";
import {pipelines, aws_codepipeline as codepipeline, aws_codepipeline_actions as actions} from "aws-cdk-lib";

export interface PipelineStackProps extends cdk.StackProps {
  name: string;
  branch: string;
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
        environment: {
          privileged: true, // so that we can use Docker bundling
        },
      }),
    });
  }
}
