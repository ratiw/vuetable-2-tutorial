<template>
  <div id="app">
    <img src="./assets/logo.png">

    <my-vuetable
      api-url="https://vuetable.ratiw.net/api/users"
      :fields="fields"
      :sort-order="sortOrder"
      :append-params="moreParams"
      detail-row-component="my-detail-row"
    >
      <template slot="actions" scope="props">
        <div class="custom-actions">
          <button class="ui basic button"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <i class="zoom icon"></i>
          </button>
          <button class="ui basic button"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="edit icon"></i>
          </button>
          <button class="ui basic button"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="delete icon"></i>
          </button>
        </div>
      </template>
    </my-vuetable>
  </div>
</template>

<script>
import Vue from 'vue'
import FieldDefs from './components/FieldDefs.js'
import MyVuetable from './components/MyVuetable'
import DetailRow from './components/DetailRow'
Vue.component('my-detail-row', DetailRow)

export default {
  name: 'app',
  components: {
    MyVuetable
  },
  data () {
    return {
      fields: FieldDefs,
      sortOrder: [
        {
          field: 'email',
          sortField: 'email',
          direction: 'asc'
        }
      ],
      moreParams: {}
    }
  },  
  methods: {
    onAction (action, data, index) {
      console.log('slot action: ' + action, data.name, index)
    },    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
