import { RawPackage, Package } from '../types';

const NPM_DEV_PATTERN = /npm (i|install) (-|--)(save-dev|global|g)/i;
const YARN_DEV_PATTERN = /yarn add (--dev | -D)/i;
const PATTERNS = [ NPM_DEV_PATTERN, YARN_DEV_PATTERN ];

export const analyzeReadme = (md: string): boolean => !!PATTERNS.some((p: RegExp) => p.test(md))

export const transformPackage = ({ name, readme }: RawPackage): Package => ({
	name,
	isDev: analyzeReadme(readme)
});
