export const createId = (
  type: "file" | "fld",
  name: string
) => {
  const cleanName = name
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")

  const random = Math.random()
    .toString(36)
    .substring(2, 6)

  return `${type}_${cleanName}_${random}`
}
