<template>
  <drawer-base-info v-if="props.id" :detail="formState" />
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
    <a-form-item label="活动标题" name="activityTitle">
      {{formState.activityTitle}}
    </a-form-item>
    <a-form-item label="活动内容" name="activityIntroduction">
      {{ formState.activityIntroduction }}
    </a-form-item>
    <a-form-item label="活动地点" name="activityPlace">
      {{ formState.activityPlace }}
    </a-form-item>
    <a-form-item label="封面" name="activityCover">
      <a-image v-for="(item, index) in fileList" :key="`image_${index}`" :width="120" :height="80" :src="item" />
    </a-form-item>
    <a-form-item label="活动类型" name="activityTypeName">
      {{ formState.activityTypeName }}
    </a-form-item>
    <a-form-item label="最大人数" name="activityMaxAmount">
      {{ formState.activityMaxAmount }}
    </a-form-item>
    <a-form-item label="活动负责人" name="activityPrincipal">
      {{ formState.activityPrincipal }}
    </a-form-item>
    <a-form-item label="活动负责人电话" name="activityMobile">
      {{ formState.activityMobile }}
    </a-form-item>
  </a-form>
</template>


<script lang="ts" setup>
import {updateMethod} from "../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue";
import {BaseUtil} from "../../../utils/base-util";
import {messageMethod} from "../../../utils/message-util";
import {QueryObjectType} from "../../../http/request-model";
import requestMethodActivity from "../../../api/menu/exercise";
import {ExerciseVo} from "../../../entity/menu/exercise";

const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单提交对象
const formState = reactive<ExerciseVo>({
  id: '',
// 活动封面
  activityCover:'',
  //截止时间
  activityEndtime:'',
  //报名结束时间
  activityEnrollEndTime:'',
  // 报名开始时间
  activityEnrollStartTime:'',
  // 活动介绍
  activityIntroduction:'',
  //  关键字
  activityKeywords:'',
  //活动最大人数
  activityMaxAmount:'',
  //负责人电话
  activityMobile:'',
  //活动地点
  activityPlace:'',
  //  活动负责人
  activityPrincipal:'',
  //活动标题
  activityTitle:'',
  //  活动类型名称
  activityTypeName:'',
  memo:'',
})
//表单校验
onMounted(async () => {
  await getDetailById()
})
async function onFinish(params:ExerciseVo ) {
  const data = {
    ...(params as unknown as QueryObjectType),
    version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodActivity.update({ ...data, id: props.id })
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交新增表单
    const { message } = await requestMethodActivity.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}

const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodActivity.getByExerciseId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
    fileList.value = formState.activityCover.split(',').map(file => {
      return BaseUtil.getUploadPath(file)
    })
  }
}

</script>

<style scoped lang="scss">

</style>