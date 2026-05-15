import { ItemType } from "@/types"
import { FC, useState } from "react"

type FolderMappertype = {
  data: ItemType[],
  parentId?: string,
  selectedBlock?: string,
  setItem: (id: string ) => void
  handleSelectItem: (item: ItemType ) => void
}
export const FileFolderMapper: FC<FolderMappertype> = ({ data,handleSelectItem, selectedBlock, parentId, setItem }) => {
//   const [selectItem, setSelectItem] = useState<ItemType | null>(null)

//   console.log("selcteditem:",selectItem)
  // console.log("selctedparent::", selectParent)
  const handleSelect = (item: ItemType) => {

    handleSelectItem({...item})

    if (item.isFolder) {
      setItem(item.id)
      console.log("in if block:", item.id)
    } else {
      console.log("in else block:", item.id)
      if (parentId) {
        setItem(parentId)
      }
    }

  }



  return (
    <div>
      {
        data.map((item: ItemType, index: number) => (
          <div className={`py-1 pl-6 `} key={index}>
            <div onClick={() => handleSelect(item)}  className={`pl-6 ${( selectedBlock==item.id && item.isFolder)?"bg-green-400":""}`}>{item?.name}</div>
            {
              item?.children && <FileFolderMapper data={item.children} handleSelectItem={handleSelectItem} selectedBlock={selectedBlock} parentId={item.id} setItem={setItem} />
            }
          </div>

        ))
      }
    </div>
  )
}