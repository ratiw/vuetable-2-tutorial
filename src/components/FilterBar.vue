<template>
	<div class="filter-bar ui basic segment grid">
    <div class="ui form">
      <div class="inline field">
        <label>Search for:</label>
        <input type="text" class="three wide column" placeholder="name, nickname, or email">
        <button class="ui primary button" @click="doFilter">Go</button>
        <button class="ui button" @click="resetFilter">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    doFilter () {
      console.log('do filter')
    },
    resetFilter () {
      console.log('reset filter')
    }
  }
}
</script>