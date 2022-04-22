import STAxios from '@/server'
import { IDataType } from '../../types'

export function getGoodsCategoryCount(url: string) {
  return STAxios.get<IDataType>({ url: url })
}
export function getGoodsCategorySale(url: string) {
  return STAxios.get<IDataType>({ url: url })
}
export function getGoodsAddressSale(url: string) {
  return STAxios.get<IDataType>({ url: url })
}
export function getGoodsCategoryFavor(url: string) {
  return STAxios.get<IDataType>({ url: url })
}
