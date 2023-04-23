import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],//需要用到的插件数组
  resolve: {
    alias:{//配置文件系统路径别名
      '@':path.resolve('./src'),
      '~@':path.resolve('./src')
    }
  },
  server: {
    host:'0.0.0.0', //ip地址，
    port:3001,//服务端口号
    cors:true,//允许跨域
    proxy: {//配置自定义代理规则
      '/api':{//将所有带有/api的代理制定为所配置的目标代理地址
        target:'http://localhost:9032',
        changeOrigin:true,
        ws:true,
        //地址重写https://mp.weixin.qq.com/api/getUserInfo
        rewrite:path=>path.replace(/^\/api/, '/')
      }
    }
  },
  css:{
    //指定传递给css的预处理
    preprocessorOptions:{
      less:{
        javascriptEnabled:true
      }
    }
  }

})