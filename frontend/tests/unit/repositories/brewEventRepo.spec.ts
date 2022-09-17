import PouchDB from "pouchdb";
import * as pouchdb from "@/repositories/pouchdb";
import { save } from "@/repositories/brewEventRepo";
import { BrewEvent } from "@/models/brewEvent";

jest.mock("@/repositories/pouchdb");
jest.mock("pouchdb");

const mockedGetDBInstance = jest.spyOn(pouchdb, "getDBInstance");

// This is actually creates a **mocked pouchDb instance**. When we told Jest to import the pouchDb module it replaced constructors with ones that creates mocks.
const mockedPouchDbInstance = new PouchDB();

// We do this just so we can configure the mock pouchDb's methods in a type safe way.
const mockedPouchDbConfig = mockedPouchDbInstance as jest.Mocked<
  typeof mockedPouchDbInstance
>;

mockedGetDBInstance.mockReturnValue(mockedPouchDbInstance);

describe("brewEventRepo.ts", () => {
  it("returns error null when passed", async () => {
    const promise1 = new Promise<PouchDB.Core.Response>((resolve) => {
      resolve({ ok: true, id: "1asd", rev: "1asc" });
    });

    mockedPouchDbConfig.put.mockResolvedValue(promise1);

    const be = new BrewEvent();

    await save(be);
    expect(mockedPouchDbConfig.put).toBeCalled();
  });

  it("returns err when not passed", async () => {
    const promise1 = new Promise<PouchDB.Core.Response>((resolve, reject) => {
      reject();
    });

    mockedPouchDbConfig.put.mockResolvedValue(promise1);

    const be = new BrewEvent();

    try {
      await save(be);
    } catch (e) {
      expect(e).toEqual(new Error("db error"));
    }

    expect(mockedPouchDbConfig.put).toBeCalled();
  });
});
