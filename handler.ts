import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import Package from './lib/Package';

export const analyzePackage: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  
  const pkgName = event.queryStringParameters['pkg'];
  const respond = (body: string | Error, statusCode: number) => cb(null, {
    statusCode,
    body,
    headers: { 'Access-Control-Allow-Origin': '*' },
  });

  const pkg = new Package(pkgName);
  pkg.init()
    .then((pkg: Package) => respond(pkg.serialize(), 200))
    .catch((err: Error) => respond(err, 403));

}
