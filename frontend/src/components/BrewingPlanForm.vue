<script setup>
import { reactive, ref } from "vue";
import { BrewPlan } from "@/models/brewPlan";

const props = defineProps({
  brewPlan: BrewPlan,
});

const emit = defineEmits(["submit", "cancel"]);

const form = reactive(
  new BrewPlan(
    props.brewPlan.id,
    props.brewPlan.batchNumber,
    props.brewPlan.name,
    props.brewPlan.events
  )
);

const rules = reactive({
  name: [
    { required: true, message: "batch nameは必須項目です。", trigger: "blur" },
  ],
  batchNumber: [
    {
      required: true,
      message: "batch number は必須です。",
      trigger: "blur",
    },
    {
      type: "number",
      message: "batch number 数値を入力してください。",
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
        "submit",
        new BrewPlan(form.id, form.batchNumber, form.name, form.events)
      );
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const onCancel = () => {
  emit("cancel");
};
</script>

<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="batch numbre"
          :label-width="formLabelWidth"
          prop="batchNumber"
        >
          <el-input v-model.number="form.batchNumber" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="batch name"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
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
