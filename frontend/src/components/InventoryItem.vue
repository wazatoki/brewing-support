<script setup>
import { InventoryIngredient } from "@/models/inventoryIngredient";
import { ref } from "vue";
import {
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElInput,
  ElButton,
} from "element-plus/dist/index.full.js";
import { inventoryCalculatedValue } from "@/services/inventory";

const props = defineProps({
  inventoryItemData: InventoryIngredient,
  itemMsts: [],
  inventories: [],
  brewEvents: [],
  recieveEvents: [],
});

const emit = defineEmits(["update:inventoryItemData", "deleteItem"]);

const calculatedValue = ref(props.inventoryItemData.calculatedValue);
const resultValue = ref(props.inventoryItemData.resultValue);
const adjustedValue = ref(props.inventoryItemData.adjustedValue);
const note = ref(props.inventoryItemData.note);
const unitName = ref(props.inventoryItemData.ingredient.stockingUnit.name);
const selectedItemID = ref(props.inventoryItemData.ingredient.id);

const onChange = () => {
  const ingredient = props.itemMsts.find(
    (item) => item.id === selectedItemID.value
  );
  unitName.value = "";

  if (ingredient) {
    unitName.value = ingredient.stockingUnit.name;
    calculatedValue.value = inventoryCalculatedValue(
      ingredient.id,
      props.inventories,
      props.brewEvents,
      props.recieveEvents
    );
  }

  emitData();
};

const emitData = () => {
  emit(
    "update:inventoryItemData",
    new InventoryIngredient(
      props.inventoryItemData.id,
      props.itemMsts.find((item) => item.id === selectedItemID.value),
      resultValue.value,
      calculatedValue.value,
      adjustedValue.value,
      note.value
    )
  );
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
        v-model="selectedItemID"
        class="form-input"
        placeholder="品名"
        :teleported="false"
      >
        <el-option
          v-for="item in itemMsts"
          :key="item.id"
          :label="item.name"
          :value="item.id"
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
        @keypress="calculateAdjustedValue"
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
