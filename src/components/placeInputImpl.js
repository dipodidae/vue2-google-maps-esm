import assert from 'node:assert'
import _ from 'lodash'
import {
  loaded,
} from '../manager.js'
import getPropsValuesMixin from '../utils/getPropsValuesMixin.js'
import propsBinder from '../utils/propsBinder.js'
import downArrowSimulator from '../utils/simulateArrowDown.js'

const props = {
  bounds: {
    type: Object,
  },
  defaultPlace: {
    type: String,
    default: '',
  },
  componentRestrictions: {
    type: Object,
    default: null,
  },
  types: {
    type: Array,
    default() {
      return []
    },
  },
  placeholder: {
    required: false,
    type: String,
  },
  className: {
    required: false,
    type: String,
  },
  label: {
    required: false,
    type: String,
    default: null,
  },
  selectFirstOnEnter: {
    require: false,
    type: Boolean,
    default: false,
  },
}

export default {
  mixins: [getPropsValuesMixin],

  mounted() {
    const input = this.$refs.input

    // Allow default place to be set
    input.value = this.defaultPlace
    this.$watch('defaultPlace', () => {
      input.value = this.defaultPlace
    })

    loaded.then(() => {
      const options = _.clone(this.getPropsValues())
      if (this.selectFirstOnEnter) {
        downArrowSimulator(this.$refs.input)
      }

      assert(typeof (google.maps.places.Autocomplete) === 'function', 'google.maps.places.Autocomplete is undefined. Did you add \'places\' to libraries when loading Google Maps?')

      this.autoCompleter = new google.maps.places.Autocomplete(this.$refs.input, options)
      propsBinder(this, this.autoCompleter, _.omit(props, ['placeholder', 'place', 'selectFirstOnEnter', 'defaultPlace', 'className', 'label']))

      this.autoCompleter.addListener('place_changed', () => {
        this.$emit('place_changed', this.autoCompleter.getPlace())
      })
    })
  },
  created() {
    console.warn('The PlaceInput class is deprecated! Please consider using the Autocomplete input instead')
  },
  props,
}
