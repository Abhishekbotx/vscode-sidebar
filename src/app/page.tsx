"use client"
import Image from "next/image";
import Dsdata from "./ds.json"
import {  useEffect, useState } from "react";
import { FileFolderMapper } from "./components/FileFolderMapper";
import { ItemType } from "@/types";
import { createId } from "@/utils/helper";


export default function Home() {
  const [data, setData] = useState<ItemType[]>(Dsdata)
  const [parentId, setParentId] = useState('')
  const [selectItem, setSelectItem] = useState<ItemType | null>(null)

  // console.log("selcteditem:", selectItem)
  const handleSelect = (item: ItemType) => {
    console.log(item)
    setSelectItem({ ...item })

  }
  // console.log('parentid:', parentId)
  const addData = (scopedata: Pick<ItemType, "isFolder" | "name">, parentId: string) => {
    const newid = createId(scopedata.isFolder ? 'fld' : 'file', scopedata.name)
    console.log("scoperdata", scopedata)
    const newItem = {
      id: newid,
      name: scopedata.name,
      isFolder: scopedata.isFolder,
      children: []
    }
    // console.log(newItem, "newitemm")

    const updatetree = (data: ItemType[], parentId: string): ItemType[] => {

      const updatedItems = [];
      for (const item of data) {
        // console.log(`finding matching parent id index: ${item.id}`)
        const alreadyExists = data.find(d => {
          return d.name === newItem.name && d.isFolder === newItem.isFolder
        })
        if (alreadyExists) {
          alert("this already exists")
          return data
        }
        if (!parentId) {
          return [...data, newItem]
        }
        if (item.id === parentId) {
          updatedItems.push({
            ...item,
            children: [...(item.children || []), newItem]
          })
          continue
        }

        if (item?.children) {
          updatedItems.push({
            ...item,
            children: updatetree((item.children || []), parentId)
          })
          continue
        }

        updatedItems.push(item)
      }


      return updatedItems
    }
    setData(updatetree(data, parentId))
    // console.log('updatedparentblock:', updatetree(data, parentId))


  }

   const updateData = (changedName:string , selectedId: string) => {

    const updatetree = (data: ItemType[], selectedId: string): ItemType[] => {

      const updatedItems = [];
      for (const item of data) {
        // console.log(`finding matching parent id index: ${item.id}`)
        const alreadyExists = data.find(d => {
          return d.name === changedName && d.isFolder === item.isFolder
        })
        if (alreadyExists) {
          alert("this already exists")
          return data
        }
        if (item.id === selectedId) {
          updatedItems.push({
            ...item,name:changedName
          })
          continue
        }

        if (item?.children) {
          updatedItems.push({
            ...item,
            children: updatetree((item.children || []), selectedId)
          })
          continue
        }

        updatedItems.push(item)
      }


      return updatedItems
    }
    setData(updatetree(data, selectedId))
    // console.log('updatedparentblock:', updatetree(data, selectedId))


  }

  const deleteData = (data:ItemType[], selectedId: string) => {

    const updatetree = (data: ItemType[], ): ItemType[] => {

    const updatedArr=data.filter((item)=>item.id!==selectedId)
    const res=updatedArr.map((item)=>(
      {...item,children:updatetree(item.children||[])}
    ))
    return res
    }
    setData(updatetree(data))
    // console.log('updatedparentblock:', updatetree(data))


  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F2') {
        console.log('user pressed f2')
        if(selectItem){
          const prompts =prompt("Rename item", selectItem.name)
          console.log("prompts:",prompts)
          if(prompts){
            updateData(prompts,selectItem?.id)
          }
        }
      }

      if(event.key === "Delete"){
        console.log('user pressed del')
        if(selectItem){
          deleteData(data,selectItem.id)
        }
      }
    }
    document.addEventListener(
        "keydown",
        handleKeyDown
      )

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
  }, [selectItem,updateData,])
  const [item, setItem] = useState<Pick<ItemType, 'name' | 'isFolder'>>({ name: '', isFolder: false })

  console.log("itemm:", item)

  const setItemFunc = (input: string, isFolder: boolean) => {
    const updatedItem = {
      name: input,
      isFolder: isFolder
    }
    setItem(updatedItem)

    addData(updatedItem, parentId)
  }

  const handleSelctParent = (id: string) => {
    console.log(`id comming: ${id}`)
    setParentId(id)
  }
  console.log("fulldata", data)
  return (
    <div className="flex flex-col gap-4 flex-1 items-center justify-center text-black bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-64 px-16 bg-white  sm:items-start">
        <div className="left-0 flex gap-2">
          <button onClick={() => {
            const folderName = prompt("enter folder name")
            if (!folderName) return
            setItemFunc(
              folderName,
              true
            )
          }} className="bg-cyan-500 rounded-sm py-2 px-6 text-white hover:cursor-pointer hover:bg-cyan-700 border-black border ">New Folder</button>
          <button onClick={() => {
            const fileName = prompt("enter file name")
            if (!fileName) return
            setItemFunc(
              fileName,
              false
            )
          }} className="bg-cyan-500 rounded-sm py-2 px-6 text-white hover:cursor-pointer  hover:bg-cyan-700 border-black border">New File</button>
        </div>
        <div className="top-0 pt-0">
          <FileFolderMapper data={data} handleSelectItem={handleSelect} selectedBlock={parentId} setItem={handleSelctParent} />
        </div>
      </main>
    </div>
  );
}



