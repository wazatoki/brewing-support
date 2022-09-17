<script setup>
import { reactive, ref } from "vue";
import { IngredientClassification } from "@/models/ingredientClassification";

const props = defineProps({
  ingredientClassificationData: IngredientClassification,
});

const emit = defineEmits(["submit", "cancel"]);

const form = reactive(props.ingredientClassificationData);

const rules = reactive({
  name: [{ required: true, message: "名称は必須項目です。", trigger: "blur" }],
});

const formRef = ref();

const onSubmit = async (formEl) => {
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit("submit", new IngredientClassification(form.id, form.name));
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
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
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
