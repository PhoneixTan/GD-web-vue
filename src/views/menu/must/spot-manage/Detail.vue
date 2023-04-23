<template>
  <drawer-base-info v-if="props.id" :detail="formState"/>
  <a-form
      ref="formRef"
      v-if="useUpdateMethod.visible"
      :model="formState"
      :label-col="useUpdateMethod.formLabelCol"
      :wrapper-col="useUpdateMethod.formWrapperCol"
      autocomplete="off"
      :rules="formRules"
      @finish="onFinish"
      @finishFailed="useUpdateMethod.formFail"
  >
    <a-form-item label="景区名称" name="spotname">
      {{formState.spotname}}
    </a-form-item>
    <a-form-item label="景区等级" name="grade">
      {{formState.grade}}
    </a-form-item>
    <a-form-item label="景区描述" name="miaosu">
      {{formState.miaosu}}
    </a-form-item>
    <a-form-item label="景区地址" name="spotAddress">
       {{formState.spotAddress}}
    </a-form-item>
    <a-form-item label="景区图片" name="photo">
      <a-image v-for="(item, index) in fileList" :key="`image_${index}`" :width="120" :height="80" :src="item" />
    </a-form-item>
    <a-form-item label="景区介绍" name="spotIntroduce">
      {{formState.spotIntroduce}}
    </a-form-item>
    <a-form-item label="当前客流数量" name="numberOne">
      {{formState.numberOne}}
    </a-form-item>
    <a-form-item label="入园高峰数量" name="numberThree">
      {{formState.numberThree}}
    </a-form-item>
    <a-form-item label="今日累计流量" name="numberTwo">
      {{formState.numberTwo}}
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {updateMethod} from "../../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue";
import {SpotVo} from "../../../../entity/menu/must/spot";
import {BaseUtil} from "../../../../utils/base-util";
import {messageMethod} from "../../../../utils/message-util";
import {QueryObjectType} from "../../../../http/request-model";
import requestMethodSpot from "../../../../api/menu/must/spot";

const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单提交对象
const formState=reactive<SpotVo>({
  //景区等级
  grade:'',
  //主键id
  id:'',
  //  备注
  memo:'',
  //描述
  miaosu:'',
  //当前客流数量
  numberOne:'',
  //入园高峰数量
  numberThree:'',
  //今日累计客流数量
  numberTwo:'',
  //电话号码
  phoneNumber:'',
  //图片
  photo:'',
  //景区地址
  spotAddress:'',
  //评价
  spotTalk:'',
  //景区名
  spotname:'',
  //景区介绍
  spotIntroduce:'',
})
onMounted(async () => {
  await getDetailById()
})
async function onFinish(params: SpotVo) {
  const data = {
    ...(params as unknown as QueryObjectType),
    version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodSpot.update({ ...data, id: props.id })
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交新增表单
    const { message } = await requestMethodSpot.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}

const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodSpot.getBySpotId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
    fileList.value = formState.photo.split(',').map(file => {
      return BaseUtil.getUploadPath(file)
    })
  }
}

</script>

<style scoped lang="scss">

</style>