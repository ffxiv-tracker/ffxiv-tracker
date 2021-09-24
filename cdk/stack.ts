import {
    RemovalPolicy,
    Stack,
    StackProps,
    aws_s3 as s3,
    aws_route53 as route53,
    aws_certificatemanager as acm,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_route53_targets as targets,
    aws_s3_deployment as deploy
} from 'aws-cdk-lib';
import {Construct} from "constructs";

const WEB_APP_DOMAIN = "tasks.tomestone.dev"

export class FrontEndStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const zone = route53.HostedZone.fromHostedZoneAttributes(this, "Zone", {
            hostedZoneId: 'Z05205832STX0GP5IDRFM',
            zoneName: 'tomestone.dev',
        });

        const siteBucket = new s3.Bucket(this, "SiteBucket", {
            bucketName: WEB_APP_DOMAIN,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            publicReadAccess: true,
            removalPolicy: RemovalPolicy.DESTROY,
        });

        //Create Certificate
        const siteCertificate = acm.Certificate.fromCertificateArn(this, 'SiteCertificate', 'arn:aws:acm:us-east-1:806603473952:certificate/5d598376-eb8d-4537-ab40-99debe2dced9');

        //Create CloudFront Distribution
        const siteDistribution = new cloudfront.Distribution(this, 'SiteDistribution', {
            defaultBehavior: {origin: new origins.S3Origin(siteBucket)},
            domainNames: [WEB_APP_DOMAIN],
            certificate: siteCertificate,
        });

        new route53.ARecord(this, "SiteRecord", {
            recordName: WEB_APP_DOMAIN,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(siteDistribution)),
            zone
        });

        new deploy.BucketDeployment(this, "Deployment", {
            sources: [deploy.Source.asset("./build")],
            destinationBucket: siteBucket,
            distribution: siteDistribution,
            distributionPaths: ["/index.html"]
        });
    }
}