import * as recieveEvent from "@/models/recieveEvent";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { RecievedIngredientGrain } from "@/models/recievedIngredientGrain";
import { RecievedIngredientHop } from "@/models/recievedIngredientHop";
import { RecievedIngredientYeast } from "@/models/recievedIngredientYeast";
import { createRecieveEvents } from "./helper";

describe("recieveEvent.ts", () => {
  it("RecieveEvent shall create with no options.", () => {
    const re = new recieveEvent.RecieveEvent();
    expect(re.id).toContain("recieve_event-");
    expect(re.noteNO).toEqual("");
    expect(re.noteDate).toBeInstanceOf(Date);
    expect(re.supplier.id).toContain("supplier-");
    expect(re.recieveDate).toBeInstanceOf(Date);
    expect(re.ingredients).toEqual([] as RecievedIngredient[]);
    expect(re.grains).toEqual([] as RecievedIngredientGrain[]);
    expect(re.hops).toEqual([] as RecievedIngredientHop[]);
    expect(re.yeasts).toEqual([] as RecievedIngredientYeast[]);
    expect(re.footNote).toEqual("");
  });

  it("RecieveEvent shall create with options.", () => {
    const events = createRecieveEvents();
    expect(events[1].id).toEqual("recieve_event-test-id-1");
    expect(events[1].noteNO).toEqual("recieve_event-test-note-no-1");
    expect(events[1].noteDate).toEqual(new Date("2000-1-1 9:00:00"));
    expect(events[1].supplier.id).toEqual("supplier-id-1");
    expect(events[1].recieveDate).toEqual(new Date("2000-1-1 10:00:00"));
    expect(events[1].ingredients.length).toEqual(10);
    expect(events[1].grains.length).toEqual(10);
    expect(events[1].hops.length).toEqual(10);
    expect(events[1].yeasts.length).toEqual(10);
    expect(events[1].footNote).toEqual("recieve_event-test-footnote-1");
  });

  it("reset instance after call clear()", () => {
    const events = createRecieveEvents();
    events[1].clear();
    expect(events[1].id).toContain("recieve_event-");
    expect(events[1].noteNO).toEqual("");
    expect(events[1].noteDate).toBeInstanceOf(Date);
    expect(events[1].supplier.id).toContain("supplier-");
    expect(events[1].recieveDate).toBeInstanceOf(Date);
    expect(events[1].ingredients).toEqual([] as RecievedIngredient[]);
    expect(events[1].grains).toEqual([] as RecievedIngredientGrain[]);
    expect(events[1].hops).toEqual([] as RecievedIngredientHop[]);
    expect(events[1].yeasts).toEqual([] as RecievedIngredientYeast[]);
    expect(events[1].footNote).toEqual("");
  });
});
