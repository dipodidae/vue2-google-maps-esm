<script src="./streetViewPanoramaImpl.js">
</script>

<template>
  <div class="vue-street-view-pano-container">
    <div ref="vue-street-view-pano" class="vue-street-view-pano" />
    <slot />
  </div>
</template>

<style lang="css">
.vue-street-view-pano-container {
  position: relative;
}

.vue-street-view-pano-container .vue-street-view-pano {
  left: 0; right: 0; top: 0; bottom: 0;
  position: absolute;
}
</style>
