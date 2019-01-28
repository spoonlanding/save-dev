import * as request from 'request';

const OPTS: request.CoreOptions = { json: true };

const fetchBackupReadme = (pkg): Promise<string> => new Promise((resolve, reject) => {
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

export default (pkgName: string) => new Promise((resolve, reject) => {
	const npmURL = `https://registry.npmjs.org/${pkgName}`;

	console.log(`fetching pkg ${pkgName}`);
	
	request(npmURL, OPTS, (err, res, body) => {
		if (!!err) reject('Error fetching package');
		else fetchBackupReadme(body).then(backupReadme => {
			resolve({
				name: pkgName,
				readme: (body.readme || '').concat(backupReadme)
			});
		})
	});
})
