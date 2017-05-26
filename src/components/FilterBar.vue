<template>
  <div class="filter-bar">
    <form class="form-inline">
        <label>Search for:</label>
        <input type="text" v-model="filterText" class="form-control" @keyup.enter.prevent="doFilter" placeholder="name, nickname, or email">
        <button class="btn btn-primary btn-sm" @click.prevent="doFilter">Go</button>
        <button class="btn btn-default btn-sm" @click.prevent="resetFilter">Reset</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterText: ''
    }
  },
  methods: {
    doFilter () {
      this.$events.fire('filter-set', this.filterText)
    },
    resetFilter () {
      this.filterText = ''
      this.$events.fire('filter-reset')
    }
  }
}
</script>