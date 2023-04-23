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
    <a-form-item label="轮播图标题" name="bannerTitle">
      {{formState.bannerTitle}}
    </a-form-item>
    <a-form-item label="轮播图片" name="bannerPic">
      <a-image v-for="(item, index) in fileList" :key="`image_${index}`" :width="120" :height="80" :src="item" />
    </a-form-item>
    <a-form-item label="轮播图点赞数" name="bannerLattice">
      {{formState.bannerLattice}}
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {updateMethod} from "../../../components/form/method";
import {onMounted, reactive, ref, watch} from "vue";
import {BannerVo} from "../../../entity/menu/banner";
import {BaseUtil} from "../../../utils/base-util";
import {messageMethod} from "../../../utils/message-util";
import {QueryObjectType} from "../../../http/request-model";
import requestMethodBanner from "../../../api/menu/banner";

const props=defineProps<{id:string}>()
//使用操作页面的共用方法
const useUpdateMethod=updateMethod()
//表单提交对象
const formState=reactive<BannerVo>({
  //轮播图点赞数
  bannerLattice:'',
  //轮播图片
  bannerPic:'',
  //轮播图标题
  bannerTitle:'',
  //主键id
  id:'',
  //备注
  memo:'',
})
onMounted(async () => {
  await getDetailById()
})
async function onFinish(params: BannerVo) {
  const data = {
    ...(params as unknown as QueryObjectType),
    version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodBanner.update({ ...data, id: props.id })
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交新增表单
    const { message } = await requestMethodBanner.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}

const fileList = ref<string[]>([])
async function getDetailById() {
  if (props.id) {
    const { data } = await requestMethodBanner.getByBannerId(props.id)
    console.log(props.id)
    Object.assign(formState, data)
    fileList.value = formState.bannerPic.split(',').map(file => {
      return BaseUtil.getUploadPath(file)
    })
  }
}

</script>

<style scoped lang="scss">

</style>