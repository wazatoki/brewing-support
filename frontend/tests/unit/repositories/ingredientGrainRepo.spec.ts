import { Grain, GrainPlainObject } from "@/models/ingredientGrain";
import { fetchAll, remove, save } from "@/repositories/ingredientGrainRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");

describe("ingredientGrainRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const ingredientGrains = modelHelper.createGrains();
    const ingredientGrainsPO = ingredientGrains.map(
      (grain: Grain): GrainPlainObject => grain.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(ingredientGrainsPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(ingredientGrains[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith("grain-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;

    const ingredientGrains = modelHelper.createGrains();

    await remove(ingredientGrains[2]);

    expect(mockedRemoveDocument).toBeCalledWith(ingredientGrains[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const ingredientGrains = modelHelper.createGrains();

    const result = await save(ingredientGrains[2]);

    const grainPO = ingredientGrains[2].toPlainObject();
    const ingredientGrainSaveObject: GrainPlainObject & {
      type: string;
    } = {
      ...grainPO,
      type: "grain",
    };

    expect(mockedSaveDocument).toBeCalledWith(ingredientGrainSaveObject);
    expect(result).toEqual({ id: ingredientGrains[2].id });
  });
});
