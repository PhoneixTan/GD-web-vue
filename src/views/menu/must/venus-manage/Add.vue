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
    <a-form-item label="文化场馆名称" name="venuesName">
      <a-input v-model:value="formState.venuesName" placeholder="请输入文化场馆名称" allow-clear />
    </a-form-item>
    <a-form-item label="文化场馆地址" name="venuesAddress">
      <a-input v-model:value="formState.venuesAddress" placeholder="请输入文化场馆地址" allow-clear />
    </a-form-item>
    <a-form-item label="文化场馆描述" name="venuesEvaluate">
      <a-textarea v-model:value="formState.venuesEvaluate" placeholder="请输入景区地址" allow-clear />
    </a-form-item>
    <a-form-item label="文化场馆图片" name="venuesPic">
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
    <a-form-item label="入园高峰数量" name="venuesMaxpeak">
      <a-input v-model:value="formState.venuesMaxpeak" placeholder="请输入当前最大高峰" />
    </a-form-item>
    <a-form-item label="今日累计流量" name="venuesTotal">
      <a-input v-model:value="formState.venuesTotal" placeholder="请输入今日累计流量" />
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
import DrawerBaseInfo from '../../../../components/drawer/DrawerBaseInfo.vue'
import requestMethodVenus from '../../../../api/menu/must/venus'
import {updateMethod} from "../../../../components/form/method";
import {UploadChangeParam, UploadFile} from "ant-design-vue";
import {useSystemStore} from "../../../../store/system";
import {DictionaryListVo} from "../../../../entity/system/dictionary-manage";
import {messageMethod} from "../../../../utils/message-util";
import {QueryObjectType} from "../../../../http/request-model";
import {ResultModel} from "../../../../http/result-model";
import {BaseUtil} from "../../../../utils/base-util";
import {LogFile} from "../../../../entity/system-log/log-file";
import {uuid} from "../../../../utils/common-util";
import {VenusVo} from "../../../../entity/menu/must/venus";



const props = defineProps<{
  id: string
}>()
//使用操作页面的共用方法
const useUpdateMethod = updateMethod()
//表单提交对象
const formState = reactive<VenusVo>({
  //  主键id
  id:'',
  //备注
  memo:'',
  //  地址
  venuesAddress:'',
  //文化馆描述
  venuesEvaluate:'',
  // 文化馆介绍
  venuesIntroduce:'',
  //最大高峰
  venuesMaxpeak:'',
  // 标题
  venuesName:'',
  // 电话号码
  venuesPhone:'',
  //文化馆图片
  venuesPic:'',
  //累计
  venuesTotal:'',
})
//表单校验
//表单校验对象中对应的字段是根据a-form-item标签上的name属性，
//如果校验失败,请检查name属性有没有：name属性根据输入控件数据绑定的字段名称
const formRules = ref({
  venuesName: [{ required: true, message: '当前项不能为空' }],
  venuesAddress: [{ required: true, message: '当前项不能为空' }],
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
/**
 * 监听表单对象中的文件列表数据
 */
// watch(
//     ()=>formState.venuesPic,
//     () => {
//       const photos=formState.venuesPic ? formState.venuesPic.split(','):[]
//       fileList.value=propsFile2FileList(photos)
//       console.log(fileList.value)
//     },
//     { immediate: true, deep: true }
// )

/**
 * 监听文件上传列表
 */
watch(
    fileList,
    () => {
      const doneFile = fileList.value.filter(value => value.status === 'done').map(value => value.response?.data)
      //formState.activityCover 保存图片地址的字段名称
      formState.venuesPic = doneFile.map(value => value?.uploadPath).join(',')
      console.log(formState.venuesPic)
    },
    { immediate: true }
)
function propsFile2FileList(photos:string[]){
  if (photos && photos.length>=0)
      //构建file list数据
    return photos.map(value => {
      const uploadData=<UploadFile>{uid:uuid(),status:'done'}
      uploadData.url=BaseUtil.getUploadPath(value)
      uploadData.response={data:{uploadData:value},code:'00000',message:'',t:''}
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
async function onFinish(params: VenusVo) {
  const data = {
    ...(params as unknown as QueryObjectType),
    //version: formState.version || 0
  }
  if (props.id) {
    //提交编辑表单
    const { message } = await requestMethodVenus.update( { ...data,id:props.id})
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  } else {
    //提交表单
    const { message } = await requestMethodVenus.add(data)
    messageMethod.success(message)
    useUpdateMethod.handleSave()
  }
}
/*
 * 根据id查询信息
 * */
async function getDetailById() {
  if (props.id) {
    const { data } = await  requestMethodVenus.getByVenusId(props.id)
    Object.assign(formState, data)
    //数据回显
    fileList.value = formState?.venuesPic?.split(',').map((file, fileIndex) => {
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