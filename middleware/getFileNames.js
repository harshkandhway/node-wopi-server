'use strict'
const { join, parse, extname } = require('path')
const { readdir } = require('fs/promises')
const wopiStorageFolder = process.env.WOPI_STORAGE.split('/')

module.exports = async (req, res, next) => {
  const folderPath = join(parse(process.cwd()).root, ...wopiStorageFolder)
  try {
    const files = (await readdir(folderPath)).sort()

    res.send({
      files: files.map((f, i) => {
        const ext = extname(f)
        return { id: i, name: f, ext: ext.startsWith('.') ? ext.replace('.', '') : ext }
      }),
      wopiServer: process.env.WOPI_SERVER,
    })
  } catch (error) {
    return res.sendStatus(404)
  }
}
