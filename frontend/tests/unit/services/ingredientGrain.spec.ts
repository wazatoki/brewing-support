import { Grain } from "@/models/ingredientGrain";
import { unitReferencingList, sortByName } from "@/services/ingredientGrain";
import * as modelHelper from "../models/helper";

describe("services/ingredientGrain.ts", () => {
  it("unitReferencingList", () => {
    const sourceIngredientGrains = modelHelper.createGrains();
    const units = modelHelper.createUnits();
    const grains = [] as Grain[];
    grains.push(sourceIngredientGrains[3]);
    grains.push(sourceIngredientGrains[1]);
    grains.push(sourceIngredientGrains[2]);
    const result = unitReferencingList(grains, units[2]);
    expect(result).toEqual([sourceIngredientGrains[2]]);
  });

  it("sortByName", () => {
    const sourceIngredientGrains = modelHelper.createGrains();
    const grains = [] as Grain[];
    const sortedGrains = [] as Grain[];
    grains.push(sourceIngredientGrains[3]);
    grains.push(sourceIngredientGrains[1]);
    grains.push(sourceIngredientGrains[2]);

    sortedGrains.push(sourceIngredientGrains[1]);
    sortedGrains.push(sourceIngredientGrains[2]);
    sortedGrains.push(sourceIngredientGrains[3]);

    const result = sortByName(grains);

    expect(result).toEqual(sortedGrains);
  });
});
