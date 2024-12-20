import _ from 'lodash'

import eventBinder from '../utils/eventsBinder.js'
import getPropsValuesMixin from '../utils/getPropsValuesMixin.js'
import propsBinder from '../utils/propsBinder.js'
import MapElementMixin from './mapElementMixin'

const props = {
  bounds: {
    type: Object,
    twoWay: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    twoWay: false,
  },
}

const events = [
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'rightclick',
]

export default {
  mixins: [MapElementMixin, getPropsValuesMixin],
  props,

  render() {
    return ''
  },

  deferredReady() {
    const options = _.clone(this.getPropsValues())
    options.map = this.$map
    this.createRectangle(options)
  },

  methods: {
    createRectangle(options) {
      this.$rectangleObject = new google.maps.Rectangle(options)
      propsBinder(this, this.$rectangleObject, props)
      eventBinder(this, this.$rectangleObject, events)
    },

  },

  destroyed() {
    if (this.$rectangleObject) {
      this.$rectangleObject.setMap(null)
    }
  },
}
