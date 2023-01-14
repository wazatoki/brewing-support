import { Inventory, prefix } from "@/models/inventory";
import {
  InventoryIngredient,
  InventoryIngredientPlainObject,
} from "@/models/inventoryIngredient";
import {
  InventoryIngredientGrain,
  InventoryIngredientGrainPlainObject,
} from "@/models/inventoryIngredientGrain";
import {
  InventoryIngredientHop,
  InventoryIngredientHopPlainObject,
} from "@/models/inventoryIngredientHop";
import {
  InventoryIngredientYeast,
  InventoryIngredientYeastPlainObject,
} from "@/models/inventoryIngredientYeast";
import {
  createInventories,
  createInventoryIngredient,
  createInventoryIngredientGrain,
  createInventoryIngredientHop,
  createInventoryIngredientYeast,
} from "./helper";

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

  it("toPlainObject", () => {
    const inventories = createInventories();
    const ingredients = createInventoryIngredient().map(
      (ingredient: InventoryIngredient): InventoryIngredientPlainObject =>
        ingredient.toPlainObject()
    );
    const grains = createInventoryIngredientGrain().map(
      (grain: InventoryIngredientGrain): InventoryIngredientGrainPlainObject =>
        grain.toPlainObject()
    );
    const hops = createInventoryIngredientHop().map(
      (hop: InventoryIngredientHop): InventoryIngredientHopPlainObject =>
        hop.toPlainObject()
    );
    const yeasts = createInventoryIngredientYeast().map(
      (yeast: InventoryIngredientYeast): InventoryIngredientYeastPlainObject =>
        yeast.toPlainObject()
    );

    const result = inventories[2].toPlainObject();
    expect(result).toEqual({
      id: "inventory-id-2",
      onDate: new Date("2000-1-2 9:00:00"),
      ingredients: ingredients,
      grains: grains,
      hops: hops,
      yeasts: yeasts,
      note: "inventory-note-2",
    });
  });
});
