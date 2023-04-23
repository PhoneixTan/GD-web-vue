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
    <a-form-item label="姓名" name="worstName">
      {{formState.worstName}}
    </a-form-item>
    <a-form-item label="联系方式" name="worstPhone">
      {{ formState.worstPhone }}
    </a-form-item>
    <a-form-item label="投诉内容" name="worstContent">
      {{ formState.worstContent }}
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {updateMethod} from "../../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue"
import requestMethodWorst from '../../../../api/menu/worst'
import {WorstVo} from "../../../../entity/menu/worst";
const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单对象
const formState = reactive<WorstVo>({
  //    创建时间
  gmtCreate:'',
  //    主键id
  id:'',
  //    备注
  memo:'',
  //    回复投诉
  worstBack:'',
  //    投诉内容
  worstContent:'',
  //    投诉者姓名
  worstName:'',
  //    投诉者联系方式
  worstPhone:'',
})
onMounted(async () => {
  await getDetailById()
})
const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodWorst.getByWorstId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
  }
}
</script>

<style scoped>

</style>