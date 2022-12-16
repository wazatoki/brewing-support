import { Inventory } from "@/models/inventory";
import { createInventories } from "./helper";

describe("inventory.ts", () => {
  it("Inventory shall create with no options.", () => {
    const inventory = new Inventory();
    expect(inventory.id).toContain("inventory-");
    expect(typeof inventory.onDate).not.toBe("undefined");
    expect(inventory.ingredients.length).toEqual(0);
    expect(inventory.grains.length).toEqual(0);
    expect(inventory.hops.length).toEqual(0);
    expect(inventory.yeasts.length).toEqual(0);
    expect(inventory.note).toEqual("");
  });

  it("Inventory shall create with options.", () => {
    const inventories = createInventories();
    expect(inventories[1].id).toEqual("inventory-id-1");
    expect(inventories[1].onDate).toEqual(new Date("2000-1-1 9:00:00"));
    expect(inventories[1].ingredients[1].id).toEqual(
      "inventory_ingredient-id-1"
    );
    expect(inventories[1].grains[1].id).toEqual(
      "inventory_ingredient_grain-id-1"
    );
    expect(inventories[1].hops[1].id).toEqual("inventory_ingredient_hop-id-1");
    expect(inventories[1].yeasts[1].id).toEqual(
      "inventory_ingredient_yeast-id-1"
    );
    expect(inventories[1].note).toEqual("inventory-note-1");
  });

  it("reset instance after call clear()", () => {
    const inventories = createInventories();
    inventories[1].clear();
    expect(inventories[1].id).toContain("inventory-");
    expect(typeof inventories[1].onDate).not.toBe("undefined");
    expect(inventories[1].ingredients.length).toEqual(0);
    expect(inventories[1].grains.length).toEqual(0);
    expect(inventories[1].hops.length).toEqual(0);
    expect(inventories[1].yeasts.length).toEqual(0);
    expect(inventories[1].note).toEqual("");
  });
});
