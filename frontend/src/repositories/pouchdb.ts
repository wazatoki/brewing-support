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

  return (remoteDB = new PouchDB(`${dbName}`, {
    auth: { username: "brewing_support", password: "brewing_support" },
  }));
}

export async function createDatabase() {
  return getDBInstance().sync(getRemoteDBInstance(), {
    live: true,
  });
}

export async function destroyDatabase() {
  return getDBInstance().destroy();
}

export async function fetchAllDocuments<T>(
  startkey: string,
  dbName = ""
): Promise<T[]> {
  const resultArray = [] as T[];
  try {
    const fetchedDocuments = await getDBInstance(dbName).allDocs<T>({
      include_docs: true,
      startkey: startkey,
      endkey: startkey + "\ufff0",
    });
    fetchedDocuments.rows.forEach(
      (item: {
        doc?:
          | PouchDB.Core.ExistingDocument<T & PouchDB.Core.AllDocsMeta>
          | undefined;
        id: string;
        key: string;
        value: {
          rev: string;
          deleted?: boolean | undefined;
        };
      }) => {
        if (item.doc) {
          resultArray.push(item.doc);
        }
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
  return resultArray;
}

export async function fetchByID<T>(id: string, dbName = ""): Promise<T> {
  try {
    const result = await getDBInstance(dbName).get<T>(id);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function remove<T>(id: string, dbName = "") {
  try {
    const doc = await getDBInstance(dbName).get<T>(id);
    if (doc) {
      await getDBInstance(dbName).remove(doc);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save<T>(
  obj: T & { id: string; type: string },
  dbName = ""
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = await getDBInstance(dbName).get<T>(obj.id);
    Object.keys(obj).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      doc[key] = (obj as any)[key];
    });

    try {
      await getDBInstance(dbName).put(doc);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      throw new Error(e.name);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.name === "not_found") {
      const doc = { ...obj, _id: obj.id };
      try {
        await getDBInstance(dbName).put(doc);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e);
        throw new Error(e.name);
      }
    }
  }
}
