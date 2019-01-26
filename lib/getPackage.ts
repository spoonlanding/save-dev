import * as request from 'request';
import { RawPackage, Package } from '../types';
import { writePackage, readPackage } from '../db';
import checkIfDevDependency from './checkIfDevDependency';
import fetchPackage from './fetchPackage';

export default function (pkgName: string): Promise<Package> {
	
	return new Promise((resolve, reject) => {
		readPackage(pkgName)
			.then(resolve)
			.catch((_e: Error) => {
				fetchPackage(pkgName)
					.then(checkIfDevDependency)
					.then((pkg: Package) => {
						writePackage(pkg);
						resolve(pkg);
					})
					.catch(reject)
			});
	});
}