import { Ingredient } from "@/models/ingredient";
import {
  ingredientClassificationReferencingList,
  unitReferencingList,
  sortByClassifientNameAndName,
} from "@/services/ingredient";
import * as modelHelper from "../models/helper";

describe("services/ingredient.ts", () => {
  it("ingredientClassificationReferencingList", () => {
    const sourceIngredients = modelHelper.createIngredients();
    const sourceIngredientClassifications =
      modelHelper.createIngredientClassification();
    const ingredients = [] as Ingredient[];
    ingredients.push(sourceIngredients[1]);
    ingredients.push(sourceIngredients[2]);
    ingredients.push(sourceIngredients[3]);

    const result = ingredientClassificationReferencingList(
      ingredients,
      sourceIngredientClassifications[1]
    );

    expect(result).toEqual([sourceIngredients[1]]);
  });

  it("unitReferencingList", () => {
    const sourceIngredients = modelHelper.createIngredients();
    const sourceUnits = modelHelper.createUnits();
    const ingredients = [] as Ingredient[];
    ingredients.push(sourceIngredients[1]);
    ingredients.push(sourceIngredients[2]);
    ingredients.push(sourceIngredients[3]);

    const result = unitReferencingList(ingredients, sourceUnits[1]);

    expect(result).toEqual([sourceIngredients[1]]);
  });

  it("sortByClassifientNameAndName", () => {
    const ingredients = [] as Ingredient[];
    const sourceIngredients = modelHelper.createIngredients();
    ingredients.push(sourceIngredients[6]);
    ingredients.push(sourceIngredients[2]);
    ingredients.push(sourceIngredients[9]);
    ingredients.push(sourceIngredients[8]);
    ingredients.push(sourceIngredients[3]);

    const sortedIngredients = [] as Ingredient[];
    sortedIngredients.push(sourceIngredients[2]);
    sortedIngredients.push(sourceIngredients[3]);
    sortedIngredients.push(sourceIngredients[6]);
    sortedIngredients.push(sourceIngredients[8]);
    sortedIngredients.push(sourceIngredients[9]);
    const result = sortByClassifientNameAndName(ingredients);
    expect(result).toEqual(sortedIngredients);
  });
});
