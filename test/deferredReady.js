import { expect } from 'code'
import { jsdom } from 'jsdom'
import Lab from 'lab'
import { DeferredReadyMixin } from '../src/deferredReady'

export var lab = Lab.script()

global.document = jsdom('')
global.window = document.defaultView

const VueRoot = require('vue/dist/vue')

function JSDom(src) {
  return new Promise((resolve, reject) => {
    jsdom.env(src, [], (err, window) => {
      if (err)
        return reject(err)

      resolve(window)
    })
  })
}

lab.experiment('Deferred Ready', () => {
  let Vue

  lab.beforeEach(async () => {
    document.body.innerHTML = ''
    document.body.innerHTML = '<div id="root"></div>'

    Vue = VueRoot.extend({})
  })

  lab.test('Hook is executed', async () => {
    await new Promise((resolve, reject) => {
      window.document.getElementById('root').innerHTML = `
      <dr-comp></dr-comp>
      `

      Vue.component('drComp', {
        template: '<span>Test</span>',
        mixins: [DeferredReadyMixin],
        deferredReady() {
          resolve()
        },
      })

      const vue = new Vue({
        el: window.document.getElementById('root'),
      })
    })
  })

  lab.test('Hook is executed in order', async () => {
    await new Promise((resolve, reject) => {
      window.document.getElementById('root').innerHTML = `
      <parent-comp></parent-comp>
      `

      let flag = false

      function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

      const childComp = Vue.component('childComp', {
        template: '<span>Test</span>',
        mixins: [DeferredReadyMixin],
        deferredReady() {
          try {
            expect(flag).true()
            resolve()
          }
          catch (err) {
            reject(err)
          }
        },
      })

      Vue.component('parentComp', {
        components: {
          childComp,
        },
        template: '<child-comp></child-comp>',
        mixins: [DeferredReadyMixin],
        async deferredReady() {
          await delay(500)
          flag = true
        },
      })

      const vue = new Vue({
        el: window.document.getElementById('root'),
      })
    })
  })

  lab.test('No ancestor, hook is still executed', async () => {
    await new Promise((resolve, reject) => {
      window.document.getElementById('root').innerHTML = `
      <parent-comp></parent-comp>
      `

      let flag = false

      function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

      const childComp = Vue.component('childComp', {
        template: '<span>Test</span>',
        mixins: [DeferredReadyMixin],
        deferredReady() {
          try {
            expect(flag).false()
            resolve()
          }
          catch (err) {
            reject(err)
          }
        },
      })

      Vue.component('parentComp', {
        components: {
          childComp,
        },
        template: '<child-comp></child-comp>',
        async deferredReady() {
          await delay(500)
          flag = true
        },
      })

      const vue = new Vue({
        el: window.document.getElementById('root'),
      })
    })
  })
})
