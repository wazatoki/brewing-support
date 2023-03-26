<script setup>
import { ref, onMounted } from "vue";
import * as ingredientClassificationRepo from "@/repositories/ingredientClassificationRepo";
import * as ingredientGrainRepo from "@/repositories/ingredientGrainRepo";
import * as ingredientHopRepo from "@/repositories/ingredientHopRepo";
import * as ingredientRepo from "@/repositories/ingredientRepo";
import * as ingredientYeastRepo from "@/repositories/ingredientYeastRepo";
import * as supplierRepo from "@/repositories/supplierRepo";
import * as unitRepo from "@/repositories/unitRepo";

const name = ref("");
const backupData = {};

const createBackupData = async () => {
  const ingredientClassifications = (
    await ingredientClassificationRepo.fetchAll()
  ).result;
  const ingredientGrains = (await ingredientGrainRepo.fetchAll()).result;
  const ingredientHops = (await ingredientHopRepo.fetchAll()).result;
  const ingredients = (await ingredientRepo.fetchAll()).result;
  const ingredientYeasts = (await ingredientYeastRepo.fetchAll()).result;
  const suppliers = (await supplierRepo.fetchAll()).result;
  const units = (await unitRepo.fetchAll()).result;
  backupData["ingredientClassifications"] = ingredientClassifications;
  backupData["ingredientGrains"] = ingredientGrains;
  backupData["ingredientGrains"] = ingredientGrains;
  backupData["ingredientHops"] = ingredientHops;
  backupData["ingredientYeasts"] = ingredientYeasts;
  backupData["ingredients"] = ingredients;
  backupData["suppliers"] = suppliers;
  backupData["units"] = units;
};

const downloadFile = () => {
  const blob = new Blob([JSON.stringify(backupData)], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = (window.URL || window.webkitURL).createObjectURL(blob);
  a.download = `backup.json`;
  a.click();
  a.remove();
};

onMounted(() => {
  createBackupData();
});
</script>

<template>
  <div class="backup-master">
    <div>
      <el-input type="file" v-model="name" autocomplete="off" />
    </div>
    <div>
      <el-button @click="downloadFile">ダウンロード</el-button>
    </div>
  </div>
</template>
