import * as core from '@actions/core'
import { promises as fs } from 'fs'

export async function registerbuild(milliseconds: number): Promise<string> {
  return new Promise(resolve => {
    if (isNaN(milliseconds)) {
      throw new Error('milliseconds not a number')
    }
    console.log("go load files")
    fs.readdir(".").then((files)=>{
      files.forEach(s => console.log(`file: ${s}`))
    })

    fs.readFile("Package.swift", "utf8").then((fileData) => {
      fileData.split("\n").forEach(str => console.log(`astr: ${str}`))
    })

    setTimeout(() => resolve('done!'), milliseconds)
  })
}
