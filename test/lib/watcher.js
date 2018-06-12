const DI = require('../../src/container')
const should = require('should')
const EventEmitter = require('events')

describe('watcher', function () {
  const container = DI.container
  const registerConstant = DI.helpers.registerConstantValue(container)

  beforeEach('setup', function () {
    // logger
    const Logger = {
      info (text, config) {
      },
      verbose (text, config) {
      }
    }
    DI.container.unbind(DI.DEPENDENCIES.Logger)
    registerConstant(DI.DEPENDENCIES.Logger, Logger)
  })

  afterEach('cleanup', function () {
    DI.resetConstants()
  })

  describe('happy path', function () {
    it('DI worked', function (done) {
      let startUpCheck = container.get(DI.FILETYPES.Watcher)
      should(startUpCheck).be.ok()
      should(startUpCheck).have.property('config')
      should(startUpCheck).have.property('logger')
      should(startUpCheck).have.property('chokidar')
      should(startUpCheck).have.property('moment')
      done()
    })

    it('call to watch() watches for file changes', function (done) {
      let Config = {
        watch: ['init.js, model/**.js']
      }
      container.unbind(DI.DEPENDENCIES.Config)
      registerConstant(DI.DEPENDENCIES.Config, Config)

      let Chokidar = {
        called: 0,
        params: [],
        watch (watchFor) {
          this.called += 1
          this.params = watchFor
          return new EventEmitter()
        }
      }
      container.unbind(DI.DEPENDENCIES.Chokidar)
      registerConstant(DI.DEPENDENCIES.Chokidar, Chokidar)

      let watcher = container.get(DI.FILETYPES.Watcher)
      watcher.watch()

      should(Chokidar).have.property('called')
      should(Chokidar.called).equals(1)
      should(Chokidar).have.property('params')
      should(Chokidar.params).deepEqual(Config.watch)
      done()
    })

    it('on file change will a new item be added to changedFiles Array', function (done) {
      let Config = {
        watch: ['init.js, model/**.js']
      }
      container.unbind(DI.DEPENDENCIES.Config)
      registerConstant(DI.DEPENDENCIES.Config, Config)

      let Chokidar = {
        emitter: new EventEmitter(),
        watch (watchFor) {
          return this.emitter
        },
        testEmit () {
          this.emitter.emit('all', 'add', 'domain.js')
        }
      }
      container.unbind(DI.DEPENDENCIES.Chokidar)
      registerConstant(DI.DEPENDENCIES.Chokidar, Chokidar)

      let watcher = container.get(DI.FILETYPES.Watcher)
      watcher.watch()

      Chokidar.testEmit()

      should(watcher).have.property('changedFiles')
      should(watcher.changedFiles.length).equals(1)
      should(watcher.changedFiles[0].event).equals('add')
      should(watcher.changedFiles[0].name).equals('domain.js')
      done()
    })

    it('return control after 10 seconds after the last file change occured', function (done) {
      const Moment = function () {
        return {
          unix () {
            return 1001
          }
        }
      }
      container.unbind(DI.DEPENDENCIES.Moment)
      registerConstant(DI.DEPENDENCIES.Moment, Moment)

      let newMoment = container.get(DI.DEPENDENCIES.Moment)
      console.log(newMoment().unix())

      let watcher = container.get(DI.FILETYPES.Watcher)

      watcher.changedFiles.push({
        event: 'add',
        name: 'test.js',
        time: 990
      })

      let result = watcher.shouldIWait()
      should(result).equals(false)
      done()
    })

    it.skip('no file changed - wait longer')
    it.skip('wait longer if last file change is shorter then 10 seconds ago')
  })

  describe('sad path', function () {
    it.skip('throws exception if watch() is not called before waitForFileChanges')
  })
})
