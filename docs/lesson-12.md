# Adding Detail Row

Detail row is additional row hidden underneath each data row in the table. You can use it to reveal more data when needed instead of trying to display everything on a single row.

In this section, we will make a detail row component and add it to our Vuetable.

First, let's create `src\components\DetailRow.vue`

```vue
  // DetailRow.vue
  <template>
    <div @click="onClick">
      <div class="inline field">
        <label>Name: </label>
        <span>{{rowData.name}}</span>
      </div>
      <div class="inline field">
        <label>Email: </label>
        <span>{{rowData.email}}</span>
      </div>
      <div class="inline field">
        <label>Nickname: </label>
        <span>{{rowData.nickname}}</span>
      </div>
      <div class="inline field">
        <label>Birthdate: </label>
        <span>{{rowData.birthdate}}</span>
      </div>
      <div class="inline field">
        <label>Gender: </label>
        <span>{{rowData.gender}}</span>
      </div>
    </div>
  </template>

  <script>
  export default {
    props: {
      rowData: {
        type: Object,
        required: true
      },
      rowIndex: {
        type: Number
      }
    },
    methods: {
      onClick (event) {
        console.log('my-detail-row: on-click', event.target)
      }
    },
  }
  </script>
```

Now, you can tell Vuetable to use our detail row component via `detail-row-component` prop using the **name** you register the detail row component with Vue.

```javascript
  // MyVuetable.vue
  <template>
    //...
    <vuetable ref="vuetable"
      //...
      detail-row-component="my-detail-row"    // <--- specify the component
      @vuetable:cell-clicked="onCellClicked"  // <--- listen to event and bind to handler
      //...
    ></vuetable>
    //...
  </template>
  <script>
    //...
    import DetailRow from './DetailRow'

    Vue.component('my-detail-row', DetailRow)   // <--- register the component to Vue
    //...

  </script>
```

Notice that we also bind `@vuetable:cell-clicked` to the `onCellClicked` method. In this method, we will call `toggleDetailRow()` to actually toggle the display state of our detail row component. Here's the code.

```javascript
  // MyVuetable.vue

  //...
  export default {
    //...
    methods: {
      //...
      onCellClicked (data, field, event) {
        console.log('cellClicked: ', field.name)
        this.$refs.vuetable.toggleDetailRow(data.id)
      }
    }
  }
```

Please also note that we also pass the `id` of current data to `toggleDetailRow` so that Vuetable can keep track of each detail row state, just like what we did with `__checkbox`.

> By default, Vuetable uses `id` column to track the display state of each detail row. If your data does not have `id` column or you use different column, you have to tell Vuetable to use that column via `track-by` prop.

![image](https://raw.githubusercontent.com/ratiw/images/master/vuetable-2-tutorial/12-1.png)


## Play with it

<vuep template="#lesson12"></vuep>

<script v-pre type="text/x-template" id="lesson12">
<template>
  <div>
   <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfoTop"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="paginationTop"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
    <vuetable ref="vuetable"
              api-url="https://vuetable.ratiw.net/api/users"
              :fields="fields"
              :muti-sort="true"
              multi-sort-key="ctrl"
              :css="css"
              :sort-order="sortOrder"
              pagination-path=""
              :per-page="20"
              @vuetable:pagination-data="onPaginationData"
              detail-row-component="my-detail-row"
              @vuetable:cell-clicked="onCellClicked"
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
    </vuetable>
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfo"
      ></vuetable-pagination-info>

      <vuetable-pagination ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
    
    
  </div>
</template>

<script>
  Vue.use(Vuetable);
  Vue.component('my-detail-row',{
   template:`<div @click="onClick">
                   <div class="inline field">
                     <label>Name: </label>
                     <span>{{rowData.name}}</span>
                   </div>
                   <div class="inline field">
                     <label>Email: </label>
                     <span>{{rowData.email}}</span>
                   </div>
                   <div class="inline field">
                     <label>Nickname: </label>
                     <span>{{rowData.nickname}}</span>
                   </div>
                   <div class="inline field">
                     <label>Birthdate: </label>
                     <span>{{rowData.birthdate}}</span>
                   </div>
                   <div class="inline field">
                     <label>Gender: </label>
                     <span>{{rowData.gender}}</span>
                   </div>
                 </div>`,
      props: {
       rowData: {
         type: Object,
         required: true
       },
       rowIndex: {
         type: Number
       }
     },
     methods: {
       onClick (event) {
         console.log('my-detail-row: on-click', event.target)
       }
     }               
  })
  export default {
  data () {
      return {
        css: {
          ascendingIcon: 'angle up icon',
          descendingIcon: 'angle down icon'
        },
        sortOrder: [
          {
            field: 'email',
            sortField: 'email',
            direction: 'asc'
          }
        ],
        fields: [
                {
                  name: 'name',
                  sortField: 'name'
                },
                {
                  name: 'email',
                  sortField: 'email'
                },
                {
                  name: 'birthdate',
                  sortField: 'birthdate',
                  titleClass: 'center aligned',
                  dataClass: 'center aligned',
                  callback: 'formatDate|DD-MM-YYYY'
                },
                {
                  name: 'age',
                  sortField: 'birthdate', 
                  dataClass: 'center aligned'
                },
                {
                  name: 'nickname',
                  sortField: 'nickname',
                  callback: 'allcap'
                },
                {
                  name: 'gender',
                  sortField: 'gender',
                  titleClass: 'center aligned',
                  dataClass: 'center aligned',
                  callback: 'genderLabel'
                },
                {
                  name: '__slot:actions',
                  title: 'Actions',
                  titleClass: 'center aligned',
                  dataClass: 'center aligned'
                }
              ]
      }
    },
     methods: {
        allcap (value) {
          return value.toUpperCase()
        },
        genderLabel (value) {
          return value === 'M'
            ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
            : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>'
        },
        formatDate (value, fmt = 'D MMM YYYY') {
          return (value == null)
            ? ''
            : moment(value, 'YYYY-MM-DD').format(fmt)
        },
        onPaginationData (paginationData) {
          this.$refs.paginationTop.setPaginationData(paginationData)
          this.$refs.paginationInfoTop.setPaginationData(paginationData)
            
          this.$refs.pagination.setPaginationData(paginationData)
          this.$refs.paginationInfo.setPaginationData(paginationData)
        },
        onChangePage (page) {
          this.$refs.vuetable.changePage(page)
        },
        onAction (action, data, index) {
          alert('slot) action: ' + action, data.name, index)
        },
        onCellClicked (data, field, event) {
          console.log('cellClicked: ', field.name)
          this.$refs.vuetable.toggleDetailRow(data.id)
        }
        
     }
  }
</script>

</script>

[Source code for this lesson](https://github.com/ratiw/vuetable-2-tutorial/tree/lesson-12)
