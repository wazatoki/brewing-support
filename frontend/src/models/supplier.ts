export class Supplier {
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

export interface SupplierMember {
  id: string;
  name: string;
}
