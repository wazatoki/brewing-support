<script setup>
import { InventoryIngredient } from "@/models/inventoryIngredient";
import { InventoryIngredientGrain } from "@/models/inventoryIngredientGrain";
import { InventoryIngredientHop } from "@/models/inventoryIngredientHop";
import { InventoryIngredientYeast } from "@/models/inventoryIngredientYeast";
import { ref } from "vue";
import {
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElInput,
  ElButton,
} from "element-plus/dist/index.full.js";
import {
  inventoryCalculatedValue,
  inventoryGrainCalculatedValue,
  inventoryHopCalculatedValue,
  inventoryYeastCalculatedValue,
} from "@/services/inventory";

const props = defineProps({
  inventoryItemData:
    // eslint-disable-next-line vue/require-prop-type-constructor
    InventoryIngredient |
    InventoryIngredientGrain |
    InventoryIngredientHop |
    InventoryIngredientYeast,
  onDate: Date,
  itemMsts: [],
  inventories: [],
  brewEvents: [],
  recieveEvents: [],
});

const emit = defineEmits(["update:inventoryItemData", "deleteItem"]);
// eslint-disable-next-line vue/no-setup-props-destructure
const inventoryItemData = props.inventoryItemData;
const calculatedValue = ref(props.inventoryItemData.calculatedValue);
const resultValue = ref(props.inventoryItemData.resultValue);
const adjustedValue = ref(props.inventoryItemData.adjustedValue);
const note = ref(props.inventoryItemData.note);
const ingredient =
  props.inventoryItemData.ingredient ||
  props.inventoryItemData.grain ||
  props.inventoryItemData.hop ||
  props.inventoryItemData.yeast;
const unitName = ref("");
if (ingredient) {
  unitName.value = ingredient.stockingUnit.name;
}

const selectedItem = ref(ingredient);

const onChange = () => {
  unitName.value = "";
  if (selectedItem.value) {
    unitName.value = selectedItem.value.stockingUnit.name;

    if (inventoryItemData.ingredient) {
      calculatedValue.value = inventoryCalculatedValue(
        selectedItem.value.id,
        props.onDate,
        props.inventories,
        props.brewEvents,
        props.recieveEvents
      );
    }

    if (inventoryItemData.grain) {
      calculatedValue.value = inventoryGrainCalculatedValue(
        selectedItem.value.id,
        props.onDate,
        props.inventories,
        props.brewEvents,
        props.recieveEvents
      );
    }

    if (inventoryItemData.hop) {
      calculatedValue.value = inventoryHopCalculatedValue(
        selectedItem.value.id,
        props.onDate,
        props.inventories,
        props.brewEvents,
        props.recieveEvents
      );
    }

    if (inventoryItemData.yeast) {
      calculatedValue.value = inventoryYeastCalculatedValue(
        selectedItem.value.id,
        props.onDate,
        props.inventories,
        props.brewEvents,
        props.recieveEvents
      );
    }
  }

  emitData();
};

const emitData = () => {
  if (inventoryItemData.ingredient) {
    emit(
      "update:inventoryItemData",
      new InventoryIngredient(
        props.inventoryItemData.id,
        selectedItem.value,
        resultValue.value,
        calculatedValue.value,
        adjustedValue.value,
        note.value
      )
    );
  }

  if (inventoryItemData.grain) {
    emit(
      "update:inventoryItemData",
      new InventoryIngredientGrain(
        props.inventoryItemData.id,
        selectedItem.value,
        resultValue.value,
        calculatedValue.value,
        adjustedValue.value,
        note.value
      )
    );
  }

  if (inventoryItemData.hop) {
    emit(
      "update:inventoryItemData",
      new InventoryIngredientHop(
        props.inventoryItemData.id,
        selectedItem.value,
        resultValue.value,
        calculatedValue.value,
        adjustedValue.value,
        note.value
      )
    );
  }

  if (inventoryItemData.yeast) {
    emit(
      "update:inventoryItemData",
      new InventoryIngredientYeast(
        props.inventoryItemData.id,
        selectedItem.value,
        resultValue.value,
        calculatedValue.value,
        adjustedValue.value,
        note.value
      )
    );
  }
};

const clickDelete = () => {
  emit("deleteItem");
};

const calculateAdjustedValue = () => {
  adjustedValue.value = resultValue.value - calculatedValue.value;
};
</script>

<template>
  <el-row class="inventory-item">
    <el-col :span="6">
      <el-select
        @change="onChange"
        v-model="selectedItem"
        class="form-input"
        placeholder="品名"
        :teleported="false"
        value-key="id"
      >
        <el-option
          v-for="item in itemMsts"
          :key="item.id"
          :label="item.name"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="2">
      <label>計算数量:</label><span>{{ calculatedValue }}</span>
    </el-col>
    <el-col :span="1">{{ unitName }}</el-col>
    <el-col :span="2">
      <el-input
        @keyup="calculateAdjustedValue"
        @blur="emitData"
        v-model="resultValue"
        class="form-input"
        placeholder="確認数量"
      />
    </el-col>
    <el-col :span="1">{{ unitName }}</el-col>
    <el-col :span="2">
      <el-input
        @blur="emitData"
        v-model="adjustedValue"
        class="form-input"
        placeholder="修正数量"
      />
    </el-col>
    <el-col :span="1">{{ unitName }}</el-col>
    <el-col :span="6">
      <el-input
        @blur="emitData"
        v-model="note"
        class="form-input"
        placeholder="備考"
      />
    </el-col>
    <el-col :span="2">
      <el-button type="warning" @click="clickDelete">行削除</el-button>
    </el-col>
  </el-row>
</template>

<style>
div.form-input {
  width: 95%;
}

button.el-button {
  margin: 10px;
}
</style>
