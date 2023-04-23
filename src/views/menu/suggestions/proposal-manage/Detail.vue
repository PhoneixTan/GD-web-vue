<template>
  <drawer-base-info v-if="props.id" :detail="formState" />
  <a-form
      ref="formRef"
      v-if="useUpdateMethod.visible"
      :model="formState"
      :label-col="useUpdateMethod.formLabelCol"
      :wrapper-col="useUpdateMethod.formWrapperCol"
      autocomplete="off"
      @finishFailed="useUpdateMethod.formFail"
  >
    <a-form-item label="姓名" name="suggestName">
      {{formState.suggestName}}
    </a-form-item>
    <a-form-item label="联系方式" name="suggestPhone">
      {{ formState.suggestPhone }}
    </a-form-item>
    <a-form-item label="建议反馈内容" name="suggestContent">
      {{ formState.suggestContent }}
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {updateMethod} from "../../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue"
import requestMethodProposal from '../../../../api/menu/suggest'
import {SuggestVo} from "../../../../entity/menu/suggest";
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
</script>

<style scoped>

</style>