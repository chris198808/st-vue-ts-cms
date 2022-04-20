import { ref } from 'vue'
import PageContent from '@/components/page-content'
export default function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // 向page-content页面发送搜索的数据
  const handleReset = () => {
    pageContentRef.value?.getPageDataLists()
  }
  const handleSearch = (queryParams: any) => {
    pageContentRef.value?.getPageDataLists(queryParams)
  }
  // tuple:元组类型，数组中每个元素都有自己指定的类型
  // const arr: [string, number, number] = ["chris", 18, 168]
  // return [pageContentRef, handleReset, handleSearch]
  return { pageContentRef, handleReset, handleSearch }
}
