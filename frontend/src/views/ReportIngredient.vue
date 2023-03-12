<script setup>
import { onMounted, reactive, ref } from "vue";
import * as recieveEventRepo from "@/repositories/recieveEventRepo";
import * as brewPlanRepo from "@/repositories/brewPlanRepo";
import * as brewEventRepo from "@/repositories/brewEventRepo";
import * as ingredientRepo from "@/repositories/ingredientRepo";
import * as grainRepo from "@/repositories/ingredientGrainRepo";
import * as hopRepo from "@/repositories/ingredientHopRepo";
import * as yeastRepo from "@/repositories/ingredientYeastRepo";
import * as inventoryRepo from "@/repositories/inventoryRepo";
import * as ingredientClassificationRepo from "@/repositories/ingredientClassificationRepo";
import * as reportIngredientService from "@/services/reportIngredient";
import * as utils from "@/services/utils";
import { ReportIngredient } from "@/models/reportIngredient";
import * as processingType from "@/models/processingType";
import { Ingredient } from "@/models/ingredient";
import { Unit } from "@/models/unit";
import ExcelJS from "exceljs";

const ingredientClassifications = reactive([]);
const ingredients = reactive([]);
const tableData = reactive([]);
const selectedIngredientClassificationID = ref();
//const selectedIngredientID = ref();
const selectedIngredient = ref(
  new Ingredient("", "", 1, new Unit(), new Unit(), new Unit())
);
const ingredientsBuffer = [];
const grainsBuffer = [];
const hopsBuffer = [];
const yeastsBuffer = [];
const brewEventsBuffer = [];
const brewPlansBuffer = [];
const recieveEventsBuffer = [];
const inventoryBuffer = [];
const reportDataBuffer = [];
const consumedIngredientSum = ref(0);
const recievedIngredientSum = ref(0);
const inventoryIngredientAjustSum = ref(0);
const inventoryQuantity = ref(0);
const selectedCategory = ref("");
const isIngredientClassificationVisible = ref(false);
const today = new Date();
const fromDateStr = ref(
  new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
);
const toDateStr = ref(today);
const exportExcelDialogVisible = ref(false);

const fromDate = () => {
  return new Date(fromDateStr.value);
};
const toDate = () => {
  const d = new Date(toDateStr.value);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
};

onMounted(async () => {
  brewPlansBuffer.splice(0);
  recieveEventsBuffer.splice(0);
  brewEventsBuffer.splice(0);
  ingredientsBuffer.splice(0);
  grainsBuffer.splice(0);
  hopsBuffer.splice(0);
  yeastsBuffer.splice(0);
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
  (await grainRepo.fetchAll()).result.forEach((item) => {
    grainsBuffer.push(item);
  });
  (await hopRepo.fetchAll()).result.forEach((item) => {
    hopsBuffer.push(item);
  });
  (await yeastRepo.fetchAll()).result.forEach((item) => {
    yeastsBuffer.push(item);
  });
  (await inventoryRepo.fetchAll()).result.forEach((item) => {
    inventoryBuffer.push(item);
  });
  (await ingredientClassificationRepo.fetchAll()).result.forEach((item) => {
    ingredientClassifications.push(item);
  });
});

