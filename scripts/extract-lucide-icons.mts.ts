import fs from "fs"
import path from "path"
import { iconNames } from "lucide-react/dynamic"

const outPath = path.resolve("src/components/lucide-icon-names.ts")

//bun run scripts/extract-lucide-icons.mts

async function main() {
  if (!Array.isArray(iconNames)) {
    throw new Error("lucide-react/dynamic::iconNames is not an array")
  }

  // Сортируем для стабильности
  const sorted = [...iconNames].sort()

  const content = `// AUTO-GENERATED FILE. Do not edit manually.
// Generated at: ${new Date().toISOString()}

export const lucideIconNames = ${JSON.stringify(sorted, null, 2)} as const;

export type LucideIconName = typeof lucideIconNames[number];
`

  fs.writeFileSync(outPath, content, "utf-8")
  console.log(`✅ Saved ${sorted.length} lucide icon names to ${outPath}`)
}

main().catch((err) => {
  console.error("❌ Failed to extract lucide icon names:", err)
  process.exit(1)
})