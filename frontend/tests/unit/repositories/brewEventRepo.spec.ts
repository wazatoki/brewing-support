import { BrewEvent, BrewEventPlainObject } from "@/models/brewEvent";
import { fetchAll } from "@/repositories/brewEventRepo";
import { fetchAllDocuments } from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");

describe("brewEventRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const brewEvents = modelHelper.createBrewEvents();
    const brewEventsPO = brewEvents.map(
      (be: BrewEvent): BrewEventPlainObject => be.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(brewEventsPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(brewEvents[2]);
  });
});
