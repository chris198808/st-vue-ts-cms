import { ref } from 'vue'
import PageModal from '@/components/page-modal'
type cellBackFn = () => void
function usePageModal(createFn?: cellBackFn, updateFn?: cellBackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInit: any = ref({})
  const handleCreate = () => {
    defaultInit.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    // 单独控制某些字段的显示和隐藏
    createFn && createFn()
  }
  const handleEdit = (item: any) => {
    // 将拿到的某行数据，赋值到defaultInie
    defaultInit.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    updateFn && updateFn()
  }

  return [pageModalRef, defaultInit, handleCreate, handleEdit]
}
export default usePageModal
