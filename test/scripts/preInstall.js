#!/usr/bin/env node

const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const execWithPromise = promisify(exec)

const install = (path, shell) => {
  fs.stat(path, async err => {
    if (err) {
      const { stdout } = await execWithPromise(shell)
      console.log(stdout)
    }
  })
}

const preInstall = async () => {
  install('./packages/yk-cli/node_modules', 'cd ./packages/yk-cli && npm i --registry=https://registry.npm.taobao.org && pwd && npm run build')
  install('./example/ssr-with-js/node_modules', 'cd ./example/ssr-with-js && npm i --registry=https://registry.npm.taobao.org')
}

preInstall().catch(err => {
  console.log('err', err)
  process.exit()
})
