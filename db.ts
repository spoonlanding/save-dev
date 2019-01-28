import { Package, RawPackage } from "./types";
import * as AWS from 'aws-sdk';

export default class DB {
	private client: AWS.DynamoDB;
	
	constructor() {
		this.client = new AWS.DynamoDB({
			region: 'localhost',
			endpoint: 'http://localhost:8000'
		});
	}

	public createPackage (pkg: Package): Promise<string> {
		const params = {
			Item: {
				'name': {
					S: pkg.name
				},
				'isDev': {
					BOOL: pkg.isDev
				}
			},
			TableName: 'packagesTable'
		};
		
		this.log(`creating ${pkg.name}`);

		return new Promise((resolve, reject) => {
			this.client.putItem(params, (err, data) => {
				if (err) reject(err);

				this.log(`successfully created ${pkg.name}`);
				resolve(pkg.name)
			});
		});
	}

	public getPackage(pkg: string | RawPackage): Promise<Package> {
		const pkgName = typeof pkg === 'string' ? pkg : pkg.name;
		const params = {
			Key: {
				'name': {
					S: pkgName
				}
			},
			TableName: 'packagesTable'
		};
		
		this.log(`scanning for ${pkg}`);
		
		return new Promise((resolve, reject) => {
			this.client.getItem(params, (err, data) => {
				if (err || !('Item' in data)) {
					this.log(`couldn't find package ${pkg}`);
					reject('Package not found in db');
				}
				else {
					this.log(`found package ${pkgName}`);
					resolve({
						name: data.Item['name'].S,
						isDev: data.Item['isDev'].BOOL,
					});
				}
			});
		});
	}

	private log(msg: string) {
		console.log(`DB: ${msg}`)
	}
}