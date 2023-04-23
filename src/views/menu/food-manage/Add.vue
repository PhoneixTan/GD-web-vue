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
    <a-form-item label="美食名称" name="foodName">
      <a-input v-model:value="formState.foodName" placeholder="请输入轮播图标题" allow-clear />
    </a-form-item>
    <a-form-item label="美食图片" name="foodPic">
      <a-upload
          v-model:file-list="fileList"
          :action="action"
          :headers="headers"
          list-type="picture-card"
          :max-count="9"
          accept="image/*"
          @change="uploadChange"
          @preview="handlePreview"
      >
        <div>
          <plus-outlined />
          <div style="margin-top: 8px">只能是图片</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item label="美食菜谱" name="foodIntroduce">
      <a-input v-model:value="formState.foodIntroduce" placeholder="请输入轮播图标题" allow-clear />
    </a-form-item>
    <a-form-item :wrapper-col="useUpdateMethod.formActionCol">
      <a-button html-type="submit" type="primary">确定</a-button>
      <a-button style="margin-left: 0.625rem" @click="useUpdateMethod.handleCancel()">取消</a-button>
    </a-form-item>
  </a-form>
  <a-modal :visible="preview.visible" :title="preview.title" :footer="null" @cancel="preview.visible = false" :z-index="9999">
    <img alt="example" style="width: 100%" :src="preview.image" />
  </a-modal>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import DrawerBaseInfo from '../../../components/drawer/DrawerBaseInfo.vue'
import requestMethodFood from '../../../api/menu/food'
import {updateMethod} from "../../../components/form/method";
import {UploadChangeParam, UploadFile} from "ant-design-vue";
import {useSystemStore} from "../../../store/system";
import {DictionaryListVo} from "../../../entity/system/dictionary-manage";
import {messageMethod} from "../../../utils/message-util";
import {QueryObjectType} from "../../../http/request-model";
import {ResultModel} from "../../../http/result-model";
import {BaseUtil} from "../../../utils/base-util";
import {LogFile} from "../../../entity/system-log/log-file";
import {uuid} from "../../../utils/common-util";
import {FoodVo} from "../../../entity/menu/food";


const props = defineProps<{
  id: string
}>()
//使用操作页面的共用方法
const useUpdateMethod = updateMethod()
//表单提交对象
const formState = reactive<FoodVo>({
  //美食菜谱
  foodIntroduce:'',
  //美食名称
  foodName:'',
  //美食图片
  foodPic:'',
  //主键id
  id:'',
  //备注
  memo:'',
})
//表单校验
//表单校验对象中对应的字段是根据a-form-item标签上的name属性，
//如果校验失败,请检查name属性有没有：name属性根据输入控件数据绑定的字段名称
const formRules = ref({
  foodName: [{ required: true, message: '当前项不能为空' }],
  foodPic: [{ required: true, message: '当前项不能为空' }],

})
//上传文件列表
const fileList = ref<Array<UploadFile>>([])
//上传文件地址
const action = import.meta.env.VITE_APP_API_OSS || '/api/logFile/upload'
//获取系统缓存
const systemStore = useSystemStore()
//上传文件请求头
const headers = reactive({
  authToken: systemStore.token,
  submitKey: BaseUtil.uuid()
})
onMounted(async () => {
  await getDetailById()
})
// /**
//  * 监听表单对象中的文件列表数据
//  */
// watch(
//     ()=>formState.activityCover,
//     () => {
//       const activityCovers=formState.activityCover ? formState.activityCover.split(','):[]
//       fileList.value=propsFile2FileList(activityCovers)
//       console.log(fileList.value)
//     },
//     { immediate: true, deep: true }
//  )

/**
 * 监听文件上传列表
 */
watch(
    fileList,
    () => {
      const doneFile = fileList.value.filter(value => value.status === 'done').map(value => value.response?.data)
      //formState.activityCover 保存图片地址的字段名称
      formState.foodPic = doneFile.map(value => value?.uploadPath).join(',')
      console.log(formState.foodPic)
    },
    { immediate: true }
)
function propsFile2FileList(fileList?: Array<LogFile>): Array<UploadFile> {
  if (fileList && fileList.length >= 0)
      //构建file list数据
    return fileList.map(value => {
      const uploadData = <UploadFile>{ uid: value.id, status: 'done' }
      uploadData.url = BaseUtil.getUploadPath(value?.uploadPath)
      uploadData.response = { data: value, code: '00000', message: '', t: '' }
      return uploadData
    })
  else return []
}

//预览上传的图片
interface PreviewProps {
  image?: string
  visible?: boolean
  title?: string
}
/*
 * 自定义图片预览
 * */
const preview = ref<PreviewProps>({})
async function handlePreview(file: UploadFile) {
  preview.value.image = file.url || BaseUtil.getUploadPath(file.response?.data?.uploadPath)
  preview.value.title = file.name || file.response?.data?.oldFileName || file.url?.substring(file.url?.lastIndexOf('/') + 1)
  preview.value.visible = !!preview.value.image && true

  if (!preview.value.image) {
    messageMethod.error('图片预览失败，请检查图片是否存在')
  }
}
//文件上传状态改变
//file 当前文件对象
//fileList 文件列表对象
function uploadChange({ file, fileList }: UploadChangeParam<UploadFile>) {
  console.log('当前操作的文件对象', file)
  console.log('当前的文件列表', fileList)
  switch (file.status) {
    case 'done':
      if (file.response?.data) {
        file.uid = file.response?.data.id || file.uid
        file.url = BaseUtil.getUploadPath(file.response?.data?.uploadPath)
      } else {
        file.status = 'error'
      }
      break
    case 'error':
      //更新错误，否则移上会显示html code
      file.error = ''
      file.response = <ResultModel<LogFile>>{ code: '' }
      break
  }
  console.log('文件上传列表', fileList)
}

/*
 * 表单提交并数据验证成功
 * */
async function onFinish(params:FoodVo) {
  const data = {
    ...(params as unknown as QueryObjectType),
    //version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodFood.update( { ...data,id:props.id})
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交表单
    const { message } = await requestMethodFood.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}
/*
 * 根据id查询信息
 * */
async function getDetailById() {
  if (props.id) {
    const { data } = await  requestMethodFood.getByFoodId(props.id)
    Object.assign(formState, data)
    //数据回显
    fileList.value = formState?.foodPic?.split(',').map((file, fileIndex) => {
      return {
        url: BaseUtil.getUploadPath(file),
        name: '',
        uid: 'file' + fileIndex,
        status: 'done',
        response: {
          data: {
            uploadPath: file
          }
        }
      }
    })
  }
}
</script>
<style scoped></style>
