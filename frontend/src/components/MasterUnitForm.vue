<script setup>
import { reactive, ref } from "vue";
import { Unit } from "@/models/unit";

const props = defineProps({
  unitData: Unit,
  unitMsts: [],
});

const emit = defineEmits(["submitUnit", "clickCancel"]);

const form = reactive(props.unitData);

const rules = reactive({
  name: [{ required: true, message: "名称は必須項目です。", trigger: "blur" }],
  conversionFactor: [
    {
      type: "number",
      min: 1,
      message: "換算係数には1以上の数値を入力してください。",
      trigger: "blur",
    },
  ],
});

const formRef = ref();

const onSubmit = async (formEl) => {
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit(
        "submitUnit",
        new Unit(form.id, form.name, form.conversionFactor, form.baseUnit)
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
          label="換算係数"
          :label-width="formLabelWidth"
          prop="conversionFactor"
        >
          <el-input v-model.number="form.conversionFactor" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="基礎単位" :label-width="formLabelWidth">
          <el-select v-model="form.baseUnit" value-key="id" class="form-input">
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
