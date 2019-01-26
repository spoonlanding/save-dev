import { RawPackage, Package } from '../types';

const NPM_DEV_PATTERN = /npm (i | install) (--save-dev | --global | -global | --g | -g)/i;
const YARN_DEV_PATTERN = /yarn add (--dev | -D)/i;
const PATTERNS = [ NPM_DEV_PATTERN, YARN_DEV_PATTERN ];

export default (pkg: RawPackage): Package => ({
	name: pkg.name,
	isDev: !!PATTERNS.some((pattern: RegExp) => pattern.test(pkg.readme))
});
