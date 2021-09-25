import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";
import {FrontEndStack} from "./stack";

interface FrontEndStageProps extends cdk.StageProps {
    stage: string;
}

export class FrontEndStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props: FrontEndStageProps) {
        super(scope, id, props);

        let domain = 'tasks.tomestone.dev';

        if (props.stage !== 'prod') {
            domain = `tasks-${props.stage}.tomestone.dev`;
        }

        new FrontEndStack(this, 'FEStack', {
            domain,
        });
    }
}
