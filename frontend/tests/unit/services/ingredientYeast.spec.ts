import { Yeast } from "@/models/ingredientYeast";
import { unitReferencingList, sortByName } from "@/services/ingredientYeast";
import * as modelHelper from "../models/helper";

describe("services/ingredientYeast.ts", () => {
  it("unitReferencingList", () => {
    const sourceIngredientYeasts = modelHelper.createYeasts();
    const units = modelHelper.createUnits();
    const yeasts = [] as Yeast[];
    yeasts.push(sourceIngredientYeasts[3]);
    yeasts.push(sourceIngredientYeasts[1]);
    yeasts.push(sourceIngredientYeasts[2]);
    const result = unitReferencingList(yeasts, units[2]);
    expect(result).toEqual([sourceIngredientYeasts[2]]);
  });

  it("sortByName", () => {
    const sourceIngredientYeasts = modelHelper.createYeasts();
    const yeasts = [] as Yeast[];
    const sortedYeasts = [] as Yeast[];
    yeasts.push(sourceIngredientYeasts[3]);
    yeasts.push(sourceIngredientYeasts[1]);
    yeasts.push(sourceIngredientYeasts[2]);

    sortedYeasts.push(sourceIngredientYeasts[1]);
    sortedYeasts.push(sourceIngredientYeasts[2]);
    sortedYeasts.push(sourceIngredientYeasts[3]);

    const result = sortByName(yeasts);

    expect(result).toEqual(sortedYeasts);
  });
});
