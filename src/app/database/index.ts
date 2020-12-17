// Require minimongo
import Dexie from 'dexie';
import type {Table} from 'dexie';
import type Company from "../classes/Company";
//import type Invoice from "../classes/Invoice";

// Create local db (in memory database with no backing)
const db = new Dexie('main');
db.version(1).stores({
	companies: "++id,name,address,address2,country,cin,tin",
});

// Add a collection to the database
//export const invoices = db.table<Invoice, string>("invoices");
export const companies: Table<Company, number> = db.table<Company, number>("companies");

export default db;
