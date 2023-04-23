import { BusinessPo } from '../common/base'

export interface LogFile extends BusinessPo {
	//文件备份状态(0默认，1待备份,2不备份,3已备份,4备份失败)
	backupStatus: 0 | 1 | 2 | 3 | 4
	//文件转换消息
	convertMessage: string
	//转换状态(0默认，1待转换,2不转换,3转换完成,4转换失败)
	convertStatus: 0 | 1 | 2 | 3 | 4
	//文件大小
	fileSize: number
	//文件类型、后缀
	fileType: string
	//新文件名
	newFileName: string
	//上传文件名称
	oldFileName: string
	//目标主机地址（oss不同文件服务器）
	targetHost: string
	//文件上传路径
	uploadPath: string
	[key: PropertyKey]: unknown
}
