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
const fromDateStr = ref();
const toDateStr = ref(new Date());

const fromDate = () => {
  return new Date(fromDateStr.value);
};
const toDate = () => {
  const d = new Date(toDateStr.value);
  return new Date(d.getFullYear(), d.getMonth(), d.getDay(), 23, 59, 59, 999);
};

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

  pushBrewEventData();
  pushRecieveEventData();
  pushInventoryData();

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
    if (item.processingDate > fromDate()) {
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

const pushBrewEventData = () => {
  const funcs = {
    grains: (brewEvent) => {
      brewEvent.grains.forEach((consumedIngredient) => {
        if (consumedIngredient.grain.id === selectedIngredient.value.id) {
          reportDataBuffer.push(
            new ReportIngredient(
              "",
              brewEvent.from,
              processingType.brewing,
              consumedIngredient.grain,
              null,
              brewPlansBuffer.find((item) => item.id === brewEvent.brewPlanID),
              consumedIngredient.convertToStockingUnit.quantity,
              consumedIngredient.convertToStockingUnit.stockingUnit.name
            )
          );
        }
      });
    },
    hops: (brewEvent) => {
      brewEvent.hops.forEach((consumedIngredient) => {
        if (consumedIngredient.hop.id === selectedIngredient.value.id) {
          reportDataBuffer.push(
            new ReportIngredient(
              "",
              brewEvent.from,
              processingType.brewing,
              consumedIngredient.hop,
              null,
              brewPlansBuffer.find((item) => item.id === brewEvent.brewPlanID),
              consumedIngredient.convertToStockingUnit.quantity,
              consumedIngredient.convertToStockingUnit.stockingUnit.name
            )
          );
        }
      });
    },
    yeasts: (brewEvent) => {
      brewEvent.yeasts.forEach((consumedIngredient) => {
        if (consumedIngredient.yeast.id === selectedIngredient.value.id) {
          reportDataBuffer.push(
            new ReportIngredient(
              "",
              brewEvent.from,
              processingType.brewing,
              consumedIngredient.yeast,
              null,
              brewPlansBuffer.find((item) => item.id === brewEvent.brewPlanID),
              consumedIngredient.convertToStockingUnit.quantity,
              consumedIngredient.convertToStockingUnit.stockingUnit.name
            )
          );
        }
      });
    },
    others: (brewEvent) => {
      brewEvent.ingredients.forEach((consumedIngredient) => {
        if (consumedIngredient.ingredient.id === selectedIngredient.value.id) {
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
    },
  };
  brewEventsBuffer.forEach((brewEvent) => {
    if (funcs[selectedCategory.value] != null) {
      funcs[selectedCategory.value](brewEvent);
    }
  });
};

const pushRecieveEventData = () => {
  const funcs = {
    grains: (recieveEvent) => {
      recieveEvent.grains.forEach((recievedIngredient) => {
        if (recievedIngredient.grain.id === selectedIngredient.value.id) {
          reportDataBuffer.push(
            new ReportIngredient(
              "",
              recieveEvent.recieveDate,
              processingType.recieving,
              recievedIngredient.grain,
              recieveEvent.supplier,
              null,
              recievedIngredient.convertToStockingUnit.quantity,
              recievedIngredient.convertToStockingUnit.stockingUnit.name
            )
          );
        }
      });
    },
    hops: (recieveEvent) => {
      recieveEvent.hops.forEach((recievedIngredient) => {
        if (recievedIngredient.hop.id === selectedIngredient.value.id) {
          reportDataBuffer.push(
            new ReportIngredient(
              "",
              recieveEvent.recieveDate,
              processingType.recieving,
              recievedIngredient.hop,
              recieveEvent.supplier,
              null,
              recievedIngredient.convertToStockingUnit.quantity,
              recievedIngredient.convertToStockingUnit.stockingUnit.name
            )
          );
        }
      });
    },
    yeasts: (recieveEvent) => {
      recieveEvent.yeasts.forEach((recievedIngredient) => {
        if (recievedIngredient.yeast.id === selectedIngredient.value.id) {
          reportDataBuffer.push(
            new ReportIngredient(
              "",
              recieveEvent.recieveDate,
              processingType.recieving,
              recievedIngredient.yeast,
              recieveEvent.supplier,
              null,
              recievedIngredient.convertToStockingUnit.quantity,
              recievedIngredient.convertToStockingUnit.stockingUnit.name
            )
          );
        }
      });
    },
    others: (recieveEvent) => {
      recieveEvent.ingredients.forEach((recievedIngredient) => {
        if (recievedIngredient.ingredient.id === selectedIngredient.value.id) {
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
    },
  };

  recieveEventsBuffer.forEach((recieveEvent) => {
    if (funcs[selectedCategory.value] != null) {
      funcs[selectedCategory.value](recieveEvent);
    }
  });
};

const pushInventoryData = () => {
  const funcs = {
    grains: (inventory) => {
      inventory.grains.forEach((inventoryIngredient) => {
        if (inventoryIngredient.grain.id === selectedIngredient.value.id) {
          reportDataBuffer.push(
            new ReportIngredient(
              "",
              inventory.onDate,
              processingType.inventory,
              inventoryIngredient.grain,
              null,
              null,
              inventoryIngredient.adjustedValue,
              inventoryIngredient.grain.stockingUnit.name
            )
          );
        }
      });
    },
    hops: (inventory) => {
      inventory.hops.forEach((inventoryIngredient) => {
        if (inventoryIngredient.hop.id === selectedIngredient.value.id) {
          reportDataBuffer.push(
            new ReportIngredient(
              "",
              inventory.onDate,
              processingType.inventory,
              inventoryIngredient.hop,
              null,
              null,
              inventoryIngredient.adjustedValue,
              inventoryIngredient.hop.stockingUnit.name
            )
          );
        }
      });
    },
    yeasts: (inventory) => {
      inventory.yeasts.forEach((inventoryIngredient) => {
        if (inventoryIngredient.yeast.id === selectedIngredient.value.id) {
          reportDataBuffer.push(
            new ReportIngredient(
              "",
              inventory.onDate,
              processingType.inventory,
              inventoryIngredient.yeast,
              null,
              null,
              inventoryIngredient.adjustedValue,
              inventoryIngredient.yeast.stockingUnit.name
            )
          );
        }
      });
    },
    others: (inventory) => {
      inventory.ingredients.forEach((inventoryIngredient) => {
        if (inventoryIngredient.ingredient.id === selectedIngredient.value.id) {
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
    },
  };

  inventoryBuffer.forEach((inventory) => {
    if (funcs[selectedCategory.value] != null) {
      funcs[selectedCategory.value](inventory);
    }
  });
};

const formatDate = (row, column, cellValue) => {
  return utils.formatDateTime(cellValue);
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
            <el-table-column prop="supplier.name" label="仕入先" width="180" />
            <el-table-column
              prop="recievedQuantity"
              label="入荷量"
              width="180"
            />
            <el-table-column
              prop="ingredient.recievingUnit.name"
              label="単位"
              width="180"
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
              width="180"
            />
            <el-table-column
              prop="ingredient.brewingUnit.name"
              label="単位"
              width="180"
            />
            <el-table-column
              prop="stockingQuantity"
              label="在庫量"
              width="180"
            />
            <el-table-column prop="unitName" label="単位" />
          </el-table>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