const onChangeSelectedCategory = () => {
  const funcs = {
    grains: () => {
      isIngredientClassificationVisible.value = false;
      ingredients.splice(0);
      grainsBuffer.forEach((item) => {
        ingredients.push(item);
      });
    },
    hops: () => {
      isIngredientClassificationVisible.value = false;
      ingredients.splice(0);
      hopsBuffer.forEach((item) => {
        ingredients.push(item);
      });
    },
    yeasts: () => {
      isIngredientClassificationVisible.value = false;
      ingredients.splice(0);
      yeastsBuffer.forEach((item) => {
        ingredients.push(item);
      });
    },
    others: () => {
      isIngredientClassificationVisible.value = true;
      ingredients.splice(0);
    },
  };

  if (funcs[selectedCategory.value] != null) {
    funcs[selectedCategory.value]();
  }
};

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

  const reportIngredients = reportIngredientService.createReportIngredient(
    selectedIngredient.value,
    brewPlansBuffer,
    brewEventsBuffer,
    recieveEventsBuffer,
    inventoryBuffer,
    selectedCategory.value
  );
  reportIngredients.forEach((item) => {
    reportDataBuffer.push(item);
  });

  const sortedBuffer = reportIngredientService.sortByDate(reportDataBuffer);

  const carryOver = () =>
    reportIngredientService.carryOver(
      selectedIngredient.value.id,
      reportDataBuffer,
      fromDate()
    );

  tableData.splice(0);
  tableData.push(
    new ReportIngredient(
      "",
      fromDate(),
      processingType.inventory,
      selectedIngredient.value,
      null,
      null,
      carryOver(),
      selectedIngredient.value.stockingUnit.name
    )
  );
  sortedBuffer.forEach((item) => {
    if (item.processingDate > fromDate() && item.processingDate <= toDate()) {
      tableData.push(item);
    }
  });

  reportIngredientService.calcurateInventryQuantity(tableData);

  consumedIngredientSum.value = reportIngredientService.comsumedQuantity(
    selectedIngredient.value.id,
    reportDataBuffer,
    toDate()
  );

  recievedIngredientSum.value = reportIngredientService.recievedQuantity(
    selectedIngredient.value.id,
    reportDataBuffer,
    toDate()
  );

  inventoryIngredientAjustSum.value =
    reportIngredientService.inventoryAdjustedQuantity(
      selectedIngredient.value.id,
      reportDataBuffer,
      toDate()
    );

  inventoryQuantity.value =
    recievedIngredientSum.value -
    consumedIngredientSum.value +
    inventoryIngredientAjustSum.value;
};

const formatDate = (row, column, cellValue) => {
  return utils.formatDateTime(cellValue);
};

const formatBrewingUnit = (row) => {
  switch (row.processingType) {
    case processingType.brewing:
      return row.ingredient.brewingUnit.name;

    case processingType.recieving:
      return "";

    case processingType.inventory:
      if (row.quantity <= 0) {
        return row.ingredient.stockingUnit.name;
      }
      return "";

    default:
      row.unitName;
      break;
  }
};

const formatRecievingUnit = (row) => {
  switch (row.processingType) {
    case processingType.brewing:
      return "";

    case processingType.recieving:
      return row.ingredient.recievingUnit.name;

    case processingType.inventory:
      if (row.quantity >= 0) {
        return row.ingredient.stockingUnit.name;
      }
      return "";

    default:
      row.unitName;
      break;
  }
};

const onClickExportExcel = () => {
  exportExcelDialogVisible.value = true;
  exportData();
  exportExcelDialogVisible.value = false;
};

