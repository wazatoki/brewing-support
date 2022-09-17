<script setup>
import { onMounted, reactive, ref } from "vue";
import * as recieveEventRepo from "@/repositories/recieveEventRepo";
import * as brewPlanRepo from "@/repositories/brewPlanRepo";
import * as brewEventRepo from "@/repositories/brewEventRepo";
import * as ingredientRepo from "@/repositories/ingredientRepo";
import * as inventoryRepo from "@/repositories/inventoryRepo";
import * as ingredientClassificationRepo from "@/repositories/ingredientClassificationRepo";
import * as reportIngredientService from "@/services/reportIngredient";
import * as utils from "@/services/utils";
import { ReportIngredient } from "@/models/reportIngredient";
import * as processingType from "@/models/processingType";
import { Ingredient } from "@/models/ingredient";
import { Unit } from "@/models/unit";

const ingredientClassifications = reactive([]);
const ingredients = reactive([]);
const tableData = reactive([]);
const selectedIngredientClassificationID = ref();
const selectedIngredientID = ref();
const selectedIngredient = ref(
  new Ingredient("", "", 1, new Unit(), new Unit(), new Unit())
);
const ingredientsBuffer = [];
const brewEventsBuffer = [];
const brewPlansBuffer = [];
const recieveEventsBuffer = [];
const inventoryBuffer = [];
const reportDataBuffer = [];
const consumedIngredientSum = ref(0);
const recievedIngredientSum = ref(0);
const inventoryIngredientAjustSum = ref(0);
const inventoryQuantity = ref(0);

onMounted(async () => {
  brewPlansBuffer.splice(0);
  recieveEventsBuffer.splice(0);
  brewEventsBuffer.splice(0);
  ingredientsBuffer.splice(0);
  inventoryBuffer.splice(0);
  ingredientClassifications.splice(0);
  (await brewPlanRepo.fetchAll()).result.forEach((item) => {
    brewPlansBuffer.push(item);
  });
  (await recieveEventRepo.fetchAll()).result.forEach((item) => {
    recieveEventsBuffer.push(item);
  });
  (await brewEventRepo.fetchAll()).result.forEach((item) => {
    brewEventsBuffer.push(item);
  });
  (await ingredientRepo.fetchAll()).result.forEach((item) => {
    ingredientsBuffer.push(item);
  });
  (await inventoryRepo.fetchAll()).result.forEach((item) => {
    inventoryBuffer.push(item);
  });
  (await ingredientClassificationRepo.fetchAll()).result.forEach((item) => {
    ingredientClassifications.push(item);
  });
});

const onChangeIngredientClassification = () => {
  const filterdIngredients = ingredientsBuffer.filter(
    (item) =>
      item.ingredientClassification.id ===
      selectedIngredientClassificationID.value
  );
  ingredients.splice(0);
  filterdIngredients.forEach((item) => {
    ingredients.push(item);
  });
  tableData.splice(0);
};

