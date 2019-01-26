import { Package } from '../types';
import { createPackage, getPackage } from '../db';
import checkIfDevDependency from './checkIfDevDependency';
import fetchPackage from './fetchPackage';

export default function (pkgName: string): Promise<Package> {
	
	return new Promise((resolve, reject) => {
		getPackage(pkgName)
			.then(resolve)
			.catch((_e: Error) => {
				fetchPackage(pkgName)
					.then(checkIfDevDependency)
					.then((pkg: Package) => {
						createPackage(pkg);
						resolve(pkg);
					})
					.catch(reject)
			});
	});
}