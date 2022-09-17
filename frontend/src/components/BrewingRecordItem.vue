<script setup>
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { ref } from "vue";
import {
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElInput,
  ElButton,
} from "element-plus/dist/index.full.js";

const props = defineProps({
  brewingItemData: ConsumedIngredient,
  itemMsts: [],
});

const emit = defineEmits(["update:brewingItemData", "deleteItem"]);

const quantity = ref(props.brewingItemData.quantity);
const unitName = ref(props.brewingItemData.ingredient.brewingUnit.name);
const selectedItemID = ref(props.brewingItemData.ingredient.id);

const onChange = () => {
  const ingredient = props.itemMsts.find(
    (item) => item.id === selectedItemID.value
  );
  unitName.value = "";

  if (ingredient) {
    unitName.value = ingredient.brewingUnit.name;
  }

  emitData();
};

const emitData = () => {
  emit(
    "update:brewingItemData",
    new ConsumedIngredient(
      props.brewingItemData.id,
      props.itemMsts.find((item) => item.id === selectedItemID.value),
      quantity.value
    )
  );
};

const clickDelete = () => {
  emit("deleteItem");
};
</script>

<template>
  <el-row class="brewing-record-item">
    <el-col :span="14">
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
    <el-col :span="4">
      <el-input
        @blur="emitData"
        v-model="quantity"
        class="form-input"
        placeholder="数量"
      />
    </el-col>
    <el-col :span="2">{{ unitName }}</el-col>
    <el-col :span="4">
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
