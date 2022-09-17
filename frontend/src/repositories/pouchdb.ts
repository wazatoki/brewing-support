import PouchDB from "pouchdb";

// eslint-disable-next-line @typescript-eslint/ban-types
let db: PouchDB.Database<{}>;
// eslint-disable-next-line @typescript-eslint/ban-types
let remoteDB: PouchDB.Database<{}>;

export function getDBInstance(
  dbName = "brewing_support_db"
  // eslint-disable-next-line @typescript-eslint/ban-types
): PouchDB.Database<{}> {
  if (db && db.info.name === dbName) {
    return db;
  }

  return (db = new PouchDB(`${dbName}`, {
    skip_setup: true,
  }));
}

export function getRemoteDBInstance(
  dbName = location.protocol +
    "//" +
    location.hostname +
    ":5984/brewing_support_db"
  // eslint-disable-next-line @typescript-eslint/ban-types
): PouchDB.Database<{}> {
  console.log(dbName);
  if (remoteDB && remoteDB.info.name === dbName) {
    return remoteDB;
  }

  return (remoteDB = new PouchDB(`${dbName}`));
}

// export class CouchDbProvider {

//     private db: PouchDB.Database<{}>;

//     getCouchDb(dbName:string = "brewing_support_db"): PouchDB.Database<{}> {

//         if

//         return new PouchDB(
//             `${dbName}`,
//             {
//                 skip_setup: true
//             });
//     }
// }
// export default new CouchDbProvider();
