# Displaying pagination information

In this lesson, we are going to add a component to display pagination information showing the number of records currently displaying and how many records are available.

Vuetable also comes with pagination information component called [`VuetablePaginationInfo`](https://github.com/ratiw/vuetable-2/blob/master/src/components/VuetablePaginationInfo.vue) out of the box. We can import and bind it via `onPaginationData()` event handler.

Let's see the code.

```vue
  // MyVuetable.vue

  <template>
    //...
    <vuetable ref="vuetable"
      //...
    ></vuetable>
    <div class="vuetable-pagination ui basic segment grid">
      <vuetable-pagination-info ref="paginationInfo"      // <----
      ></vuetable-pagination-info>

      <vuetable-pagination ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
    //...
  </template>

  <script>
  //...
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

  export default {
    components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo    // <----
    },
    data () {
      //...
    },
    methods: {
      //...
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)   // <----
      },
      //...
    }
  </script>
```

VuetablePaginationInfo also need to use the pagination information for display. In this case, we already have the handler for `vuetable:pagination-data` defined, so we can just add another line to `onPaginationData()`.

You should notice that we are now wrapping both VuetablePagination and VuetablePaginationInfo inside another `<div>`, so it's easier to style it using CSS.

And here's how it should look now.
    ![image](https://raw.githubusercontent.com/ratiw/images/master/vuetable-2-tutorial/08-1.png)

## Changing Information Text

As you can see the default information text is something like this:
```
Displaying 1 to 15 of 200 items
```

You can change how the information is displayed using the following template:
- `info-template` 
- `no-data-template`

See the wiki for [VuetablePaginationInfoMixin](https://github.com/ratiw/vuetable-2/wiki/VuetablePaginationInfoMixin#-info-template)

## Play with it

<vuep template="#lesson08"></vuep>

<script v-pre type="text/x-template" id="lesson08">
<template>
  <div>
    <vuetable ref="vuetable"
              api-url="https://vuetable.ratiw.net/api/users"
              :fields="fields"
              pagination-path=""
              @vuetable:pagination-data="onPaginationData"
              >
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
  export default {
  data () {
      return {
        fields: [
                'name', 'email',
                {
                  name: 'birthdate',
                  titleClass: 'center aligned',
                  dataClass: 'center aligned',
                  callback: 'formatDate|DD-MM-YYYY'
                },
                {
                  name: 'nickname',
                  callback: 'allcap'
                },
                {
                  name: 'gender',
                  titleClass: 'center aligned',
                  dataClass: 'center aligned',
                  callback: 'genderLabel'
                },
                {
                  name: 'salary',
                  titleClass: 'center aligned',
                  dataClass: 'right aligned',
                  callback: 'formatNumber'
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
        formatNumber (value) {
          return accounting.formatNumber(value, 2)
        },
        onPaginationData (paginationData) {
          this.$refs.pagination.setPaginationData(paginationData)
          this.$refs.paginationInfo.setPaginationData(paginationData)
        },
        onChangePage (page) {
          this.$refs.vuetable.changePage(page)
        }
        
     }
  }
</script>

</script>


[Source code for this lesson](https://github.com/ratiw/vuetable-2-tutorial/tree/lesson-8)
