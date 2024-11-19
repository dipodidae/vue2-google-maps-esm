<script src="./placeInputImpl.js">
</script>

<template>
  <label>
    <span v-text="label" />
    <input
      ref="input" type="text" :placeholder="placeholder"
      :class="className"
    >
  </label>
</template>
