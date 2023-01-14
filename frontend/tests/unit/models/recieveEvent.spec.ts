import * as recieveEvent from "@/models/recieveEvent";
import * as supplier from "@/models/supplier";
import {
  RecievedIngredient,
  RecievedIngredientPlainObject,
} from "@/models/recievedIngredient";
import {
  RecievedIngredientGrain,
  RecievedIngredientGrainPlainObject,
} from "@/models/recievedIngredientGrain";
import {
  RecievedIngredientHop,
  RecievedIngredientHopPlainObject,
} from "@/models/recievedIngredientHop";
import {
  RecievedIngredientYeast,
  RecievedIngredientYeastPlainObject,
} from "@/models/recievedIngredientYeast";
import {
  createRecieveEvents,
  createSuppliers,
  createRecievedIngredient,
  createRecievedIngredientGrain,
  createRecievedIngredientHop,
  createRecievedIngredientYeast,
} from "./helper";

describe("recieveEvent.ts", () => {
  it("RecieveEvent shall create with no options.", () => {
    const re = new recieveEvent.RecieveEvent();
    expect(re.id).toContain(recieveEvent.prefix);
    expect(re.noteNO).toEqual("");
    expect(re.noteDate).toBeInstanceOf(Date);
    expect(re.supplier.id).toContain(supplier.prefix);
    expect(re.recieveDate).toBeInstanceOf(Date);
    expect(re.ingredients).toEqual([] as RecievedIngredient[]);
    expect(re.grains).toEqual([] as RecievedIngredientGrain[]);
    expect(re.hops).toEqual([] as RecievedIngredientHop[]);
    expect(re.yeasts).toEqual([] as RecievedIngredientYeast[]);
    expect(re.footNote).toEqual("");
  });

  it("RecieveEvent shall create with options.", () => {
    const events = createRecieveEvents();
    const re = events[1];
    expect(re.id).toEqual("recieve_event-test-id-1");
    expect(re.noteNO).toEqual("recieve_event-test-note-no-1");
    expect(re.noteDate).toEqual(new Date("2000-1-1 9:00:00"));
    expect(re.supplier.id).toEqual("supplier-id-1");
    expect(re.recieveDate).toEqual(new Date("2000-1-1 10:00:00"));
    expect(re.ingredients.length).toEqual(10);
    expect(re.grains.length).toEqual(10);
    expect(re.hops.length).toEqual(10);
    expect(re.yeasts.length).toEqual(10);
    expect(re.footNote).toEqual("recieve_event-test-footnote-1");
  });

  it("reset instance after call clear()", () => {
    const events = createRecieveEvents();
    const re = events[1];
    re.clear();
    expect(re.id).toEqual("recieve_event-test-id-1");
    expect(re.noteNO).toEqual("");
    expect(re.noteDate).toBeInstanceOf(Date);
    expect(re.supplier.id).toContain(supplier.prefix);
    expect(re.recieveDate).toBeInstanceOf(Date);
    expect(re.ingredients).toEqual([] as RecievedIngredient[]);
    expect(re.grains).toEqual([] as RecievedIngredientGrain[]);
    expect(re.hops).toEqual([] as RecievedIngredientHop[]);
    expect(re.yeasts).toEqual([] as RecievedIngredientYeast[]);
    expect(re.footNote).toEqual("");
  });

  it("toPlainObject", () => {
    const events = createRecieveEvents();
    const suppliers = createSuppliers();
    const ingredients = createRecievedIngredient().map(
      (ingredient: RecievedIngredient): RecievedIngredientPlainObject =>
        ingredient.toPlainObject()
    );
    const grains = createRecievedIngredientGrain().map(
      (grain: RecievedIngredientGrain): RecievedIngredientGrainPlainObject =>
        grain.toPlainObject()
    );
    const hops = createRecievedIngredientHop().map(
      (hop: RecievedIngredientHop): RecievedIngredientHopPlainObject =>
        hop.toPlainObject()
    );
    const yeasts = createRecievedIngredientYeast().map(
      (yeast: RecievedIngredientYeast): RecievedIngredientYeastPlainObject =>
        yeast.toPlainObject()
    );

    const result = events[2].toPlainObject();
    expect(result).toEqual({
      id: "recieve_event-test-id-2",
      noteNO: "recieve_event-test-note-no-2",
      noteDate: new Date("2000-1-2 9:00:00"),
      supplier: suppliers[1].toPlainObject(),
      recieveDate: new Date("2000-1-2 10:00:00"),
      ingredients: ingredients,
      grains: grains,
      hops: hops,
      yeasts: yeasts,
      footNote: "recieve_event-test-footnote-2",
    });
  });
});
