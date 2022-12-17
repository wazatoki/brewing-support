import { InventoryIngredient } from "@/models/inventoryIngredient";
import { createInventoryIngredient } from "./helper";

describe("inventoryIngredient.ts", () => {
  it("InventoryIngredient shall create with no options.", () => {
    const iIngredient = new InventoryIngredient();
    expect(iIngredient.id).toContain("inventory_ingredient-");
    expect(iIngredient.ingredient.id).toContain("ingredient-");
    expect(iIngredient.resultValue).toEqual(0);
    expect(iIngredient.calculatedValue).toEqual(0);
    expect(iIngredient.adjustedValue).toEqual(0);
    expect(iIngredient.note).toEqual("");
  });

  it("InventoryIngredient shall create with options.", () => {
    const iIngredients = createInventoryIngredient();
    expect(iIngredients[1].id).toEqual("inventory_ingredient-id-1");
    expect(iIngredients[1].ingredient.id).toEqual("test-ingredient-id-1");
    expect(iIngredients[1].resultValue).toEqual(1);
    expect(iIngredients[1].calculatedValue).toEqual(1);
    expect(iIngredients[1].adjustedValue).toEqual(1);
    expect(iIngredients[1].note).toEqual("inventory_ingredient-note-1");
  });

  it("convertAdjustedValueToBaseUnit", () => {
    const iIngredients = createInventoryIngredient();
    jest.spyOn(iIngredients[1].ingredient.stockingUnit, "convertToBaseUnit");
    iIngredients[1].convertAdjustedValueToBaseUnit;
    expect(
      iIngredients[1].ingredient.brewingUnit.convertToBaseUnit
    ).toHaveBeenCalled();
  });
});
