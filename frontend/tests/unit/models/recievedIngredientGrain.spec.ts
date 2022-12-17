import * as recievedIngredientGrain from "@/models/recievedIngredientGrain";
import * as ingredientGrain from "@/models/ingredientGrain";
import { Unit } from "@/models/unit";
import { createRecievedIngredientGrain } from "./helper";

export const recievedIngredientGrains: recievedIngredientGrain.RecievedIngredientGrain[] =
  [];

describe("RecievedIngredientGrain.ts", () => {
  it("RecievedIngredientGrain shall create with no options.", () => {
    const rIngredientGrain =
      new recievedIngredientGrain.RecievedIngredientGrain();
    expect(rIngredientGrain.id).toContain(recievedIngredientGrain.prefix);
    expect(rIngredientGrain.quantity).toEqual(0);
    expect(rIngredientGrain.grain.id).toContain(ingredientGrain.prefix);
    expect(rIngredientGrain.grain.name).toEqual("");
    expect(rIngredientGrain.grain.potential).toEqual(0);
    expect(rIngredientGrain.grain.brewingUnit).toBeInstanceOf(Unit);
    expect(rIngredientGrain.grain.recievingUnit).toBeInstanceOf(Unit);
    expect(rIngredientGrain.grain.stockingUnit).toBeInstanceOf(Unit);
  });

  it("RecievedIngredientGrain shall create with options.", () => {
    const grains = createRecievedIngredientGrain();
    expect(grains[1].id).toContain("test-recieved_ingredient_grain-id-1");
    expect(grains[1].quantity).toEqual(1);
    expect(grains[1].grain.id).toEqual("test-grain-id-1");
    expect(grains[1].grain.name).toEqual("test-grain-name-1");
    expect(grains[1].grain.potential).toEqual(1);
  });

  it("convertToBaseUnit", () => {
    const grains = createRecievedIngredientGrain();
    jest.spyOn(grains[1].grain.brewingUnit, "convertToBaseUnit");
    grains[1].convertToBaseUnit;
    expect(grains[1].grain.brewingUnit.convertToBaseUnit).toHaveBeenCalled();
  });

  it("convertToStockingUnit", () => {
    const grains = createRecievedIngredientGrain();
    const result = grains[1].convertToStockingUnit;
    expect(result).toEqual({
      quantity: 1,
      stockingUnit: grains[1].grain.stockingUnit,
    });
  });
});
