import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import getPackage from './lib/getPackage';
import { Package } from './types';

export const analyzePackage: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  // console.log(event)c
  const pkgName = event.queryStringParameters['pkg'];
  
  getPackage(pkgName)
    .then((pkg: Package) => cb(null, { statusCode: 200, body: JSON.stringify(pkg) }))
    .catch((err: Error) => cb(null, { statusCode: 403, body: err }));

}

export const getPackageType: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {

}