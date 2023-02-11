import {
  consumedIngredientSum,
  consumedIngredientGrainSum,
  consumedIngredientHopSum,
  consumedIngredientYeastSum,
} from "@/services/brewEvent";
import * as modelHelper from "../models/helper";

describe("services/brewEvent.ts", () => {
  it("consumedIngredientSum", () => {
    const brewEvents = modelHelper.createBrewEvents();
    const result = consumedIngredientSum(
      "test-ingredient-id-1",
      brewEvents,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("consumedIngredientGrainSum", () => {
    const brewEvents = modelHelper.createBrewEvents();
    const result = consumedIngredientGrainSum(
      "test-grain-id-1",
      brewEvents,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("consumedIngredientHopSum", () => {
    const brewEvents = modelHelper.createBrewEvents();
    const result = consumedIngredientHopSum(
      "test-hop-id-1",
      brewEvents,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });

  it("consumedIngredientYeastSum", () => {
    const brewEvents = modelHelper.createBrewEvents();
    const result = consumedIngredientYeastSum(
      "test-yeast-id-1",
      brewEvents,
      new Date("2000-1-5 9:00:00")
    );
    expect(result).toEqual(4);
  });
});
