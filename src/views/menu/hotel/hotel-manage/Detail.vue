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
    <a-form-item label="酒店名称" name="hotelTitle">
      {{formState.hotelTitle}}
    </a-form-item>
    <a-form-item label="酒店等级" name="hotelGrade">
      {{formState.hotelGrade}}
    </a-form-item>
    <a-form-item label="酒店图片" name="hotelPic">
      <a-image v-for="(item, index) in fileList" :key="`image_${index}`" :width="120" :height="80" :src="item" />
    </a-form-item>
    <a-form-item label="酒店价格" name="hotelPrice">
      {{formState.hotelPrice}}
    </a-form-item>
    <a-form-item label="酒店介绍" name="hotelAddress">
      {{formState.hotelAddress}}
    </a-form-item>

  </a-form>
</template>

<script lang="ts" setup>
import {updateMethod} from "../../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue";
import {HotelVo} from "../../../../entity/menu/hotel";
import {BaseUtil} from "../../../../utils/base-util";
import {messageMethod} from "../../../../utils/message-util";
import {QueryObjectType} from "../../../../http/request-model";
import requestMethodHotel from "../../../../api/menu/hotel";

const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单提交对象
const formState=reactive<HotelVo>({
  //酒店地址
  hotelAddress:'',
  //等级
  hotelGrade:'',
  //酒店介绍
  hotelIntroduce:'',
  //酒店电话
  hotelPhone:'',
  //图片
  hotelPic:'',
  //价格
  hotelPrice:'',
  //酒店名
  hotelTitle:'',
  //主键id
  id:'',
  //备注
  memo:'',
})
onMounted(async () => {
  await getDetailById()
})
async function onFinish(params: HotelVo) {
  const data = {
    ...(params as unknown as QueryObjectType),
    version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodHotel.update({ ...data, id: props.id })
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交新增表单
    const { message } = await requestMethodHotel.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}

const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodHotel.getByHotelId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
    fileList.value = formState.hotelPic.split(',').map(file => {
      return BaseUtil.getUploadPath(file)
    })
  }
}

</script>

<style scoped lang="scss">

</style>