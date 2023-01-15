import { BrewEvent, BrewEventPlainObject } from "@/models/brewEvent";
import { fetchAll, remove, save } from "@/repositories/brewEventRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
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
    expect(mockedFetchAllDocuments).toBeCalledWith("brew_event-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;
    const brewEvents = modelHelper.createBrewEvents();

    await remove(brewEvents[2]);

    expect(mockedRemoveDocument).toBeCalledWith(brewEvents[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const brewEvents = modelHelper.createBrewEvents();

    const result = await save(brewEvents[2]);

    const brewEventPO = brewEvents[2].toPlainObject();
    const brewEventSaveObject: BrewEventPlainObject & { type: string } = {
      ...brewEventPO,
      type: "brew_event",
    };

    expect(mockedSaveDocument).toBeCalledWith(brewEventSaveObject);
    expect(result).toEqual({ id: brewEvents[2].id });
  });
});
