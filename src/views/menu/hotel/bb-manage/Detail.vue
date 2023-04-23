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
    <a-form-item label="民宿名称" name="bbTitle">
      {{formState.bbTitle}}
    </a-form-item>
    <a-form-item label="民宿等级" name="bbGrade">
      {{formState.bbGrade}}
    </a-form-item>
    <a-form-item label="民宿图片" name="bbPic">
      <a-image v-for="(item, index) in fileList" :key="`image_${index}`" :width="120" :height="80" :src="item" />
    </a-form-item>
    <a-form-item label="民宿价格" name="bbPrice">
      {{formState.bbPrice}}
    </a-form-item>
    <a-form-item label="民宿地址" name="bbAddress">
      {{formState.bbAddress}}
    </a-form-item>
    <a-form-item label="民宿介绍" name="bbIntroduce">
      {{formState.bbIntroduce}}
    </a-form-item>

  </a-form>
</template>

<script lang="ts" setup>
import {updateMethod} from "../../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue";
import {BaseUtil} from "../../../../utils/base-util";
import {messageMethod} from "../../../../utils/message-util";
import {QueryObjectType} from "../../../../http/request-model";
import requestMethodBb from "../../../../api/menu/bb";
import {BbVo} from "../../../../entity/menu/bb";

const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单提交对象
const formState=reactive<BbVo>({
  //民宿地址
  bbAddress:'',
  //等级
  bbGrade:'',
  //民宿介绍
  bbIntroduce:'',
  //名宿咨询电话
  bbPhone:'',
  //图片
  bbPic:'',
  //价格
  bbPrice:'',
  //民宿名
  bbTitle:'',
  //主键id
  id:'',
  //备注
  memo:'',
})
onMounted(async () => {
  await getDetailById()
})
async function onFinish(params:BbVo ) {
  const data = {
    ...(params as unknown as QueryObjectType),
    version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodBb.update({ ...data, id: props.id })
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交新增表单
    const { message } = await requestMethodBb.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}

const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodBb.getByBbId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
    fileList.value = formState.bbPic.split(',').map(file => {
      return BaseUtil.getUploadPath(file)
    })
  }
}

</script>

<style scoped lang="scss">

</style>