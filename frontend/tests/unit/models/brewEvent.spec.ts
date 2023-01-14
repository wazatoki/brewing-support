import * as brewEvent from "@/models/brewEvent";
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { ConsumedIngredientGrain } from "@/models/consumedIngredientGrain";
import { ConsumedIngredientHop } from "@/models/consumedIngredientHop";
import { ConsumedIngredientYeast } from "@/models/consumedIngredientYeast";
import {
  createBrewEvents,
  createConsumedIngredient,
  createConsumedIngredientGrain,
  createConsumedIngredientHop,
  createConsumedIngredientYeast,
} from "./helper";

describe("brewEvent.ts", () => {
  it("BrewEvent shall create with no options.", () => {
    const be = new brewEvent.BrewEvent();
    expect(be.id).toContain("brew_event-");
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
    const events = createBrewEvents();
    expect(events[1].id).toEqual("brew_event-test-id-1");
    expect(events[1].name).toEqual("brew_event-test-name-1");
    expect(events[1].desc).toEqual("brew_event-test-desc-1");
    expect(events[1].from).toEqual(new Date("2000-1-1 9:00:00"));
    expect(events[1].to).toEqual(new Date("2000-1-1 23:00:00"));
    expect(events[1].ingredients.length).toEqual(10);
    expect(events[1].grains.length).toEqual(10);
    expect(events[1].hops.length).toEqual(10);
    expect(events[1].yeasts.length).toEqual(10);
    expect(events[1].brewPlanID).toEqual("brew_plan-test-1");
  });

  it("reset instance after call clear()", () => {
    const events = createBrewEvents();
    events[1].clear();
    expect(events[1].id).toContain("brew_event-test-id-1");
    expect(events[1].name).toEqual("");
    expect(events[1].desc).toEqual("");
    expect(events[1].from).toEqual(new Date(0));
    expect(events[1].to).toEqual(new Date(0));
    expect(events[1].ingredients).toEqual([] as ConsumedIngredient[]);
    expect(events[1].grains).toEqual([] as ConsumedIngredientGrain[]);
    expect(events[1].hops).toEqual([] as ConsumedIngredientHop[]);
    expect(events[1].yeasts).toEqual([] as ConsumedIngredientYeast[]);
    expect(events[1].brewPlanID).toEqual("");
  });

  it("toPlainObject", () => {
    const events = createBrewEvents();
    const ingredients = createConsumedIngredient().map((v) =>
      v.toPlainObject()
    );
    const grains = createConsumedIngredientGrain().map((v) =>
      v.toPlainObject()
    );
    const hops = createConsumedIngredientHop().map((v) => v.toPlainObject());
    const yeasts = createConsumedIngredientYeast().map((v) =>
      v.toPlainObject()
    );

    const result = events[2].toPlainObject();
    expect(result).toEqual({
      id: "brew_event-test-id-2",
      name: "brew_event-test-name-2",
      desc: "brew_event-test-desc-2",
      from: new Date("2000-1-2 9:00:00"),
      to: new Date("2000-1-2 23:00:00"),
      ingredients: ingredients,
      grains: grains,
      hops: hops,
      yeasts: yeasts,
      brewPlanID: "brew_plan-test-2",
    });
  });
});
