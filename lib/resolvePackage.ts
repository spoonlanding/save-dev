import { Package } from '../types';
import DB from '../db';
import transformPackage from './transformPackage';
import fetchPackage from './fetchPackage';

const db = new DB();

export default function (pkgName: string): Promise<Package> {
	return new Promise((resolve, reject) => {
		db.getPackage(pkgName)
			.then(resolve)
			.catch((_e: Error) => {
				fetchPackage(pkgName)
					.then(transformPackage)
					.then((pkg: Package) => {
						db.createPackage(pkg);
						resolve(pkg);
					})
					.catch(reject)
			});
	});
}