import * as supplier from "@/models/supplier";
import { createSuppliers } from "./helper";

describe("supplier.ts", () => {
  it("Supplier shall create with no options.", () => {
    const s = new supplier.Supplier();
    expect(s.id).toContain(supplier.prefix);
    expect(s.name).toEqual("");
  });

  it("Supplier shall create with options.", () => {
    const suppliers = createSuppliers();
    const s = suppliers[1];
    expect(s.id).toEqual("supplier-id-1");
    expect(s.name).toEqual("supplier-name-1");
  });

  it("reset instance after call clear()", () => {
    const suppliers = createSuppliers();
    const s = suppliers[1];
    s.clear();
    expect(s.id).toEqual("supplier-id-1");
    expect(s.name).toEqual("");
  });
});
