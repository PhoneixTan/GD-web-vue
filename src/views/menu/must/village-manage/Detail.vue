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
    <a-form-item label="景区村名称" name="villageName">
      {{formState.villageName}}
    </a-form-item>
    <a-form-item label="景区村等级" name="villageGrade">
      {{formState.villageGrade}}
    </a-form-item>
    <a-form-item label="景区村描述" name="villageEvaluate">
      {{formState.villageEvaluate}}
    </a-form-item>
    <a-form-item label="景区村地址" name="villageAddress">
       {{formState.villageAddress}}
    </a-form-item>
    <a-form-item label="景区村图片" name="villagePic">
      <a-image v-for="(item, index) in fileList" :key="`image_${index}`" :width="120" :height="80" :src="item" />
    </a-form-item>
    <a-form-item label="景区村介绍" name="villageIntroduce">
      {{formState.villageIntroduce}}
    </a-form-item>
    <a-form-item label="当前高峰" name="villagePeak">
      {{formState.villagePeak}}
    </a-form-item>
    <a-form-item label="累计人数" name="villageTotal">
      {{formState.villageTotal}}
    </a-form-item>
    <a-form-item label="景区村客流量" name="villageVisitor">
      {{formState.villageVisitor}}
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
import requestMethodVillage from "../../../../api/menu/must/village";
import {VillageVo} from "../../../../entity/menu/must/village";

const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单提交对象
const formState=reactive<VillageVo>({
  //    主键id
  id:'',
  //    备注
  memo:'',
  //    景区村地址
  villageAddress:'',
  //    描述
  villageEvaluate:'',
  //    等级
  villageGrade:'',
  //    介绍
  villageIntroduce:'',
  //    村名字
  villageName:'',
  //高峰
  villagePeak:'',
  //    景区村图片
  villagePic:'',
  //    累计人数
  villageTotal:'',
  //景区村客流量
  villageVisitor:'',

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
    const { message } = await requestMethodVillage.update({ ...data, id: props.id })
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交新增表单
    const { message } = await requestMethodVillage.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}

const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodVillage.getByVillageId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
    fileList.value = formState.villagePic.split(',').map(file => {
      return BaseUtil.getUploadPath(file)
    })
  }
}

</script>

<style scoped lang="scss">

</style>