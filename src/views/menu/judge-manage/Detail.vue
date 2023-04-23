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
    <a-form-item label="用户名" name="createUserName">
      {{formState.createUserName}}
    </a-form-item>
    <a-form-item label="评分" name="spotFraction">
      {{ formState.spotFraction }}
    </a-form-item>
    <a-form-item label="评论内容" name="spotCommentContent">
      {{ formState.spotCommentContent }}
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {updateMethod} from "../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue"
import requestMethodJudge from '../../../api/menu/judge'
import {JudgeVo} from "../../../entity/menu/judge";
const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单对象
const formState = reactive<JudgeVo>({
  //创建人姓名
  createUserName:'',
  //创建时间
  gmtCreate:'',
  //修改时间
  gmtModified:'',
  //主键id
  id:'',
  // 备注
  memo:'',
  //景区评论内容
  spotCommentContent:'',
  //景区评分
  spotFraction:'',
  // 用户名
  userName:'',
})
onMounted(async () => {
  await getDetailById()
})
const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodJudge.getByJudgeId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
  }
}
</script>

<style scoped>

</style>