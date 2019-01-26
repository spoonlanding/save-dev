import * as request from 'request';
const OPTS: request.CoreOptions = { json: true };
export default (pkgName: string) => new Promise((resolve, reject) => {
	const npmURL = `https://registry.npmjs.org/${pkgName}`;
	request(npmURL, OPTS, (err, res, body) => {
		if (!!err) reject('Error fetching package')
		else if (!body.readme) reject('Package has no readme')
		else {
			resolve(body);
		}
	});
})
