import { RecieveEvent, RecieveEventPlainObject } from "@/models/recieveEvent";
import { fetchAll, remove, save } from "@/repositories/recieveEventRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");

describe("recieveEventRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const recieveEvents = modelHelper.createRecieveEvents();
    const recieveEventsPO = recieveEvents.map(
      (recieveEvent: RecieveEvent): RecieveEventPlainObject =>
        recieveEvent.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(recieveEventsPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(recieveEvents[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith("recieve_event-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;

    const recieveEvents = modelHelper.createRecieveEvents();

    await remove(recieveEvents[2]);

    expect(mockedRemoveDocument).toBeCalledWith(recieveEvents[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const recieveEvents = modelHelper.createRecieveEvents();

    const result = await save(recieveEvents[2]);

    const recieveEventPO = recieveEvents[2].toPlainObject();
    const recieveEventSaveObject: RecieveEventPlainObject & {
      type: string;
    } = {
      ...recieveEventPO,
      type: "recieve_event",
    };

    expect(mockedSaveDocument).toBeCalledWith(recieveEventSaveObject);
    expect(result).toEqual({ id: recieveEvents[2].id });
  });
});
