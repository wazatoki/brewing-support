import * as consumedIngredientGrain from "@/models/consumedIngredientGrain";
import * as ingredientGrain from "@/models/ingredientGrain";
import { Unit } from "@/models/unit";
import { createConsumedIngredientGrain } from "./helper";

export const consumedIngredientGrains: consumedIngredientGrain.ConsumedIngredientGrain[] =
  [];

describe("ConsumedIngredientGrain.ts", () => {
  it("ConsumedIngredientGrain shall create with no options.", () => {
    const g = new consumedIngredientGrain.ConsumedIngredientGrain();
    expect(g.id).toContain(consumedIngredientGrain.prefix);
    expect(g.quantity).toEqual(0);
    expect(g.grain.id).toContain(ingredientGrain.prefix);
    expect(g.grain.name).toEqual("");
    expect(g.grain.potential).toEqual(0);
    expect(g.grain.brewingUnit).toBeInstanceOf(Unit);
    expect(g.grain.recievingUnit).toBeInstanceOf(Unit);
    expect(g.grain.stockingUnit).toBeInstanceOf(Unit);
  });

  it("ConsumedIngredientGrain shall create with options.", () => {
    const grains = createConsumedIngredientGrain();
    expect(grains[1].id).toContain("test-consumed_ingredient_grain-id-1");
    expect(grains[1].quantity).toEqual(1);
    expect(grains[1].grain.id).toEqual("test-grain-id-1");
    expect(grains[1].grain.name).toEqual("test-grain-name-1");
    expect(grains[1].grain.potential).toEqual(1);
  });

  it("convertToBaseUnit", () => {
    const grains = createConsumedIngredientGrain();
    jest.spyOn(grains[1].grain.brewingUnit, "convertToBaseUnit");
    grains[1].convertToBaseUnit;
    expect(grains[1].grain.brewingUnit.convertToBaseUnit).toHaveBeenCalled();
  });

  it("convertToStockingUnit", () => {
    const grains = createConsumedIngredientGrain();
    const result = grains[1].convertToStockingUnit;
    expect(result).toEqual({
      quantity: 1,
      stockingUnit: grains[1].grain.stockingUnit,
    });
  });
});
