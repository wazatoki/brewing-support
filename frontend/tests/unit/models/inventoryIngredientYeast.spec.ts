import { InventoryIngredientYeast } from "@/models/inventoryIngredientYeast";
import { createInventoryIngredientYeast, createYeasts } from "./helper";

describe("inventoryIngredientYeast.ts", () => {
  it("InventoryIngredientYeast shall create with no options.", () => {
    const iIngredientYeast = new InventoryIngredientYeast();
    expect(iIngredientYeast.id).toContain("inventory_ingredient_yeast-");
    expect(iIngredientYeast.yeast.id).toContain("yeast-");
    expect(iIngredientYeast.resultValue).toEqual(0);
    expect(iIngredientYeast.calculatedValue).toEqual(0);
    expect(iIngredientYeast.adjustedValue).toEqual(0);
    expect(iIngredientYeast.note).toEqual("");
  });

  it("InventoryIngredientYeast shall create with options.", () => {
    const iIngredientYeasts = createInventoryIngredientYeast();
    expect(iIngredientYeasts[1].id).toEqual("inventory_ingredient_yeast-id-1");
    expect(iIngredientYeasts[1].yeast.id).toEqual("test-yeast-id-1");
    expect(iIngredientYeasts[1].resultValue).toEqual(1);
    expect(iIngredientYeasts[1].calculatedValue).toEqual(1);
    expect(iIngredientYeasts[1].adjustedValue).toEqual(1);
    expect(iIngredientYeasts[1].note).toEqual(
      "inventory_ingredient_yeast-note-1"
    );
  });

  it("convertAdjustedValueToBaseUnit", () => {
    const iIngredientYeasts = createInventoryIngredientYeast();
    jest.spyOn(iIngredientYeasts[1].yeast.stockingUnit, "convertToBaseUnit");
    iIngredientYeasts[1].convertAdjustedValueToBaseUnit;
    expect(
      iIngredientYeasts[1].yeast.brewingUnit.convertToBaseUnit
    ).toHaveBeenCalled();
  });

  it("toPlainObject", () => {
    const iIngredientYeasts = createInventoryIngredientYeast();
    const yeasts = createYeasts();
    const result = iIngredientYeasts[2].toPlainObject();
    expect(result).toEqual({
      id: "inventory_ingredient_yeast-id-2",
      yeast: yeasts[2].toPlainObject(),
      resultValue: 2,
      calculatedValue: 2,
      adjustedValue: 2,
      note: "inventory_ingredient_yeast-note-2",
    });
  });
});
