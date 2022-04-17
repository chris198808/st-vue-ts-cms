import { App } from 'vue'
import { formatUTCDate } from '@/utils/formateDate'

export default {
  install: (app: App) => {
    // format: string = 'YYYY-MM-DD HH:mm:ss' 给参数设置默认值
    // 在项目其他位置直接通过 $filter.formateUtc() 调用
    app.config.globalProperties.$filter = {
      formateUtc(date: string, format?: string) {
        return formatUTCDate(date, format)
      }
    }
  }
}
