import { InventoryIngredientGrain } from "@/models/inventoryIngredientGrain";
import { createInventoryIngredientGrain, createGrains } from "./helper";

describe("inventoryIngredientGrain.ts", () => {
  it("InventoryIngredientGrain shall create with no options.", () => {
    const iIngredientGrain = new InventoryIngredientGrain();
    expect(iIngredientGrain.id).toContain("inventory_ingredient_grain-");
    expect(iIngredientGrain.grain.id).toContain("grain-");
    expect(iIngredientGrain.resultValue).toEqual(0);
    expect(iIngredientGrain.calculatedValue).toEqual(0);
    expect(iIngredientGrain.adjustedValue).toEqual(0);
    expect(iIngredientGrain.note).toEqual("");
  });

  it("InventoryIngredientGrain shall create with options.", () => {
    const iIngredientGrains = createInventoryIngredientGrain();
    expect(iIngredientGrains[1].id).toEqual("inventory_ingredient_grain-id-1");
    expect(iIngredientGrains[1].grain.id).toEqual("test-grain-id-1");
    expect(iIngredientGrains[1].resultValue).toEqual(1);
    expect(iIngredientGrains[1].calculatedValue).toEqual(1);
    expect(iIngredientGrains[1].adjustedValue).toEqual(1);
    expect(iIngredientGrains[1].note).toEqual(
      "inventory_ingredient_grain-note-1"
    );
  });

  it("convertAdjustedValueToBaseUnit", () => {
    const iIngredientGrains = createInventoryIngredientGrain();
    jest.spyOn(iIngredientGrains[1].grain.stockingUnit, "convertToBaseUnit");
    iIngredientGrains[1].convertAdjustedValueToBaseUnit;
    expect(
      iIngredientGrains[1].grain.brewingUnit.convertToBaseUnit
    ).toHaveBeenCalled();
  });

  it("toPlainObject", () => {
    const iIngredientGrains = createInventoryIngredientGrain();
    const grains = createGrains();
    const result = iIngredientGrains[2].toPlainObject();
    expect(result).toEqual({
      id: "inventory_ingredient_grain-id-2",
      grain: grains[2].toPlainObject(),
      resultValue: 2,
      calculatedValue: 2,
      adjustedValue: 2,
      note: "inventory_ingredient_grain-note-2",
    });
  });
});
