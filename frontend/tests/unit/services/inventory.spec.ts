import { Inventory } from "@/models/inventory";
import {
  sortByDate,
  inventoryIngredientSum,
  inventoryIngredientGrainSum,
  inventoryIngredientHopSum,
  inventoryIngredientYeastSum,
  inventoryCalculatedValue,
  inventoryGrainCalculatedValue,
  inventoryHopCalculatedValue,
  inventoryYeastCalculatedValue,
} from "@/services/inventory";
import * as modelHelper from "../models/helper";

describe("services/inventory.ts", () => {
  it("sortByDate", () => {
    const sourceInventories = modelHelper.createInventories();
    const inventories = [] as Inventory[];
    inventories.push(sourceInventories[5]);
    inventories.push(sourceInventories[2]);
    inventories.push(sourceInventories[4]);
    inventories.push(sourceInventories[3]);
    const sortedInventories = [] as Inventory[];
    sortedInventories.push(sourceInventories[2]);
    sortedInventories.push(sourceInventories[3]);
    sortedInventories.push(sourceInventories[4]);
    sortedInventories.push(sourceInventories[5]);

    const result = sortByDate(inventories);
    expect(result).toEqual(sortedInventories);
  });

  it("inventoryIngredientSum", () => {
    const inventories = modelHelper.createInventories();
    const ingredients = modelHelper.createIngredients();
    const result = inventoryIngredientSum(
      ingredients[1].id,
      inventories,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("inventoryIngredientGrainSum", () => {
    const inventories = modelHelper.createInventories();
    const grains = modelHelper.createGrains();
    const result = inventoryIngredientGrainSum(
      grains[1].id,
      inventories,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("inventoryIngredientHopSum", () => {
    const inventories = modelHelper.createInventories();
    const hops = modelHelper.createHops();
    const result = inventoryIngredientHopSum(
      hops[1].id,
      inventories,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("inventoryIngredientYeastSum", () => {
    const inventories = modelHelper.createInventories();
    const yeasts = modelHelper.createYeasts();
    const result = inventoryIngredientYeastSum(
      yeasts[1].id,
      inventories,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("inventoryCalculatedValue", () => {
    const inventories = modelHelper.createInventories();
    const brewEvents = modelHelper.createBrewEvents();
    const recieveEvent = modelHelper.createRecieveEvents();
    const ingredients = modelHelper.createIngredients();
    const result = inventoryCalculatedValue(
      ingredients[1].id,
      new Date("2000-1-5 9:00:00"),
      inventories,
      brewEvents,
      recieveEvent
    );
    expect(result).toEqual(4);
  });

  it("inventoryGrainCalculatedValue", () => {
    const inventories = modelHelper.createInventories();
    const brewEvents = modelHelper.createBrewEvents();
    const recieveEvent = modelHelper.createRecieveEvents();
    const grains = modelHelper.createGrains();
    const result = inventoryGrainCalculatedValue(
      grains[1].id,
      new Date("2000-1-5 9:00:00"),
      inventories,
      brewEvents,
      recieveEvent
    );
    expect(result).toEqual(4);
  });

  it("inventoryHopCalculatedValue", () => {
    const inventories = modelHelper.createInventories();
    const brewEvents = modelHelper.createBrewEvents();
    const recieveEvent = modelHelper.createRecieveEvents();
    const hops = modelHelper.createHops();
    const result = inventoryHopCalculatedValue(
      hops[1].id,
      new Date("2000-1-5 9:00:00"),
      inventories,
      brewEvents,
      recieveEvent
    );
    expect(result).toEqual(4);
  });

  it("inventoryYeastCalculatedValue", () => {
    const inventories = modelHelper.createInventories();
    const brewEvents = modelHelper.createBrewEvents();
    const recieveEvent = modelHelper.createRecieveEvents();
    const yeasts = modelHelper.createYeasts();
    const result = inventoryYeastCalculatedValue(
      yeasts[1].id,
      new Date("2000-1-5 9:00:00"),
      inventories,
      brewEvents,
      recieveEvent
    );
    expect(result).toEqual(4);
  });
});
