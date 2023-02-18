import { Hop } from "@/models/ingredientHop";
import { unitReferencingList, sortByName } from "@/services/ingredientHop";
import * as modelHelper from "../models/helper";

describe("services/ingredientHop.ts", () => {
  it("unitReferencingList", () => {
    const sourceIngredientHops = modelHelper.createHops();
    const units = modelHelper.createUnits();
    const hops = [] as Hop[];
    hops.push(sourceIngredientHops[3]);
    hops.push(sourceIngredientHops[1]);
    hops.push(sourceIngredientHops[2]);
    const result = unitReferencingList(hops, units[2]);
    expect(result).toEqual([sourceIngredientHops[2]]);
  });

  it("sortByName", () => {
    const sourceIngredientHops = modelHelper.createHops();
    const hops = [] as Hop[];
    const sortedHops = [] as Hop[];
    hops.push(sourceIngredientHops[3]);
    hops.push(sourceIngredientHops[1]);
    hops.push(sourceIngredientHops[2]);

    sortedHops.push(sourceIngredientHops[1]);
    sortedHops.push(sourceIngredientHops[2]);
    sortedHops.push(sourceIngredientHops[3]);

    const result = sortByName(hops);

    expect(result).toEqual(sortedHops);
  });
});
