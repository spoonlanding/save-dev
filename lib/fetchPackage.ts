import * as request from 'request';
import { NPMPackageRegistry } from '../types';

const OPTS: request.CoreOptions = { json: true };

export const fetchBackupReadme = (pkg: NPMPackageRegistry): Promise<string> => new Promise((resolve, reject) => {
	const repoURL = pkg.repository.url;
	const readmeUrl = repoURL
		.replace('github', 'raw.githubusercontent')
		.slice(4, -4)
		.concat('/master/README.md');

	request(readmeUrl, OPTS, (err, res, body) => {
		if (!!err) reject('Error fetching package');
		else resolve(body);
	});
});

export const fetchPackage = (pkgName: string): Promise<NPMPackageRegistry> => new Promise((resolve, reject) => {
	const npmURL = `https://registry.npmjs.org/${pkgName}`;

	console.log(`fetching pkg ${pkgName}`);
	
	request(npmURL, OPTS, (err, res, body) => {
		if (!!err) reject('Error fetching package');
		else resolve(body);
	});
})
