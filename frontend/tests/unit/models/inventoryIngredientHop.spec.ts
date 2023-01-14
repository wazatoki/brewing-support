import { InventoryIngredientHop } from "@/models/inventoryIngredientHop";
import { createInventoryIngredientHop, createHops } from "./helper";

describe("inventoryIngredientHop.ts", () => {
  it("InventoryIngredientHop shall create with no options.", () => {
    const iIngredientHop = new InventoryIngredientHop();
    expect(iIngredientHop.id).toContain("inventory_ingredient_hop-");
    expect(iIngredientHop.hop.id).toContain("hop-");
    expect(iIngredientHop.resultValue).toEqual(0);
    expect(iIngredientHop.calculatedValue).toEqual(0);
    expect(iIngredientHop.adjustedValue).toEqual(0);
    expect(iIngredientHop.note).toEqual("");
  });

  it("InventoryIngredientHop shall create with options.", () => {
    const iIngredientHops = createInventoryIngredientHop();
    expect(iIngredientHops[1].id).toEqual("inventory_ingredient_hop-id-1");
    expect(iIngredientHops[1].hop.id).toEqual("test-hop-id-1");
    expect(iIngredientHops[1].resultValue).toEqual(1);
    expect(iIngredientHops[1].calculatedValue).toEqual(1);
    expect(iIngredientHops[1].adjustedValue).toEqual(1);
    expect(iIngredientHops[1].note).toEqual("inventory_ingredient_hop-note-1");
  });

  it("convertAdjustedValueToBaseUnit", () => {
    const iIngredientHops = createInventoryIngredientHop();
    jest.spyOn(iIngredientHops[1].hop.stockingUnit, "convertToBaseUnit");
    iIngredientHops[1].convertAdjustedValueToBaseUnit;
    expect(
      iIngredientHops[1].hop.brewingUnit.convertToBaseUnit
    ).toHaveBeenCalled();
  });

  it("toPlainObject", () => {
    const iIngredientHops = createInventoryIngredientHop();
    const hops = createHops();
    const result = iIngredientHops[2].toPlainObject();
    expect(result).toEqual({
      id: "inventory_ingredient_hop-id-2",
      hop: hops[2].toPlainObject(),
      resultValue: 2,
      calculatedValue: 2,
      adjustedValue: 2,
      note: "inventory_ingredient_hop-note-2",
    });
  });
});