const exportData = async () => {
  const excelTableData = [];
  const ingredientClassifications = [];
  const reportDataBuffer = [];
  let consumedIngredientSum = 0;
  let recievedIngredientSum = 0;
  let inventoryIngredientAjustSum = 0;
  let inventoryQuantity = 0;
  let allConsumedIngredientSum = 0;
  let allRecievedIngredientSum = 0;
  let allInventoryIngredientAjustSum = 0;
  let allInventoryQuantity = 0;

  const createExcelTableData = (ingredient) => {
    const sortedBuffer = reportIngredientService.sortByDate(reportDataBuffer);
    const carryOver = () =>
      reportIngredientService.carryOver(
        ingredient.id,
        reportDataBuffer,
        fromDate()
      );
    excelTableData.splice(0);
    excelTableData.push(
      new ReportIngredient(
        "",
        fromDate(),
        processingType.inventory,
        ingredient,
        null,
        null,
        carryOver(),
        ingredient.stockingUnit.name
      )
    );
    sortedBuffer.forEach((item) => {
      if (item.processingDate > fromDate() && item.processingDate <= toDate()) {
        excelTableData.push(item);
      }
    });

    reportIngredientService.calcurateInventryQuantity(excelTableData);
  };

  const createHeaderData = (ingredient) => {
    consumedIngredientSum = reportIngredientService.comsumedQuantity(
      ingredient.id,
      reportDataBuffer,
      toDate()
    );

    recievedIngredientSum = reportIngredientService.recievedQuantity(
      ingredient.id,
      reportDataBuffer,
      toDate()
    );

    inventoryIngredientAjustSum =
      reportIngredientService.inventoryAdjustedQuantity(
        ingredient.id,
        reportDataBuffer,
        toDate()
      );

    inventoryQuantity =
      recievedIngredientSum -
      consumedIngredientSum +
      inventoryIngredientAjustSum;

    allConsumedIngredientSum = allConsumedIngredientSum + consumedIngredientSum;
    allRecievedIngredientSum = allRecievedIngredientSum + recievedIngredientSum;
    allInventoryIngredientAjustSum =
      allInventoryIngredientAjustSum + inventoryIngredientAjustSum;
    allInventoryQuantity = allInventoryQuantity + inventoryQuantity;
  };

  const workbook = new ExcelJS.Workbook();

  workbook.addWorksheet("grains");
  const grainWorksheet = workbook.getWorksheet("grains");

  allConsumedIngredientSum = 0;
  allRecievedIngredientSum = 0;
  allInventoryIngredientAjustSum = 0;
  allInventoryQuantity = 0;
  grainsBuffer.forEach((grain) => {
    reportDataBuffer.splice(0);

    const reportIngredients = reportIngredientService.createReportIngredient(
      grain,
      brewPlansBuffer,
      brewEventsBuffer,
      recieveEventsBuffer,
      inventoryBuffer,
      "grains"
    );
    reportIngredients.forEach((item) => {
      reportDataBuffer.push(item);
    });

    consumedIngredientSum = 0;
    recievedIngredientSum = 0;
    inventoryIngredientAjustSum = 0;
    inventoryQuantity = 0;
    createExcelTableData(grain);
    createHeaderData(grain);

    if (excelTableData.length != 1 || excelTableData[0].stockingQuantity != 0) {
      grainWorksheet.addRow([]);
      grainWorksheet.addRow([grain.name]);
      grainWorksheet.addRow([
        "入荷合計",
        recievedIngredientSum,
        grain.stockingUnit.name,
      ]);
      grainWorksheet.addRow([
        "使用合計",
        consumedIngredientSum,
        grain.stockingUnit.name,
      ]);
      grainWorksheet.addRow([
        "棚卸調整合計",
        inventoryIngredientAjustSum,
        grain.stockingUnit.name,
      ]);
      grainWorksheet.addRow([
        "在庫数",
        inventoryQuantity,
        grain.stockingUnit.name,
      ]);
      grainWorksheet.addRow([
        "日付",
        "処理区分",
        "仕入先",
        "入荷量",
        "単位",
        "batch NO",
        "batch name",
        "払出量",
        "単位",
        "在庫量",
        "単位",
      ]);
      for (let i = 0; i < excelTableData.length; i++) {
        grainWorksheet.addRow([
          excelTableData[i].processingDate,
          excelTableData[i].processingType,
          excelTableData[i].supplier ? excelTableData[i].supplier.name : "",
          excelTableData[i].recievedQuantity,
          formatRecievingUnit(excelTableData[i]),
          excelTableData[i].brewPlan
            ? excelTableData[i].brewPlan.batchNumber
            : "",
          excelTableData[i].brewPlan ? excelTableData[i].brewPlan.name : "",
          excelTableData[i].consumedQuantity,
          formatBrewingUnit(excelTableData[i]),
          excelTableData[i].stockingQuantity,
          excelTableData[i].unitName,
        ]);
      }
    }
  });

  workbook.addWorksheet("hops");
  const hopWorksheet = workbook.getWorksheet("hops");

  allConsumedIngredientSum = 0;
  allRecievedIngredientSum = 0;
  allInventoryIngredientAjustSum = 0;
  allInventoryQuantity = 0;
  hopsBuffer.forEach((hop) => {
    reportDataBuffer.splice(0);

    const reportIngredients = reportIngredientService.createReportIngredient(
      hop,
      brewPlansBuffer,
      brewEventsBuffer,
      recieveEventsBuffer,
      inventoryBuffer,
      "hops"
    );
    reportIngredients.forEach((item) => {
      reportDataBuffer.push(item);
    });

    consumedIngredientSum = 0;
    recievedIngredientSum = 0;
    inventoryIngredientAjustSum = 0;
    inventoryQuantity = 0;
    createExcelTableData(hop);
    createHeaderData(hop);
  });

  workbook.addWorksheet("yeasts");
  const yeastsWorksheet = workbook.getWorksheet("yeasts");

  allConsumedIngredientSum = 0;
  allRecievedIngredientSum = 0;
  allInventoryIngredientAjustSum = 0;
  allInventoryQuantity = 0;
  yeastsBuffer.forEach((yeast) => {
    reportDataBuffer.splice(0);

    const reportIngredients = reportIngredientService.createReportIngredient(
      yeast,
      brewPlansBuffer,
      brewEventsBuffer,
      recieveEventsBuffer,
      inventoryBuffer,
      "yeasts"
    );
    reportIngredients.forEach((item) => {
      reportDataBuffer.push(item);
    });

    consumedIngredientSum = 0;
    recievedIngredientSum = 0;
    inventoryIngredientAjustSum = 0;
    inventoryQuantity = 0;
    createExcelTableData(yeast);
    createHeaderData(yeast);
  });

  ingredientsBuffer.forEach((ingredient) => {
    reportDataBuffer.splice(0);

    const reportIngredients = reportIngredientService.createReportIngredient(
      ingredient,
      brewPlansBuffer,
      brewEventsBuffer,
      recieveEventsBuffer,
      inventoryBuffer,
      "yeasts"
    );
    reportIngredients.forEach((item) => {
      reportDataBuffer.push(item);
    });

    consumedIngredientSum = 0;
    recievedIngredientSum = 0;
    inventoryIngredientAjustSum = 0;
    inventoryQuantity = 0;
    createExcelTableData(ingredient);
    createHeaderData(ingredient);
  });

  // ③ファイル生成
  const uint8Array = await workbook.xlsx.writeBuffer();
  const blob = new Blob([uint8Array], { type: "application/octet-binary" });
  const a = document.createElement("a");
  a.href = (window.URL || window.webkitURL).createObjectURL(blob);
  a.download = `output.xlsx`;
  a.click();
  a.remove();
};
</script>

