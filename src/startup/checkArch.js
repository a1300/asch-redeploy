const Promise = require('bluebird')
const IsAdmin = require('is-admin')

let CheckArch = function () {
  this.check = () => {
    return new Promise((resolve, reject) => {
      if (process.platform === 'linux') {
        resolve(true)
      } else if (process.platform === 'win32') {
        IsAdmin().then((result) => {
          if (result === true) {
            resolve(true)
          } else {
            reject(new Error('asch-redeploy must be called with admin privileges on windows. Be sure start your cmd windows as admin.'))
          }
        })
      } else {
        reject(new Error('only_linux_and_windows: This program can currently run only on linux'))
      }
    })
  }
}

module.exports = CheckArch
