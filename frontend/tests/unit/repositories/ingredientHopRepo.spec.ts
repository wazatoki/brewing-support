import { Hop, HopPlainObject } from "@/models/ingredientHop";
import { fetchAll, remove, save } from "@/repositories/ingredientHopRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");

describe("ingredientHopRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const ingredientHops = modelHelper.createHops();
    const ingredientHopsPO = ingredientHops.map(
      (hop: Hop): HopPlainObject => hop.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(ingredientHopsPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(ingredientHops[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith("hop-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;

    const ingredientHops = modelHelper.createHops();

    await remove(ingredientHops[2]);

    expect(mockedRemoveDocument).toBeCalledWith(ingredientHops[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const ingredientHops = modelHelper.createHops();

    const result = await save(ingredientHops[2]);

    const hopPO = ingredientHops[2].toPlainObject();
    const ingredientHopSaveObject: HopPlainObject & {
      type: string;
    } = {
      ...hopPO,
      type: "hop",
    };

    expect(mockedSaveDocument).toBeCalledWith(ingredientHopSaveObject);
    expect(result).toEqual({ id: ingredientHops[2].id });
  });
});