<template>
  <div class="report-ingredient">
    <el-row>
      <el-col :span="6">
        <el-row>
          <el-date-picker
            v-model="fromDateStr"
            type="date"
            placeholder="Select date"
          />
          <el-date-picker
            v-model="toDateStr"
            type="date"
            placeholder="Select date"
          />
        </el-row>
        <el-row>
          <el-radio-group
            v-model="selectedCategory"
            @change="onChangeSelectedCategory"
          >
            <el-radio label="grains">Grains</el-radio>
            <el-radio label="hops">Hops</el-radio>
            <el-radio label="yeasts">酵母</el-radio>
            <el-radio label="others">その他</el-radio>
          </el-radio-group>
        </el-row>
        <el-row>
          <el-radio-group
            v-model="selectedIngredientClassificationID"
            @change="onChangeIngredientClassification"
            v-if="isIngredientClassificationVisible"
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
            v-model="selectedIngredient"
            @change="onChangeIngredient"
          >
            <el-radio
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :label="ingredient"
              >{{ ingredient.name }}</el-radio
            >
          </el-radio-group>
        </el-row>
        <el-row>
          <el-menu>
            <el-menu-item @click="onClickExportExcel"
              >エクセル出力</el-menu-item
            >
          </el-menu>
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
              width="100"
            />
            <el-table-column
              prop="processingType"
              label="処理区分"
              width="100"
            />
            <el-table-column prop="supplier.name" label="仕入先" width="180" />
            <el-table-column
              prop="recievedQuantity"
              label="入荷量"
              width="100"
            />
            <el-table-column
              :formatter="formatRecievingUnit"
              label="単位"
              width="100"
            />
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
            <el-table-column
              prop="consumedQuantity"
              label="払出量"
              width="100"
            />
            <el-table-column
              :formatter="formatBrewingUnit"
              label="単位"
              width="100"
            />
            <el-table-column
              prop="stockingQuantity"
              label="在庫量"
              width="100"
            />
            <el-table-column prop="unitName" label="単位" />
          </el-table>
        </el-row>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="exportExcelDialogVisible">
    <p>
      <span>出力データを作成しています。</span>
    </p>
  </el-dialog>
</template>
