import { fetchBackupReadme, fetchPackage } from "./fetchPackage";
import { analyzeReadme } from "./transformPackage";
import { NPMPackageRegistry } from "../types";
import DB from "../db";

const db = new DB();

export default class Package {
	public name: string = null;
	public isDev: boolean = null;
	private registryData: NPMPackageRegistry;
	private readmeData: string;

	constructor(pkgName: string) {
		this.name = pkgName;
		this.analyzeName();
	}

	public async init(): Promise<Package> {
		await this.loadFromDB();
		if (this.isDev !== null) return this;
		await this.fetch();
		this.analyze();
		this.save();
		this.cleanup();
		return this;
	}

	public serialize(): string {
		return JSON.stringify(this);
	}

	private analyze(): boolean {
		this.isDev = analyzeReadme(this.readmeData)
		return this.isDev;
	}


	private async fetch(): Promise<void> {
		this.registryData = await fetchPackage(this.name);
		const backupReadme = await fetchBackupReadme(this.registryData);
		this.readmeData = this.registryData.readme.concat(backupReadme);
	}

	private save(): void {
		if (this.isDev === null) this.log('cannot save before analyzing')
		else {
			db.createPackage({
				name: this.name,
				isDev: this.isDev
			});
		}
	}

	private analyzeName(): void {
		if (this.name.includes('@types/')) {
			this.isDev = true;
		}
	}

	private cleanup(): void {
		delete this.registryData;
		delete this.readmeData;
	}

	private async loadFromDB(): Promise<void> {
		const data = await db.getPackage(this.name);
		if (data !== null) {
			this.isDev = data.isDev;
		}
	}

	private log(msg: string): void {
		console.log(`'Pkg '${this.name}': ${msg}`);
	}



}