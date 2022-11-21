const fs = require('fs/promises')
const path = require('path')

const rootPath = path.join(__dirname, '..')
const validNetworks = [
  'mainnet',
  'goerli'
]

function parseArgv () {
  const args = {}
  let key
  for (const arg of process.argv) {
    if (arg.startsWith('--')) {
      key = arg.slice(2)
    } else if (key) {
      args[key] = arg
      key = null
    }
  }
  return args
}

async function ensureDir (dest) {
  try {
    await fs.mkdir(dest, { recursive: true })
  } catch (err) {
    // don't care
  }
}

async function copyRecursively (src, dest) {
  const dirents = await fs.readdir(src, { withFileTypes: true })
  await Promise.all(dirents.map(async (dirent) => {
    const { name } = dirent
    const fileSrc = path.join(src, name)
    const fileDest = path.join(dest, name)
    if (dirent.isDirectory()) {
      await ensureDir(fileDest)
      await copyRecursively(fileSrc, fileDest)
    } else {
      await fs.copyFile(fileSrc, fileDest)
    }
  }))
}

async function main () {
  const { network } = parseArgv()
  if (!validNetworks.includes(network)) {
    throw new Error(`Invalid network ${network}`)
  }
  await copyRecursively(path.join(rootPath, 'src-networks', network), path.join(rootPath, 'src'))
}

main().catch(console.error)
