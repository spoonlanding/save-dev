import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import resolvePackage from './lib/resolvePackage';
import { Package } from './types';

export const analyzePackage: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  
  const pkgName = event.queryStringParameters['pkg'];
  const respond = (body: string | Error, statusCode: number) => cb(null, {
    statusCode,
    body,
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
  
  resolvePackage(pkgName)
    .then((pkg: Package) => respond(JSON.stringify(pkg), 200))
    .catch((err: Error) => respond(err, 403));

}