const onChangeIngredient = () => {
  reportDataBuffer.splice(0);
  brewEventsBuffer.forEach((brewEvent) => {
    brewEvent.ingredients.forEach((consumedIngredient) => {
      if (consumedIngredient.ingredient.id === selectedIngredientID.value) {
        reportDataBuffer.push(
          new ReportIngredient(
            "",
            brewEvent.from,
            processingType.brewing,
            consumedIngredient.ingredient,
            null,
            brewPlansBuffer.find((item) => item.id === brewEvent.brewPlanID),
            consumedIngredient.convertToStockingUnit.quantity,
            consumedIngredient.convertToStockingUnit.stockingUnit.name
          )
        );
      }
    });
  });
  recieveEventsBuffer.forEach((recieveEvent) => {
    recieveEvent.ingredients.forEach((recievedIngredient) => {
      if (recievedIngredient.ingredient.id === selectedIngredientID.value) {
        reportDataBuffer.push(
          new ReportIngredient(
            "",
            recieveEvent.recieveDate,
            processingType.recieving,
            recievedIngredient.ingredient,
            recieveEvent.supplier,
            null,
            recievedIngredient.convertToStockingUnit.quantity,
            recievedIngredient.convertToStockingUnit.stockingUnit.name
          )
        );
      }
    });
  });
  inventoryBuffer.forEach((inventory) => {
    inventory.ingredients.forEach((inventoryIngredient) => {
      if (inventoryIngredient.ingredient.id === selectedIngredientID.value) {
        reportDataBuffer.push(
          new ReportIngredient(
            "",
            inventory.onDate,
            processingType.inventory,
            inventoryIngredient.ingredient,
            null,
            null,
            inventoryIngredient.adjustedValue,
            inventoryIngredient.ingredient.stockingUnit.name
          )
        );
      }
    });
  });

  const sortedBuffer = reportIngredientService.sortByDate(reportDataBuffer);

  tableData.splice(0);
  sortedBuffer.forEach((item) => {
    tableData.push(item);
  });

  consumedIngredientSum.value = reportIngredientService.comsumedQuantity(
    selectedIngredientID.value,
    reportDataBuffer
  );

  recievedIngredientSum.value = reportIngredientService.recievedQuantity(
    selectedIngredientID.value,
    reportDataBuffer
  );

  inventoryIngredientAjustSum.value =
    reportIngredientService.inventoryAdjustedQuantity(
      selectedIngredientID.value,
      reportDataBuffer
    );

  inventoryQuantity.value =
    recievedIngredientSum.value -
    consumedIngredientSum.value +
    inventoryIngredientAjustSum.value;

  selectedIngredient.value = ingredientsBuffer.find(
    (item) => item.id === selectedIngredientID.value
  );
};

const formatDate = (row, column, cellValue) => utils.formatDateTime(cellValue);
</script>

<template>
  <div class="report-ingredient">
    <el-row>
      <el-col :span="6">
        <el-row>
          <el-radio-group
            v-model="selectedIngredientClassificationID"
            @change="onChangeIngredientClassification"
          >
            <el-radio
              v-for="ingredientClassification in ingredientClassifications"
              :key="ingredientClassification.id"
              :label="ingredientClassification.id"
              >{{ ingredientClassification.name }}</el-radio
            >
          </el-radio-group>
        </el-row>
        <el-row>
          <el-radio-group
            v-model="selectedIngredientID"
            @change="onChangeIngredient"
          >
            <el-radio
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :label="ingredient.id"
              >{{ ingredient.name }}</el-radio
            >
          </el-radio-group>
        </el-row>
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-col :span="6">
            {{ selectedIngredient.name }}
          </el-col>
          <el-col :span="4">
            入荷合計: {{ recievedIngredientSum }}
            {{ selectedIngredient.stockingUnit.name }}</el-col
          >
          <el-col :span="4">
            使用合計: {{ consumedIngredientSum }}
            {{ selectedIngredient.stockingUnit.name }}</el-col
          >
          <el-col :span="4">
            棚卸時調整合計: {{ inventoryIngredientAjustSum }}
            {{ selectedIngredient.stockingUnit.name }}</el-col
          >
          <el-col :span="4">
            在庫数: {{ inventoryQuantity }}
            {{ selectedIngredient.stockingUnit.name }}</el-col
          >
        </el-row>
        <el-row>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="processingDate"
              :formatter="formatDate"
              label="日付"
              width="180"
            />
            <el-table-column
              prop="processingType"
              label="処理区分"
              width="180"
            />
            <el-table-column prop="ingredient.name" label="名称" width="180" />
            <el-table-column prop="supplier.name" label="仕入先" width="180" />
            <el-table-column
              prop="brewPlan.batchNumber"
              label="batch NO"
              width="180"
            />
            <el-table-column
              prop="brewPlan.name"
              label="batch name"
              width="180"
            />
            <el-table-column prop="quantity" label="数量" />
            <el-table-column prop="unitName" label="在庫単位" />
          </el-table>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
