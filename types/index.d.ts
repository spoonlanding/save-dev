export declare type Package = {
  isDev: boolean;
  name: string;
}

export declare type RawPackage = {
  readme: string;
  name: string;
}

export declare type NPMPackageRegistry = {
  _id: string;  
  _rev: string;
  name: string;
  description: string;
  'dist-tags': string;
  versions: string;
  readme: string;
  maintainers: string;
  time: string;
  homepage: string;
  keywords: string;
  author: string;
  bugs: string;
  license: string;
  readmeFilename: string;
  users: string;
  repository: {
    url: string;
  }
}