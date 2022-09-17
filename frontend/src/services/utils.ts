import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export function createUUID() {
  const d = new Date();
  const uid = d.toJSON() + "-" + uuidv4();
  return uid;
}

export function formatDateTime(dateStr: string) {
  return dayjs(dateStr).format("YYYY/MM/DD HH:mm");
}

export function formatDate(dateStr: string) {
  return dayjs(dateStr).format("YYYY/MM/DD");
}
