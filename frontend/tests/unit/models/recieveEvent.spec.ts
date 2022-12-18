import * as recieveEvent from "@/models/recieveEvent";
import * as supplier from "@/models/supplier";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { RecievedIngredientGrain } from "@/models/recievedIngredientGrain";
import { RecievedIngredientHop } from "@/models/recievedIngredientHop";
import { RecievedIngredientYeast } from "@/models/recievedIngredientYeast";
import { createRecieveEvents } from "./helper";

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
});
