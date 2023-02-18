import { RecieveEvent } from "@/models/recieveEvent";
import {
  sortBySupplierNameAndRecieveDate,
  recievedIngredientSum,
  recievedIngredientGrainSum,
  recievedIngredientHopSum,
  recievedIngredientYeastSum,
} from "@/services/recieveEvent";
import * as modelHelper from "../models/helper";

describe("services/recieveEvent.ts", () => {
  it("sortBySupplierNameAndRecieveDate", () => {
    const sourceRecieveEvents = modelHelper.createRecieveEvents();
    const recieveEvents = [] as RecieveEvent[];
    recieveEvents.push(sourceRecieveEvents[5]);
    recieveEvents.push(sourceRecieveEvents[2]);
    recieveEvents.push(sourceRecieveEvents[4]);
    recieveEvents.push(sourceRecieveEvents[3]);
    const sortedRecieveEvents = [] as RecieveEvent[];
    sortedRecieveEvents.push(sourceRecieveEvents[2]);
    sortedRecieveEvents.push(sourceRecieveEvents[3]);
    sortedRecieveEvents.push(sourceRecieveEvents[4]);
    sortedRecieveEvents.push(sourceRecieveEvents[5]);
    const result = sortBySupplierNameAndRecieveDate(recieveEvents);
    expect(result).toEqual(sortedRecieveEvents);
  });

  it("recievedIngredientSum", () => {
    const recieveEvents = modelHelper.createRecieveEvents();
    const ingredients = modelHelper.createIngredients();
    const result = recievedIngredientSum(
      ingredients[1].id,
      recieveEvents,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("recievedIngredientGrainSum", () => {
    const recieveEvents = modelHelper.createRecieveEvents();
    const grains = modelHelper.createGrains();
    const result = recievedIngredientGrainSum(
      grains[1].id,
      recieveEvents,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("recievedIngredientHopSum", () => {
    const recieveEvents = modelHelper.createRecieveEvents();
    const hops = modelHelper.createHops();
    const result = recievedIngredientHopSum(
      hops[1].id,
      recieveEvents,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("recievedIngredientYeastSum", () => {
    const recieveEvents = modelHelper.createRecieveEvents();
    const yeasts = modelHelper.createYeasts();
    const result = recievedIngredientYeastSum(
      yeasts[1].id,
      recieveEvents,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });
});
