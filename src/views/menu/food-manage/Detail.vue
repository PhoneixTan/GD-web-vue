<template>
  <drawer-base-info v-if="props.id" :detail="formState"/>
  <a-form
      ref="formRef"
      v-if="useUpdateMethod.visible"
      :model="formState"
      :label-col="useUpdateMethod.formLabelCol"
      :wrapper-col="useUpdateMethod.formWrapperCol"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="useUpdateMethod.formFail"
  >
    <a-form-item label="美食名称" name="foodName">
      {{formState.foodName}}
    </a-form-item>
    <a-form-item label="美食图片" name="foodPic">
      <a-image v-for="(item, index) in fileList" :key="`image_${index}`" :width="120" :height="180" :src="item" />
    </a-form-item>
    <a-form-item label="美食菜谱" name="foodIntroduce">
      {{formState.foodIntroduce}}
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {updateMethod} from "../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue";
import {BaseUtil} from "../../../utils/base-util";
import {messageMethod} from "../../../utils/message-util";
import {QueryObjectType} from "../../../http/request-model";
import requestMethodFood from "../../../api/menu/food";
import {FoodVo} from "../../../entity/menu/food";

const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单提交对象
const formState = reactive<FoodVo>({
  //美食菜谱
  foodIntroduce:'',
  //美食名称
  foodName:'',
  //美食图片
  foodPic:'',
  //主键id
  id:'',
  //备注
  memo:'',
})
onMounted(async () => {
  await getDetailById()
})
async function onFinish(params: FoodVo) {
  const data = {
    ...(params as unknown as QueryObjectType),
    version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodFood.update({ ...data, id: props.id })
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交新增表单
    const { message } = await requestMethodFood.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}

const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodFood.getByFoodId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
    fileList.value = formState.foodPic.split(',').map(file => {
      return BaseUtil.getUploadPath(file)
    })
  }
}

</script>

<style scoped lang="scss">

</style>