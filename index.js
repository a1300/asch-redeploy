const config = require('config')
const path = require('path')
const watch = require('node-watch')
const deploy = require('./deploy')

// config
let executionDir = path.dirname(require.main.filename)

let defaultConfig = config.get('config')
config.executionDir = executionDir

console.log(executionDir)
console.log(defaultConfig)

watch(executionDir, { recursive: true }, function (evt, name) {
  console.log(name)
})


// deploy
let dep = new deploy(config)
dep.registerDapp()
