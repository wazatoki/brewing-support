import { Yeast, YeastPlainObject } from "@/models/ingredientYeast";
import { fetchAll, remove, save } from "@/repositories/ingredientYeastRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");

describe("ingredientYeastRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const ingredientYeasts = modelHelper.createYeasts();
    const ingredientYeastsPO = ingredientYeasts.map(
      (yeast: Yeast): YeastPlainObject => yeast.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(ingredientYeastsPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(ingredientYeasts[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith("yeast-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;

    const ingredientYeasts = modelHelper.createYeasts();

    await remove(ingredientYeasts[2]);

    expect(mockedRemoveDocument).toBeCalledWith(ingredientYeasts[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const ingredientYeasts = modelHelper.createYeasts();

    const result = await save(ingredientYeasts[2]);

    const yeastPO = ingredientYeasts[2].toPlainObject();
    const ingredientYeastSaveObject: YeastPlainObject & {
      type: string;
    } = {
      ...yeastPO,
      type: "yeast",
    };

    expect(mockedSaveDocument).toBeCalledWith(ingredientYeastSaveObject);
    expect(result).toEqual({ id: ingredientYeasts[2].id });
  });
});
