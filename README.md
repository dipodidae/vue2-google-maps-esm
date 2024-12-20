# vue-google-maps

## Vue-2 port of vue-google-maps

This is the Vue 2.x port of vue-google-maps!

If you have used vue-google-maps with Vue 1.x before, refer to [Upgrading](UPGRADING.md).

## Installation

### With npm (Recommended)

```
npm install vue2-google-maps
```

In your project:

```js
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
```

### Nuxt.js projects

For Nuxt.js projects, please import VueGoogleMaps in the following manner:

```js
import * as VueGoogleMaps from 'vue2-google-maps'
```

This is required for successful server-side rendering.

### Manually

Just download `dist/vue-google-maps.js` file and include it from your HTML.
**_If you use this method, Vue 2.1.x is required_**.

[Example](http://xkjyeah.github.io/vue-google-maps/overlay.html).

### Basic usage / Documentation

See [API](API.md).

## Demos:

[Showcase with a lot of features](http://xkjyeah.github.io/vue-google-maps/)

## Brief

If you want to write google map this way :

```html
<gmap-map :center="{lat:10, lng:10}" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px"></gmap-map>
```

Or use the power of Vue.js within a google map like this:

```html
<template>
  <gmap-map :center="center" :zoom="7" style="width: 500px; height: 300px">
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
  /////////////////////////////////////////
  // New in 0.4.0
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'YOUR_API_TOKEN',
      v: 'OPTIONAL VERSION NUMBER',
      // libraries: 'places', //// If you need to use place input
    },
  })

  export default {
    data() {
      return {
        center: { lat: 10.0, lng: 10.0 },
        markers: [
          {
            position: { lat: 10.0, lng: 10.0 },
          },
          {
            position: { lat: 11.0, lng: 11.0 },
          },
        ],
      }
    },
  }
</script>
```

## Use with `vue-router` / components that change their visibility

If you are using `vue-router`, you may encounter the problem where
you see greyed-out areas because you haven't
[triggered a resize](http://stackoverflow.com/questions/13059034/how-to-use-google-maps-event-triggermap-resize)
on the map after its visibility has changed.

You have two options:

**_Option A_**

(Version 0.5.0) Run `Vue.$gmapDefaultResizeBus.$emit('resize')`.

For example, you can write the following to force all maps on your page
to re-render:

```js
const options = {
  watch: {
    $route(to, from) {
    // Call resizePreserveCenter() on all maps
      Vue.$gmapDefaultResizeBus.$emit('resize')
    }
  }
}
```

If you wish to be more selective about which maps receive the `resize`
event, you can define `resizeBus` individually on each map. (See API).
This will disconnect the map from `Vue.$gmapDefaultResizeBus`.

**_Option B_**

Call `vm.$refs.<YOUR_MAP_HERE>.resizePreserveCenter()` on every map
instance that you have

## Testing

There is a non-comprehensive test for the DeferredReady mixin.
More automated tests should be written to help new contributors.

Meanwhile, please test your changes against the suite of [examples](examples).

Improvements to the tests are welcome :)

#### Standalone / CDN

If you are not using any bundler, include `vue-google-maps/dist/vue-google-maps.js`
instead.
The library will be available in a global object called `VueGoogleMap`.
However you will need to include Vue and Lodash beforehand:

```html
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.6/vue.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.4/lodash.js"></script>
  <script src="dist/vue-google-maps.js"></script>
</head>
<body>
  <div id="root">
    <gmap-map
      style="width: 100%; height: 100%; position: absolute; left: 0; top: 0"
      :center="{lat: 1.38, lng: 103.8}"
      :zoom="12"
    >
    </gmap-map>
  </div>

  <script>
    Vue.use(VueGoogleMaps, {
      load: {
        key: 'YOUR_API_TOKEN',
        v: 'OPTIONAL VERSION NUMBER',
        // libraries: 'places', //// If you need to use place input
      },
    })

    new Vue({
      el: '#root',
    })
  </script>
</body>
```

#### Set your api key

To enable any `vue-google-maps` components you need to set your api token:

```javascript
Vue.use(VueGoogleMap, {
  load: {
    key: 'YOUR_API_TOKEN',
    v: '3.26', // Google Maps API version
    // libraries: 'places',   // If you want to use places input
  }
})
```

The parameters are passed in the query string to the Google Maps API, e.g. to set the [version](https://developers.google.com/maps/documentation/javascript/versions#version-rollover-and-version-types),
[libraries](https://developers.google.com/maps/documentation/javascript/libraries),
or for [localisation](https://developers.google.com/maps/documentation/javascript/basics).
