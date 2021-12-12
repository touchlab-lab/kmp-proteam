import * as core from '@actions/core'
import { promises as fs } from 'fs'

export async function registerbuild(milliseconds: number): Promise<string> {
  return new Promise(resolve => {
    if (isNaN(milliseconds)) {
      throw new Error('milliseconds not a number')
    }
    console.log("call async")
    transformPackageFile().then(() => resolve('done!'))
  })
}

async function transformPackageFile(){
  const fileData = await fs.readFile("Package.swift", "utf8")
  let tempFileName = `Package.swift.${Date.now()}`;
  await fs.writeFile(tempFileName, fileData)

  try {
    await fs.unlink("Package.swift.old")
  } catch(err) {
  }

  await fs.rename("Package.swift", "Package.swift.old")
  await fs.rename(tempFileName, "Package.swift")
}