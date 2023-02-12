import { sortByName } from "@/services/ingredientClassification";
import { IngredientClassification } from "@/models/ingredientClassification";
import * as modelHelper from "../models/helper";

describe("services/ingredientClassification.ts", () => {
  it("sortByName", () => {
    const sourceIngredientClassifications =
      modelHelper.createIngredientClassification();
    const ingredientClassifications = [] as IngredientClassification[];
    ingredientClassifications.push(sourceIngredientClassifications[5]);
    ingredientClassifications.push(sourceIngredientClassifications[3]);
    ingredientClassifications.push(sourceIngredientClassifications[1]);
    ingredientClassifications.push(sourceIngredientClassifications[2]);
    ingredientClassifications.push(sourceIngredientClassifications[4]);

    const sortedIngredientClassifications = [] as IngredientClassification[];
    sortedIngredientClassifications.push(sourceIngredientClassifications[1]);
    sortedIngredientClassifications.push(sourceIngredientClassifications[2]);
    sortedIngredientClassifications.push(sourceIngredientClassifications[3]);
    sortedIngredientClassifications.push(sourceIngredientClassifications[4]);
    sortedIngredientClassifications.push(sourceIngredientClassifications[5]);

    const result = sortByName(ingredientClassifications);

    expect(result).toEqual(sortedIngredientClassifications);
  });
});
