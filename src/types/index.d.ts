export type ItemType = {
  id: string,
  name: string,
  isFolder: boolean,
  children?: ItemType[]
}