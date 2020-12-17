import {IDBPDatabase, openDB} from 'idb';


class Table {
	private db: IDBPDatabase;
	private tableName: string;


	public async get(id: number) {
		const tx = this.db.transaction(this.tableName, 'readonly');
		const store = tx.objectStore(this.tableName);
		const result = await store.get(id);
		console.log('Get Data ', JSON.stringify(result));
		return result;
	}

	public async getAll() {
		const tx = this.db.transaction(this.tableName, 'readonly');
		const store = tx.objectStore(this.tableName);
		const result = await store.getAll();
		console.log('Get All Data', JSON.stringify(result));
		return result;
	}

	public async putValue(value: object) {
		const tx = this.db.transaction(this.tableName, 'readwrite');
		const store = tx.objectStore(this.tableName);
		const result = await store.put(value);
		console.log('Put Data ', JSON.stringify(result));
		return result;
	}

	public async putBulkValue(values: object[]) {
		const tx = this.db.transaction(this.tableName, 'readwrite');
		const store = tx.objectStore(this.tableName);
		for (const value of values) {
			const result = await store.put(value);
			console.log('Put Bulk Data ', JSON.stringify(result));
		}
		return this.getAll();
	}

	public async delete(id: number) {
		const tx = this.db.transaction(this.tableName, 'readwrite');
		const store = tx.objectStore(this.tableName);
		const result = await store.get(id);
		if (!result) {
			console.log('Id not found', id);
			return result;
		}
		await store.delete(id);
		console.log('Deleted Data', id);
		return id;
	}


	public async find(search: string) {
		const tx = this.db.transaction(this.tableName, 'readwrite');
		const store = tx.objectStore(this.tableName);

		const cursor = await store.openCursor();

		if (cursor) {
			if (cursor.value.column.indexOf(keyword) !== -1) {
				console.log("We found a row with value: " + JSON.stringify(cursor.value));
			}
			cursor.continue();
		}


		const result = await store.get(id);
		if (!result) {
			console.log('Id not found', id);
			return result;
		}
		await store.delete(id);
		console.log('Deleted Data', id);
		return id;
	}


}

class IndexedDb {
	private readonly database: string;
	private db: IDBPDatabase;

	constructor(database: string) {
		this.database = database;
	}

	public async createObjectStore(tableNames: string[]) {
		try {
			this.db = await openDB(this.database, 1, {
				upgrade(db: IDBPDatabase) {
					for (const tableName of tableNames) {
						if (db.objectStoreNames.contains(tableName)) continue;
						db.createObjectStore(tableName, {autoIncrement: false, keyPath: 'hash'});
					}
				},
			});
		} catch (error) {
			return false;
		}
	}

}

export default IndexedDb;
