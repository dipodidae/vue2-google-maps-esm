import _ from 'lodash'
import Autocomplete from './components/autocomplete.vue'
import Circle from './components/circle'
import Cluster from './components/cluster'
import Marker from './components/marker'
import Polygon from './components/polygon'
import Polyline from './components/polyline'
import Rectangle from './components/rectangle'

import { load, loaded } from './manager.js'
// Vue component imports
import InfoWindow from './components/infoWindow.vue'
import Map from './components/map.vue'
import MapElementMixin from './components/mapElementMixin'
import PlaceInput from './components/placeInput.vue'

import StreetViewPanorama from './components/streetViewPanorama.vue'
import { DeferredReady } from './utils/deferredReady'
import MountableMixin from './utils/mountableMixin'

// export everything
export { Autocomplete, Circle, Cluster, InfoWindow, load, loaded, Map, MapElementMixin, Marker, MountableMixin, PlaceInput, Polygon, Polyline, Rectangle }

export function install(Vue, options) {
  options = _.defaults(options, {
    installComponents: true,
  })

  Vue.use(DeferredReady)

  const defaultResizeBus = new Vue()
  Vue.$gmapDefaultResizeBus = defaultResizeBus
  Vue.mixin({
    created() {
      this.$gmapDefaultResizeBus = defaultResizeBus
    },
  })

  if (options.load) {
    load(options.load)
  }

  if (options.installComponents) {
    Vue.component('GmapMap', Map)
    Vue.component('GmapMarker', Marker)
    Vue.component('GmapCluster', Cluster)
    Vue.component('GmapInfoWindow', InfoWindow)
    Vue.component('GmapPolyline', Polyline)
    Vue.component('GmapPolygon', Polygon)
    Vue.component('GmapCircle', Circle)
    Vue.component('GmapRectangle', Rectangle)
    Vue.component('GmapAutocomplete', Autocomplete)
    Vue.component('GmapPlaceInput', PlaceInput)
    Vue.component('GmapStreetViewPanorama', StreetViewPanorama)
  }
}
