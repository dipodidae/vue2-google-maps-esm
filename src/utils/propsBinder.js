/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

const assert = require('node:assert')
const _ = require('lodash')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default (vueElement, googleMapsElement, props, options) => {
  options = options || {}
  const { afterModelChanged } = options
  _.forEach(props, ({ twoWay, type, trackProperties }, attribute) => {
    const setMethodName = `set${capitalizeFirstLetter(attribute)}`
    const getMethodName = `get${capitalizeFirstLetter(attribute)}`
    const eventName = `${attribute.toLowerCase()}_changed`
    const initialValue = vueElement[attribute]

    assert(googleMapsElement[setMethodName], `${setMethodName} is not a method of (the Maps object corresponding to) ${vueElement.$options._componentTag}`)

    // We need to avoid an endless
    // propChanged -> event emitted -> propChanged -> event emitted loop
    // although this may really be the user's responsibility
    let timesSet = 0
    if (type !== Object || !trackProperties) {
      // Track the object deeply
      vueElement.$watch(attribute, () => {
        const attributeValue = vueElement[attribute]

        timesSet++
        googleMapsElement[setMethodName](attributeValue)
        if (afterModelChanged) {
          afterModelChanged(attribute, attributeValue)
        }
      }, {
        immediate: typeof initialValue !== 'undefined',
        deep: type === Object,
      })
    }
    else if (type === Object && trackProperties) {
      // I can watch multiple properties, but the danger is that each of
      // them triggers the event handler multiple times
      // This ensures that the event handler will only be fired once
      let tick = 0; let expectedTick = 0

      const raiseExpectation = () => {
        expectedTick += 1
      }

      const updateTick = () => {
        tick = Math.max(expectedTick, tick + 1)
      }

      const respondToChange = () => {
        if (tick < expectedTick) {
          googleMapsElement[setMethodName](vueElement[attribute])

          if (afterModelChanged) {
            afterModelChanged(attribute, attributeValue)
          }

          updateTick()
        }
      }

      trackProperties.forEach((propName) => {
        // When any props change -- assume they change on the same tick
        vueElement.$watch(`${attribute}.${propName}`, () => {
          raiseExpectation()
          vueElement.$nextTick(respondToChange)
        }, {
          immediate: typeof initialValue !== 'undefined',
        })
      })
    }

    if (twoWay) {
      googleMapsElement.addListener(eventName, (ev) => {
        /* Check for type === Object because we're quite happy
          when primitive types change -- the change detection is cheap
        */
        if (type === Object && timesSet > 0) {
          timesSet--
        }
        else {
          vueElement.$emit(eventName, googleMapsElement[getMethodName]())
        }
      })
    }
  })
}
