import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { AwsProvider, EC2 } from "./.gen/providers/aws";

class MyStack extends TerraformStack {
	constructor(scope: Construct, id: string) {
		super(scope, id);

		new AwsProvider(this, "aws", {
			region: "us-east-1",
		});

		const instance = new EC2.Instance(this, "Hello", {
			ami: "ami-2757f631",
			instanceType: "t2.micro",
		});

		new TerraformOutput(this, "public_ip", {
			value: instance.publicIp,
		});
	}
}

const app = new App();
new MyStack(app, "terraform-cdk-typescript");
app.synth();
