import { Ingredient, IngredientPlainObject } from "@/models/ingredient";
import { fetchAll, remove, save } from "@/repositories/ingredientRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";

jest.mock("@/repositories/pouchdb");

describe("ingredientRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const ingredients = modelHelper.createIngredients();
    const ingredientsPO = ingredients.map(
      (ingredient: Ingredient): IngredientPlainObject =>
        ingredient.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(ingredientsPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(ingredients[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith("ingredient-");
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;

    const ingredients = modelHelper.createIngredients();

    await remove(ingredients[2]);

    expect(mockedRemoveDocument).toBeCalledWith(ingredients[2].id);
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const ingredients = modelHelper.createIngredients();

    const result = await save(ingredients[2]);

    const ingredientPO = ingredients[2].toPlainObject();
    const ingredientGrainSaveObject: IngredientPlainObject & {
      type: string;
    } = {
      ...ingredientPO,
      type: "ingredient",
    };

    expect(mockedSaveDocument).toBeCalledWith(ingredientGrainSaveObject);
    expect(result).toEqual({ id: ingredients[2].id });
  });
});
