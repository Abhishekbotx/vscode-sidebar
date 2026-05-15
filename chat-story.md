


[
  {
    "id": 1,
    "name": "public",
    "isFolder": true,
    "children": [
      {
        "id": 1,
        "name": "asset",
        "isFolder": true
      },
      {
        "id": 2,
        "name": "font.ts",
        "isFolder": false
      }
    ]
  },
  {
    "id": 2,
    "name": "package.json",
    "isFolder": false
  },
  {
    "id": 3,
    "name": "src",
    "isFolder": true,
    "children": [
      {
        "id": 1,
        "name": "app",
        "isFolder": true,
        "children":[
            {
                "id": 1,
                "name": "components",
                "isFolder": true,
                "children":[
                    {
                        "id": 1,
                        "name": "movielist.tsx",
                        "isFolder": false
                    }
                ]
            }
        ]
      },
      {
        "id": 2,
        "name": "font.ts",
        "isFolder": false
      }
    ]
  }
]

create unique id for all plz, id i will crete uniqu and random

[
  {
    "id": "fld_public_a1x9k",
    "name": "public",
    "isFolder": true,
    "children": [
      {
        "id": "fld_asset_b7m2p",
        "name": "asset",
        "isFolder": true
      },
      {
        "id": "file_font_public_c4n8q",
        "name": "font.ts",
        "isFolder": false
      }
    ]
  },
  {
    "id": "file_package_d2v6r",
    "name": "package.json",
    "isFolder": false
  },
  {
    "id": "fld_src_e9t1w",
    "name": "src",
    "isFolder": true,
    "children": [
      {
        "id": "fld_app_f3k7y",
        "name": "app",
        "isFolder": true,
        "children": [
          {
            "id": "fld_components_g5p2z",
            "name": "components",
            "isFolder": true,
            "children": [
              {
                "id": "file_movielist_h8q4x",
                "name": "movielist.tsx",
                "isFolder": false
              }
            ]
          }
        ]
      },
      {
        "id": "file_font_src_j1m9c",
        "name": "font.ts",
        "isFolder": false
      }
    ]
  }
]

i want to pass the prompt value, in it so i need to do with alert?

If you want dynamic unique IDs from user input (like a prompt/alert), then yes, you can use prompt() temporarily for learning/demo purposes.

Example:

const name = prompt("Enter file name")

const item = {
  id: crypto.randomUUID(),
  name,
  isFolder: false
}

console.log(item)
But in React apps, usually you should NOT use alert/prompt/confirm for real UI.

Better approach:

const [input, setInput] = useState("")

const createFile = () => {
  const newFile = {
    id: crypto.randomUUID(),
    name: input,
    isFolder: false
  }

  console.log(newFile)
}
And:

<input
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>

<button onClick={createFile}>
  Create
</button>
For IDs, best modern option:

crypto.randomUUID()
Example output:

"f47ac10b-58cc-4372-a567-0e02b2c3d479"
No need to manually create random IDs anymore.


ile_font_public_c3m8 create a function to create if like thi

const createId = (
  type: "file" | "fld",
  name: string
) => {
  const random = Math.random()
    .toString(36)
    .substring(2, 7)

  const formattedName = name
    .replace(/\.[^/.]+$/, "") // removes extension
    .replace(/\s+/g, "_")
    .toLowerCase()

  return `${type}_${formattedName}_${random}`
}
Usage:

console.log(createId("file", "font.ts"))
// file_font_k3m8x

console.log(createId("fld", "public"))
// fld_public_p9x2a
If you want exact style like:

file_font_public_c3m8
Then:

const createId = (
  type: "file" | "fld",
  name: string,
  parent?: string
) => {
  const random = Math.random()
    .toString(36)
    .substring(2, 6)

  const cleanName = name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()

  return `${type}_${cleanName}_${parent || "root"}_${random}`
}
Usage:

createId("file", "font.ts", "public")

// file_font_public_c3m8

"use client"import Image from "next/image";import Dsdata from "./ds.json"import { Dispatch, FC, ReactEventHandler, SetStateAction, useState } from "react";

const createId = (type: "file" | "fld",name: string) => {const cleanName = name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "")

const random = Math.random().toString(36).substring(2, 6)

return ${type}_${cleanName}_${random}}

type ItemType = {id: string,name: string,isFolder: boolean,children?: ItemType[]}

