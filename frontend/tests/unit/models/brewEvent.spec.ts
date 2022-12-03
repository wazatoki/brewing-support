import * as brewEvent from "@/models/brewEvent";
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { ConsumedIngredientGrain } from "@/models/consumedIngredientGrain";
import { ConsumedIngredientHop } from "@/models/consumedIngredientHop";
import { ConsumedIngredientYeast } from "@/models/consumedIngredientYeast";

describe("brewEvent.ts", () => {
  it("BrewEvent shall create with no options.", () => {
    const be = new brewEvent.BrewEvent();
    expect(be.id).toEqual("");
    expect(be.name).toEqual("");
    expect(be.desc).toEqual("");
    expect(be.from).toEqual(new Date(0));
    expect(be.to).toEqual(new Date(0));
    expect(be.ingredients).toEqual([] as ConsumedIngredient[]);
    expect(be.grains).toEqual([] as ConsumedIngredientGrain[]);
    expect(be.hops).toEqual([] as ConsumedIngredientHop[]);
    expect(be.yeasts).toEqual([] as ConsumedIngredientYeast[]);
    expect(be.brewPlanID).toEqual("");
  });
  it("BrewEvent shall create with options.", () => {
    const be = new brewEvent.BrewEvent(
      "test-id",
      "test-name",
      "test-desc",
      new Date("2000-1-1 12:00:00"),
      new Date("2000-1-31 23:59:59")
    );
    expect(be.id).toEqual("test-id");
    expect(be.name).toEqual("test-name");
    expect(be.desc).toEqual("test-desc");
    expect(be.from).toEqual(new Date("2000-1-1 12:00:00"));
    expect(be.to).toEqual(new Date("2000-1-31 23:59:59"));
    expect(be.ingredients).toEqual([] as ConsumedIngredient[]);
    expect(be.grains).toEqual([] as ConsumedIngredientGrain[]);
    expect(be.hops).toEqual([] as ConsumedIngredientHop[]);
    expect(be.yeasts).toEqual([] as ConsumedIngredientYeast[]);
    expect(be.brewPlanID).toMatch("");
  });
});
