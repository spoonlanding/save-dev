import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import getPackage from './lib/getPackage';
import { Package } from './types';

export const analyzePackage: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  // console.log(event)c
  const pkgName = event.queryStringParameters['pkg'];

  const respond = (body: string | Error, statusCode: number) => cb(null, {
    statusCode,
    body,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  
  getPackage(pkgName)
    .then((pkg: Package) => respond(JSON.stringify(pkg), 200))
    .catch((err: Error) => respond(err, 403));

}
