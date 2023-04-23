<template>
  <drawer-base-info v-if="props.id" :detail="formState" />
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
    <a-form-item label="回复建议" name="suggestBack">
      <a-input v-model:value="formState.suggestBack" placeholder="请输入回复建议" allow-clear/>
    </a-form-item>
    <a-form-item :wrapper-col="useUpdateMethod.formActionCol">
      <a-button html-type="submit" type="primary">确定</a-button>
      <a-button style="margin-left: 0.625rem" @click="useUpdateMethod.handleCancel()">取消</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import {updateMethod} from "../../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue"
import requestMethodProposal from '../../../../api/menu/suggest'
import {SuggestVo} from "../../../../entity/menu/suggest";
import {HotelVo} from "../../../../entity/menu/hotel";
import {QueryObjectType} from "../../../../http/request-model";
// import requestMethodHotel from "../../../../api/menu/hotel";
import {messageMethod} from "../../../../utils/message-util";
const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单对象
const formState = reactive<SuggestVo>({
  //    创建时间
  gmtCreate:'',
  //    主键id
  id:'',
  //    备注
  memo:'',
  //    回复建议
  suggestBack:'',
  //    建议反馈内容
  suggestContent:'',
  //    建议反馈姓名
  suggestName:'',
  //    建议反馈电话
  suggestPhone:'',
})
onMounted(async () => {
  await getDetailById()
})
const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodProposal.getBySuggestId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
  }
}
/*
 * 表单提交并数据验证成功
 * */
async function onFinish(params:HotelVo) {
  const data = {
    ...(params as unknown as QueryObjectType),
    //version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodProposal.update( { ...data,id:props.id})
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交表单
    const { message } = await requestMethodProposal.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}
</script>
<style scoped></style>
