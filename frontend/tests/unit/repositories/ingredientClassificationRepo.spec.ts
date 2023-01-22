import {
  IngredientClassification,
  IngredientClassificationPlainObject,
} from "@/models/ingredientClassification";
import {
  fetchAll,
  remove,
  save,
} from "@/repositories/ingredientClassificationRepo";
import {
  fetchAllDocuments,
  remove as removeDocument,
  save as saveDocument,
} from "@/repositories/pouchdb";
import * as modelHelper from "../models/helper";
import { fetchAll as ingredientFetchAll } from "@/repositories/ingredientRepo";
import { ingredientClassificationReferencingList } from "@/services/ingredient";
import { Ingredient } from "@/models/ingredient";

jest.mock("@/repositories/pouchdb");
jest.mock("@/repositories/ingredientRepo");
jest.mock("@/services/ingredient");

describe("ingredientClassificationRepo.ts", () => {
  it("fetchAll", async () => {
    const mockedFetchAllDocuments = fetchAllDocuments as jest.MockedFunction<
      typeof fetchAllDocuments
    >;
    const ingredientClassifications =
      modelHelper.createIngredientClassification();
    const ingredientClassificationsPO = ingredientClassifications.map(
      (ic: IngredientClassification): IngredientClassificationPlainObject =>
        ic.toPlainObject()
    );

    mockedFetchAllDocuments.mockResolvedValue(ingredientClassificationsPO);
    const result = await fetchAll();

    expect(result.result[2]).toEqual(ingredientClassifications[2]);
    expect(mockedFetchAllDocuments).toBeCalledWith(
      "ingredient_classification-"
    );
  });

  it("remove", async () => {
    const mockedRemoveDocument = removeDocument as jest.MockedFunction<
      typeof removeDocument
    >;
    const mockedIngredientFetchAll = ingredientFetchAll as jest.MockedFunction<
      typeof ingredientFetchAll
    >;

    const mockedIngredientClassificationReferencingList =
      ingredientClassificationReferencingList as jest.MockedFunction<
        typeof ingredientClassificationReferencingList
      >;
    const ingredientClassifications =
      modelHelper.createIngredientClassification();

    const ingredients = modelHelper.createIngredients();

    mockedIngredientFetchAll.mockResolvedValue({ result: ingredients });

    mockedIngredientClassificationReferencingList.mockReturnValue(
      [] as Ingredient[]
    );

    await remove(ingredientClassifications[2]);

    expect(mockedRemoveDocument).toBeCalledWith(
      ingredientClassifications[2].id
    );
  });

  it("save", async () => {
    const mockedSaveDocument = saveDocument as jest.MockedFunction<
      typeof saveDocument
    >;
    const ingredientClassifications =
      modelHelper.createIngredientClassification();

    const result = await save(ingredientClassifications[2]);

    const ingredientClassificationPO =
      ingredientClassifications[2].toPlainObject();
    const ingredientClassificationSaveObject: IngredientClassificationPlainObject & {
      type: string;
    } = {
      ...ingredientClassificationPO,
      type: "ingredient_classification",
    };

    expect(mockedSaveDocument).toBeCalledWith(
      ingredientClassificationSaveObject
    );
    expect(result).toEqual({ id: ingredientClassifications[2].id });
  });
});
