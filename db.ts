import { Package, RawPackage } from "./types";
import * as AWS from 'aws-sdk';
const db = new AWS.DynamoDB({
	region: 'localhost',
  endpoint: 'http://localhost:8000'
});

export const getPackage = (pkg: string | RawPackage): Promise<Package> => {
	const pkgName = typeof pkg === 'string' ? pkg : pkg.name;
	const params = {
		Key: {
			'name': {
				S: pkgName
			}
		},
		TableName: 'packagesTable'
	};

	return new Promise((resolve, reject) => {
		db.getItem(params, (err, data) => {
			if (err || !('Item' in data)) reject('Package not found in db');
			else {
				resolve({
					name: data.Item['name'].S,
					isDev: data.Item['isDev'].BOOL,
				});
			}
		});
	});
}

export const createPackage = (pkg: Package): Promise<string> => {
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

	return new Promise((resolve, reject) => {
		db.putItem(params, (err, data) => {
			if (err) reject(err);
			resolve(pkg.name)
		});
	});
}