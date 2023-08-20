<script setup>
import { ref, onMounted } from "vue";
import { genFileId } from "element-plus";
import * as brewEventRepo from "@/repositories/brewEventRepo";
import * as brewPlanRepo from "@/repositories/brewPlanRepo";
import * as ingredientClassificationRepo from "@/repositories/ingredientClassificationRepo";
import * as ingredientGrainRepo from "@/repositories/ingredientGrainRepo";
import * as ingredientHopRepo from "@/repositories/ingredientHopRepo";
import * as ingredientRepo from "@/repositories/ingredientRepo";
import * as ingredientYeastRepo from "@/repositories/ingredientYeastRepo";
import * as inventoryRepo from "@/repositories/inventoryRepo";
import * as recieveEventRepo from "@/repositories/recieveEventRepo";
import * as supplierRepo from "@/repositories/supplierRepo";
import * as unitRepo from "@/repositories/unitRepo";

const backupData = {};
const upload = ref();
let sourceFile = null;

const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};

const onFileChange = (e) => {
  sourceFile = e.raw;
};

const importData = async () => {
  if (sourceFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target.result);

      Object.keys(json).forEach((key) => {
        switch (key) {
          case "brewEvents":
            saveData(json[key], brewEventRepo);
            break;
          case "brewPlans":
            saveData(json[key], brewPlanRepo);
            break;
          case "ingredientClassifications":
            saveData(json[key], ingredientClassificationRepo);
            break;
          case "ingredientGrains":
            saveData(json[key], ingredientGrainRepo);
            break;
          case "ingredientHops":
            saveData(json[key], ingredientHopRepo);
            break;
          case "ingredientYeasts":
            saveData(json[key], ingredientYeastRepo);
            break;
          case "ingredients":
            saveData(json[key], ingredientRepo);
            break;
          case "inventories":
            saveData(json[key], inventoryRepo);
            break;
          case "recieveEvents":
            saveData(json[key], recieveEventRepo);
            break;
          case "suppliers":
            saveData(json[key], supplierRepo);
            break;
          case "units":
            saveData(json[key], unitRepo);
            break;
          default:
            break;
        }
      });
      upload.value.clearFiles();
    };
    reader.readAsText(sourceFile);
  }
};

const saveData = (dataArray, repository) => {
  dataArray.forEach((data) => {
    repository.save(data);
  });
};

const createBackupData = async () => {
  const brewEvents = (await brewEventRepo.fetchAll()).result;
  const brewPlans = (await brewPlanRepo.fetchAll()).result;
  const ingredientClassifications = (
    await ingredientClassificationRepo.fetchAll()
  ).result;
  const ingredientGrains = (await ingredientGrainRepo.fetchAll()).result;
  const ingredientHops = (await ingredientHopRepo.fetchAll()).result;
  const ingredients = (await ingredientRepo.fetchAll()).result;
  const ingredientYeasts = (await ingredientYeastRepo.fetchAll()).result;
  const inventories = (await inventoryRepo.fetchAll()).result;
  const recieveEvents = (await recieveEventRepo.fetchAll()).result;
  const suppliers = (await supplierRepo.fetchAll()).result;
  const units = (await unitRepo.fetchAll()).result;
  backupData["brewEvents"] = brewEvents;
  backupData["brewPlans"] = brewPlans;
  backupData["ingredientClassifications"] = ingredientClassifications;
  backupData["ingredientGrains"] = ingredientGrains;
  backupData["ingredientHops"] = ingredientHops;
  backupData["ingredientYeasts"] = ingredientYeasts;
  backupData["ingredients"] = ingredients;
  backupData["inventories"] = inventories;
  backupData["recieveEvents"] = recieveEvents;
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
      <el-button @click="downloadFile">download</el-button>
    </div>
    <div>
      <el-upload
        ref="upload"
        action=""
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="onFileChange"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary">select file</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="importData">
          import
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            limit 1 file, new file will cover the old file
          </div>
        </template>
      </el-upload>
    </div>
  </div>
</template>
