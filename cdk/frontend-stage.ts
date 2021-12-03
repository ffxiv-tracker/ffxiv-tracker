import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";
import {FrontEndStack} from "./stack";

interface FrontEndStageProps extends cdk.StageProps {
    domain: string;
}

export class FrontEndStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props: FrontEndStageProps) {
        super(scope, id, props);

        new FrontEndStack(this, 'FEStack', {
            domain: props.domain,
        });
    }
}
