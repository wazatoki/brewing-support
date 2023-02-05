import { Unit, UnitPlainObject } from "@/models/unit";
import { Ingredient } from "@/models/ingredient";
import { fetchAll, remove, save } from "@/repositories/unitRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import { fetchAll as ingredientFetchAll } from "@/repositories/ingredientRepo";
import { unitReferencingList } from "@/services/ingredient";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");
jest.mock("@/repositories/ingredientRepo");
jest.mock("@/services/ingredient");

describe("unitRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const units = modelHelper.createUnits();
    const unitsPO = units.map(
      (unit: Unit): UnitPlainObject => unit.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(unitsPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(units[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith("unit-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;
    const mockedIngredientFetchAll = ingredientFetchAll as jest.MockedFunction<
      typeof ingredientFetchAll
    >;

    const mockedUnitReferencingList =
      unitReferencingList as jest.MockedFunction<typeof unitReferencingList>;

    const ingredients = modelHelper.createIngredients();
    const units = modelHelper.createUnits();

    mockedIngredientFetchAll.mockResolvedValue({ result: ingredients });

    mockedUnitReferencingList.mockReturnValue([] as Ingredient[]);

    await remove(units[2]);

    expect(mockedRemoveDocument).toBeCalledWith(units[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const units = modelHelper.createUnits();

    const result = await save(units[2]);

    const unitPO = units[2].toPlainObject();
    const unitSaveObject: UnitPlainObject & {
      type: string;
    } = {
      ...unitPO,
      type: "unit",
    };

    expect(mockedSaveDocument).toBeCalledWith(unitSaveObject);
    expect(result).toEqual({ id: units[2].id });
  });
});
