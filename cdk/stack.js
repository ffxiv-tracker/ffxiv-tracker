"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontEndStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const WEB_APP_DOMAIN = "tasks.tomestone.dev";
class FrontEndStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const zone = aws_cdk_lib_1.aws_route53.HostedZone.fromHostedZoneAttributes(this, "Zone", {
            hostedZoneId: 'Z05205832STX0GP5IDRFM',
            zoneName: 'tomestone.dev',
        });
        const siteBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, "SiteBucket", {
            bucketName: WEB_APP_DOMAIN,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            publicReadAccess: true,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
        });
        //Create Certificate
        const siteCertificate = aws_cdk_lib_1.aws_certificatemanager.Certificate.fromCertificateArn(this, 'SiteCertificate', 'arn:aws:acm:us-east-1:806603473952:certificate/5d598376-eb8d-4537-ab40-99debe2dced9');
        //Create CloudFront Distribution
        const siteDistribution = new aws_cdk_lib_1.aws_cloudfront.Distribution(this, 'SiteDistribution', {
            defaultBehavior: { origin: new aws_cdk_lib_1.aws_cloudfront_origins.S3Origin(siteBucket) },
            domainNames: [WEB_APP_DOMAIN],
            certificate: siteCertificate,
        });
        new aws_cdk_lib_1.aws_route53.ARecord(this, "SiteRecord", {
            recordName: WEB_APP_DOMAIN,
            target: aws_cdk_lib_1.aws_route53.RecordTarget.fromAlias(new aws_cdk_lib_1.aws_route53_targets.CloudFrontTarget(siteDistribution)),
            zone
        });
        new aws_cdk_lib_1.aws_s3_deployment.BucketDeployment(this, "Deployment", {
            sources: [aws_cdk_lib_1.aws_s3_deployment.Source.asset("./build")],
            destinationBucket: siteBucket,
            distribution: siteDistribution,
            distributionPaths: ["/*"]
        });
    }
}
exports.FrontEndStack = FrontEndStack;
