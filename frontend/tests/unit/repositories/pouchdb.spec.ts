import * as pouchdb from "@/repositories/pouchdb";

describe("pouchdb.ts", () => {
  it("fetchAllDocuments", async () => {
    const prefix = "pouchdb-fetchAll-test-";
    await pouchdb.getDBInstance("pouchdb-fetchAll-test").destroy();
    const db = pouchdb.getDBInstance("pouchdb-fetchAll-test");
    for (let i = 0; i < 10; i++) {
      await db.put({
        _id: prefix + "id-" + i,
        id: prefix + "id-" + i,
        name: prefix + "name-" + i,
      });
    }
    const elms = await pouchdb.fetchAllDocuments<{ id: string; name: string }>(
      prefix,
      "pouchdb-fetchAll-test"
    );
    expect(elms.length).toEqual(10);
    for (let i = 0; i < 10; i++) {
      expect(elms[i].id).toEqual(prefix + "id-" + i);
      expect(elms[i].name).toEqual(prefix + "name-" + i);
    }
  });

  it("remove", async () => {
    const prefix = "pouchdb-remove-test-";
    await pouchdb.getDBInstance("pouchdb-remove-test").destroy();
    const db = pouchdb.getDBInstance("pouchdb-remove-test");
    for (let i = 0; i < 10; i++) {
      await db.put({
        _id: prefix + "id-" + i,
        id: prefix + "id-" + i,
        name: prefix + "name-" + i,
      });
    }
    await pouchdb.remove<{ id: string; name: string }>(
      prefix + "id-1",
      "pouchdb-remove-test"
    );
    const docs = await db.allDocs<{ id: string; name: string }>({
      include_docs: true,
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });

    expect(docs.rows.length).toEqual(9);
    expect(docs.rows[0].doc?.id).toEqual(prefix + "id-0");
    expect(docs.rows[0].doc?.name).toEqual(prefix + "name-0");
    expect(docs.rows[1].doc?.id).toEqual(prefix + "id-2");
    expect(docs.rows[1].doc?.name).toEqual(prefix + "name-2");
  });

  it("save update data", async () => {
    const typename = "pouchdb-save-test";
    const prefix = "-";
    await pouchdb.getDBInstance("pouchdb-save-test").destroy();
    const db = pouchdb.getDBInstance("pouchdb-save-test");
    for (let i = 0; i < 10; i++) {
      await db.put({
        _id: prefix + "id-" + i,
        id: prefix + "id-" + i,
        type: typename,
        name: prefix + "name-" + i,
      });
    }

    await pouchdb.save<{ id: string; name: string }>(
      { id: prefix + "id-1", type: typename, name: "updated-name" },
      "pouchdb-save-test"
    );
    const doc = await db.get<{ id: string; name: string }>(prefix + "id-1");

    expect(doc.name).toEqual("updated-name");
  });

  it("save new data", async () => {
    const typename = "pouchdb-save-test";
    const prefix = "-";
    await pouchdb.getDBInstance("pouchdb-save-test").destroy();
    const db = pouchdb.getDBInstance("pouchdb-save-test");
    for (let i = 0; i < 10; i++) {
      await db.put({
        _id: prefix + "id-" + i,
        id: prefix + "id-" + i,
        type: typename,
        name: prefix + "name-" + i,
      });
    }

    await pouchdb.save<{ id: string; name: string }>(
      { id: prefix + "id-10", type: typename, name: prefix + "name-10" },
      "pouchdb-save-test"
    );
    const doc = await db.get<{ id: string; name: string }>(prefix + "id-10");
    expect(doc.name).toEqual(prefix + "name-10");
    const docs = await db.allDocs<{ id: string; type: string; name: string }>({
      startkey: prefix,
      endkey: prefix + "\ufff0",
    });
    expect(docs.rows.length).toEqual(11);
  });
});
