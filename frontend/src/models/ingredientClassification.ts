export class IngredientClassification {
  id: string;
  name: string;

  constructor(id = "", name = "") {
    this.id = id;
    this.name = name;
  }

  clear() {
    this.name = "";
  }
}

export interface IngredientClassificationMember {
  id: string;
  name: string;
}
