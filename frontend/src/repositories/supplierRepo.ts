import {
  Supplier,
  SupplierPlainObject,
  typename,
  prefix,
} from "@/models/supplier";

import { createUUID } from "@/services/utils";
import * as pouchdb from "@/repositories/pouchdb";

export async function fetchAll(): Promise<{
  result: Supplier[];
}> {
  const result: Supplier[] = [];
  try {
    const fetchResult = await pouchdb.fetchAllDocuments<SupplierPlainObject>(
      prefix
    );

    fetchResult.forEach((supplierPO) => {
      const supplier = new Supplier(supplierPO.id, supplierPO.name);
      result.push(supplier);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }

  return { result: result };
}

export async function remove(supplier: Supplier) {
  try {
    await pouchdb.remove<SupplierPlainObject>(supplier.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    throw new Error(e.name);
  }
}

export async function save(supplier: Supplier): Promise<{ id: string }> {
  if (!supplier.id) {
    supplier.id = prefix + createUUID();
  }

  const supplierPlainObject = supplier.toPlainObject();

  try {
    await pouchdb.save<SupplierPlainObject>({
      type: typename,
      id: supplierPlainObject.id,
      name: supplierPlainObject.name,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e.name);
  }

  return { id: supplier.id };
}
