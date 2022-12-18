import { Inventory, prefix } from "@/models/inventory";
import { createInventories } from "./helper";

describe("inventory.ts", () => {
  it("Inventory shall create with no options.", () => {
    const inventory = new Inventory();
    expect(inventory.id).toContain(prefix);
    expect(typeof inventory.onDate).not.toBe("undefined");
    expect(inventory.ingredients.length).toEqual(0);
    expect(inventory.grains.length).toEqual(0);
    expect(inventory.hops.length).toEqual(0);
    expect(inventory.yeasts.length).toEqual(0);
    expect(inventory.note).toEqual("");
  });

  it("Inventory shall create with options.", () => {
    const inventories = createInventories();
    const inventory = inventories[1];
    expect(inventory.id).toEqual("inventory-id-1");
    expect(inventory.onDate).toEqual(new Date("2000-1-1 9:00:00"));
    expect(inventory.ingredients[1].id).toEqual("inventory_ingredient-id-1");
    expect(inventory.grains[1].id).toEqual("inventory_ingredient_grain-id-1");
    expect(inventory.hops[1].id).toEqual("inventory_ingredient_hop-id-1");
    expect(inventory.yeasts[1].id).toEqual("inventory_ingredient_yeast-id-1");
    expect(inventory.note).toEqual("inventory-note-1");
  });

  it("reset instance after call clear()", () => {
    const inventories = createInventories();
    const inventory = inventories[1];
    inventory.clear();
    expect(inventory.id).toEqual("inventory-id-1");
    expect(typeof inventory.onDate).not.toBe("undefined");
    expect(inventory.ingredients.length).toEqual(0);
    expect(inventory.grains.length).toEqual(0);
    expect(inventory.hops.length).toEqual(0);
    expect(inventory.yeasts.length).toEqual(0);
    expect(inventory.note).toEqual("");
  });
});
