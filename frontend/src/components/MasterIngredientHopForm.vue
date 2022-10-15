<!-- eslint-disable prettier/prettier -->
<script setup>
import { reactive, ref } from "vue";
import { Hop } from "@/models/ingredientHop";

const props = defineProps({
  hopData: Hop,
  unitMsts: [],
});

const emit = defineEmits(["submitHop", "clickCancel"]);

const form = reactive(props.hopData);

const rules = reactive({
  name: [{ required: true, message: "名称は必須項目です。", trigger: "blur" }],
  alphaAcid: [{ required: true, message: "α酸は必須項目です。", trigger: "blur" }],
});

const formRef = ref();

const onSubmit = async (formEl) => {
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit(
        "submitHop",
        new Hop(form.id, form.name, form.alphaAcid, form.brewingUnit, form.recievingUnit, form.stockingUnit)
      );
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const onCancel = () => {
  emit("clickCancel");
};
</script>

<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-row>
      <el-col :span="24">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="α酸"
          :label-width="formLabelWidth"
          prop="alphaAcid"
        >
          <el-input v-model="form.alphaAcid" autocomplete="off" /><span>%</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="使用単位" :label-width="formLabelWidth">
          <el-select
            v-model="form.brewingUnit"
            value-key="id"
            class="form-input"
          >
            <el-option
              v-for="item in unitMsts"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="入荷単位" :label-width="formLabelWidth">
          <el-select
            v-model="form.recievingUnit"
            value-key="id"
            class="form-input"
          >
            <el-option
              v-for="item in unitMsts"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="在庫単位" :label-width="formLabelWidth">
          <el-select
            v-model="form.stockingUnit"
            value-key="id"
            class="form-input"
          >
            <el-option
              v-for="item in unitMsts"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="primary" @click="onSubmit(formRef)">確定</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