export default function Home() {const [data, setData] = useState<ItemType[]>(Dsdata)const [parentId, setParentId] = useState('')const setFunction = (items: ItemType[]) => {setData([...data,])}console.log('parentid:', parentId)const updateData = (scopedata: Pick<ItemType, "isFolder" | "name">, parentId: string) => {const newid = createId(scopedata.isFolder ? 'fld' : 'file', scopedata.name)console.log("scoperdata",scopedata)const newItem = {id: newid,name: scopedata.name,isFolder: scopedata.isFolder,children: []}console.log(newItem,"newitemm")

const findParent = (data: ItemType[], parentId: string):ItemType[] => {
    // const newItem = {
    // id: newid,
    // name: scopedata.name,
    // isFolder: scopedata.isFolder,
    // children: []
    // }
  console.log(newItem,"newitemm")
  console.log(finding matching parent id index,parent id: ${parentId})
  return data.map((item, index) => {
    console.log(finding matching parent id index: ${index})
    if (item.id === parentId) {
      // console.log(finding matching parent id index is found: ,item)
      // const modItem={...item}
      // const res = modItem.children?.push(newItem);
      // console.log("updated res::",res)
      return {
        ...item,
        children: [...(item.children || []), newItem]
      };
    }

    if (item?.children) {
      return {
        ...item,
        children: findParent((item.children || []), parentId)
      }
    }

    return item
  })
}

console.log('updatedparentblock:', findParent(data, parentId))
// const res= setData([
//     ...data,data.find((item,index)=>(

//         item.id===parentId && {
//           ...item,children:[
//             ...,newItem
//           ]
//       })
//     )


// ])
return setData(findParent)

}const [item, setItem] = useState<Pick<ItemType, 'name' | 'isFolder'>>({ name: '', isFolder: false })// const setItemFunc=( key: keyof Pick<ItemType, 'name' | 'isFolder'>,// input: string | boolean)=>{//   setItem({...item,[key]})// }console.log("itemm:", item)

const setItemFunc = (input: string, isFolder: boolean) => {setItem({// ...item, //itwas using old dataname: input, isFolder: isFolder})

updateData(item, parentId)

}

const handleSelctParent = (id: string) => {console.log(id comming: ${id})setParentId(id)}console.log("fulldata", data)return (<button onClick={() => {const folderName = prompt("Enter folder name")if (!folderName) returnsetItemFunc(folderName,true)}} className="bg-cyan-500 rounded-sm py-2 px-6 text-white hover hover border-black border ">New Folder<button onClick={() => {const fileName = prompt("Enter folder name")if (!fileName) returnsetItemFunc(fileName,false)}} className="bg-cyan-500 rounded-sm py-2 px-6 text-white hover  hover border-black border">New File);}

type FolderMappertype = {data: ItemType[],parentId?: string,setFunc?: () => void,setItem: (id: string) => void}export const FileFolderMapper: FC = ({ data, setFunc, parentId, setItem }) => {const [selectItem, setSelectItem] = useState<ItemType | null>(null)

// console.log("selcteditem:",selectItem)console.log("parent in foldermadder::", parentId)const handleSelect = (item: ItemType) => {setSelectItem({ ...item })

if (item.isFolder) {
  setItem(item.id)
  console.log("in if block:", item.id)
} else {
  console.log("in else block:", item.id)
  setItem(parentId)
}

}

// const addItem=({name,type,parentId})=>{//   setFunc({...data, {

//   }})// }



return ({data.map((item: ItemType, index: number) => (<div onClick={() => handleSelect(item)}>{item?.name}{item?.children && }

    ))
  }
</div>

)}

You have multiple syntax + logic issues together. Main issue is here:

updateData(item, parentId)
setItem() is async.

So this:

setItem({
  name: input,
  isFolder: isFolder
})

updateData(item, parentId)
still uses OLD item.

Do this instead:

const setItemFunc = (input: string, isFolder: boolean) => {
  const newItemData = {
    name: input,
    isFolder
  }

  setItem(newItemData)

  updateData(newItemData, parentId)
}
Another major mistake:

return setData(findParent)
Wrong.

You must CALL the function:

return setData(findParent(data, parentId))
Another syntax error:

return ${type}_${cleanName}_${random}
Should be:

return `${type}_${cleanName}_${random}`
Another syntax error:

console.log(id comming: ${id})
Should be:

console.log(`id comming: ${id}`)
This is broken too:

return ({
  data.map(...)
})
Should be:

return (
  <div>
    {data.map((item: ItemType, index: number) => (
      <div key={item.id} onClick={() => handleSelect(item)}>
        {item.name}

        {item.children && (
          <FileFolderMapper
            data={item.children}
            parentId={item.id}
            setItem={setItem}
          />
        )}
      </div>
    ))}
  </div>
)
Also this component typing is wrong:

export const FileFolderMapper: FC = (...)
You already created:

type FolderMappertype
Use it properly:

export const FileFolderMapper: FC<FolderMappertype> = ({
  data,
  setFunc,
  parentId,
  setItem
}) => {
Your recursion logic is mostly correct now. Biggest problems were:

async state misunderstanding

returning function instead of function result

JSX syntax broken

template literals broken

component typing missing

recursive render incomplete

You're actually close.


image(222).png

Pasted text(24).txt
Document

Your console output is showing this:

{
  id: 'file__335q',
  name: '',
  isFolder: false
}
Meaning your name is becoming empty.

Reason:

updateData(item, parentId)
item still contains OLD state because setItem() is async. 


So when this runs:

const setItemFunc = (input: string, isFolder: boolean) => {
  setItem({
    name: input,
    isFolder: isFolder
  })

  updateData(item, parentId)
}
item.name is still:

''
That's why generated ID becomes:

file__335q
instead of:

file_font_c3m8
Fix it like this:

const setItemFunc = (input: string, isFolder: boolean) => {
  const newItemData = {
    name: input,
    isFolder
  }

  setItem(newItemData)

  updateData(newItemData, parentId)
}
AND ALSO fix this:

return setData(findParent)
to:

return setData(findParent(data, parentId))
Because currently you're passing the function itself, not the updated array result.

After both fixes, output becomes correct:

file_font_c3m8
fld_components_k2q1
instead of:

file__335q

how could i miss that 😵‍💫😵‍💫

Because this is one of the most common React mistakes developers make when moving from “normal variables” thinking to “state lifecycle” thinking.

Your brain expected this:

setItem(newData)
updateData(item)
to behave like:

item = newData
updateData(item)
But React state updates are scheduled, not immediate.

So during that render cycle:

item
still points to previous state.

You actually debugged it correctly:

you logged data

checked recursion

verified parent mapping

verified insertion

verified IDs

The bug was hidden in timing/state flow, not recursion.

This kind of mistake usually happens when:

multiple moving parts exist

recursion is involved

nested updates exist

your attention shifts to tree logic instead of state timing

And honestly, your recursive tree update logic was harder than this bug.


type FolderMappertype = {
  data: ItemType[],
  parentId?: string,
  setFunc?: () => void,
  setItem: (id: string) => void
}
export const FileFolderMapper: FC<FolderMappertype> = ({ data, setFunc, parentId, setItem }) => {
  const [selectItem, setSelectItem] = useState<ItemType | null>(null)
  const[selectParent,setSelectedParent]=useState()

  console.log("selcteditem:",selectItem)
  console.log("selctedparent::", selectParent)
  const handleSelect = (item: ItemType) => {
    setSelectItem({ ...item })

    if (item.isFolder) {
      setItem(item.id)
      console.log("in if block:", item.id)
    } else {
      console.log("in else block:", item.id)
      setItem(parentId)
      setSelectedParent(parentId)
    }

  }



  return (
    <div>
      {
        data.map((item: ItemType, index: number) => (
          <div key={index} className={py-1 pl-6 ${((selectItem?.id===item.id && item.isFolder) || selectParent==item.id)?"bg-green-400":""}}>
            <div onClick={() => handleSelect(item)}>{item?.name}</div>
            {
              item?.children && <FileFolderMapper data={item.children} parentId={item.id} setItem={setItem} />
            }
          </div>

        ))
      }
    </div>
  )
}


plz check the issue in color, its getting selcted inefficiently

Issue is happening because every recursive FileFolderMapper has its OWN local state:

const [selectItem, setSelectItem] = useState(...)
const [selectParent, setSelectedParent] = useState(...)
So when you click deep child items:

parent mapper keeps old selected state

child mapper creates another selected state

multiple nodes stay highlighted

Your selection state is fragmented across recursive components.

Current problem:

Mapper 1 -> has selection
Mapper 2 -> has another selection
Mapper 3 -> has another selection
instead of ONE global selected node.

Correct approach:
Move selected state to parent (Home) and pass it down.

In Home:

const [selectedId, setSelectedId] = useState("")
Pass:

<FileFolderMapper
  data={data}
  parentId=""
  setItem={handleSelctParent}
  selectedId={selectedId}
  setSelectedId={setSelectedId}
/>
Update type:

type FolderMappertype = {
  data: ItemType[],
  parentId?: string,
  setFunc?: () => void,
  setItem: (id: string) => void,
  selectedId: string,
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
}
Remove these completely:

const [selectItem, setSelectItem]
const [selectParent, setSelectedParent]
Now:

const handleSelect = (item: ItemType) => {
  if (item.isFolder) {
    setItem(item.id)
    setSelectedId(item.id)
  } else {
    setItem(parentId || "")
    setSelectedId(item.id)
  }
}
Color condition becomes simple:

className={`py-1 pl-6 ${
  selectedId === item.id ? "bg-green-400" : ""
}`}
And pass recursively:

<FileFolderMapper
  data={item.children}
  parentId={item.id}
  setItem={setItem}
  selectedId={selectedId}
  setSelectedId={setSelectedId}
/>
Main conceptual issue:
Recursive components should NOT own duplicated UI selection state unless each subtree is intentionally isolated.

Selection is global UI state. So keep it at highest shared parent.


