import { Supplier } from "@/models/supplier";
import { RecievedIngredient } from "@/models/recievedIngredient";

export class RecieveEvent {
  id: string;
  noteNO: string;
  noteDate: Date;
  supplier: Supplier;
  recieveDate: Date;
  ingredients: RecievedIngredient[];
  footNote: string;

  constructor(
    id = "",
    noteNO = "",
    noteDate = new Date(),
    supplier = new Supplier(),
    recieveDate = new Date(),
    ingredients = [] as RecievedIngredient[],
    footNote = ""
  ) {
    this.id = id;
    this.noteNO = noteNO;
    this.noteDate = noteDate;
    this.supplier = supplier;
    this.recieveDate = recieveDate;
    this.ingredients = ingredients;
    this.footNote = footNote;
  }

  clear() {
    this.id = "";
    this.noteNO = "";
    this.noteDate = new Date();
    this.supplier = new Supplier();
    this.recieveDate = new Date();
    this.ingredients = [] as RecievedIngredient[];
    this.footNote = "";
  }
}

export interface RecieveEventMember {
  id: string;
  noteNO: string;
  noteDate: Date;
  supplier: Supplier;
  recieveDate: Date;
  ingredients: RecievedIngredient[];
  footNote: string;
}
