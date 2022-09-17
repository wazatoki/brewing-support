<script setup>
import { reactive, ref, watch } from "vue";
import StocksRecievingItem from "@/components/StocksRecievingItem.vue";
import { RecieveEvent } from "@/models/recieveEvent";
import { RecievedIngredient } from "@/models/recievedIngredient";
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElButton,
  ElPopconfirm,
  ElSelect,
} from "element-plus/dist/index.full.js";

const props = defineProps({
  recieveEventData: RecieveEvent,
  suppliers: [],
  ingredientMsts: [],
});

const emit = defineEmits(["clickSubmit", "clickCancel", "clickDelete"]);

const form = reactive(props.recieveEventData);
const selectedSupplierID = ref(props.recieveEventData.supplier.id);
watch(props.recieveEventData, (a) => {
  selectedSupplierID.value = a.supplier.id;
});

const formLabelWidth = "140px";

const addIngredient = () => {
  form.ingredients.push(new RecievedIngredient("", props.ingredientMsts[0], 0));
};

const updateStockRecievingItemData = (stockRecievingItemData, index) => {
  form.ingredients[index] = stockRecievingItemData;
};

const removeStockRecievingItemData = (index) => {
  form.ingredients.splice(index, 1);
};

const onSubmit = () => {
  emit(
    "clickSubmit",
    new RecieveEvent(
      form.id,
      form.noteNO,
      form.noteDate,
      props.suppliers.find((item) => item.id === selectedSupplierID.value),
      form.recieveDate,
      form.ingredients,
      form.footNote
    )
  );
};

const onCancel = () => {
  emit("clickCancel");
};

const onDelete = () => {
  emit(
    "clickDelete",
    new RecieveEvent(
      form.id,
      form.noteNO,
      form.noteDate,
      props.suppliers.find((item) => item.id === selectedSupplierID.value),
      form.recieveDate,
      form.ingredients,
      form.footNote
    )
  );
};

// const onSupplierChange = () => {
//   const supplier = props.suppliers.find(
//     (item) => item.id === selectedSupplierID.value
//   );

//   form.supplier = supplier;
// };
</script>

<template>
  <el-form :model="form">
    <el-row>
      <el-col :span="24">
        <el-form-item label="伝票NO" :label-width="formLabelWidth">
          <el-input v-model="form.noteNO" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="伝票日付" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.noteDate"
            type="date"
            placeholder="Select date and time"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="仕入先" :label-width="formLabelWidth">
          <el-select
            @change="onSupplierChange"
            v-model="selectedSupplierID"
            class="form-input"
            placeholder="仕入先"
          >
            <el-option
              v-for="supplier in suppliers"
              :key="supplier.id"
              :label="supplier.name"
              :value="supplier.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="入荷日付" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.recieveDate"
            type="date"
            placeholder="Select date and time"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="備考" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.footNote"
            autocomplete="off"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="addIngredient">Add</el-button>
      </el-col>
    </el-row>
    <StocksRecievingItem
      v-for="(ingredient, index) in form.ingredients"
      :key="ingredient.id"
      :stockRecievingItemData="form.ingredients[index]"
      :item-msts="ingredientMsts"
      @update:stockRecievingItemData="
        updateStockRecievingItemData($event, index)
      "
      @deleteItem="removeStockRecievingItemData(index)"
    ></StocksRecievingItem>
    <el-row>
      <el-col>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-popconfirm
          confirm-button-text="Yes"
          cancel-button-text="No"
          title="Are you sure to delete this?"
          @confirm="onDelete"
        >
          <template #reference>
            <el-button type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
      </el-col>
    </el-row>
  </el-form>
</template>
