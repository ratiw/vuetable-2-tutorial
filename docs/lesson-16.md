# Passing Props to MyVuetable - Part 2

In this lesson, we will start working on refactoring our `MyVuetable` component to accept properties and make it work as the same.

As a summary, here are the list of properties that we are going to make:
- api-url
- fields
- multi-sort
- sort-order
- append-params

If you are new to Prop, check out the documentation on Vue.js Guide [here](https://vuejs.org/v2/guide/components.html#Props).

## Changes in MyVuetable.vue

### Declaring Props

First, we need to define that our component accepts those properties. We are going to borrow the same property names from Vuetable in this case.

```javascript
// MyVuetable.vue

//...
export default {
  name: 'my-vuetable',
  components: {
    //...
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    sortOrder: {
      type: Array,
      default() {
        return []
      }
    },
    appendParams: {
      type: Object,
      default() {
        return {}
      }
    },
    detailRowComponent: {
      type: String
    }
  },
  //...
}
```

> Only the `api-url` and `fields` properties are required. So, we marked it with `required: true`.

### Modify template to use Props

Now, we modify the template to use our newly defined properties, like so.

```html
// MyVuetable.vue

  //...
  <vuetable ref="vuetable"
    :api-url="apiUrl"
    :fields="fields"
    pagination-path=""
    :per-page="10"
    :multi-sort="true"
    :sort-order="sortOrder"
    :append-params="appendParams"
    detail-row-component="detailRowComponent"
    //...
  ></vuetable>

```

> __Note__    
> The `per_page` has been changed from `20` to `10`.

### Clean up

We need to clean up the following as well:

Looking at the `data` section, you will see that all the variables in this section are no longer needed as they will be passed in via our properties instead, so we can remove all of them here.

But!! Before we do that, let's review and find its usage inside our `MyVuetable` component so that we do not miss out on anything. Everything seems fine, except for `moreParams` as we have some references in the `onFilterSet` and `onFilterReset` methods down below.

Since we are going to delete `moreParams` here and replace it with `appendParams` prop instead. That means we need to update these two methods to properly use our `appendParams` prop instead. Let's change `moreParams` to `appendParams` in these two methods.

```javascript
// MyVuetable.vue

  //...
    onFilterSet (filterText) {
      this.appendParams.filter = filterText
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    },
    onFilterReset () {
      delete this.appendParams.filter
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    }
  //...
```

Alright, if we haven't overlooked anything, we should be done here. 

- So, we can now delete all variables in the `data` section.

  ```javascript
  // MyVuetable.vue

    // you can even remove the data section itself
    data () {
      return {}
    },
    //...
  ```

- The `import` statements of `FieldDefs` and `DetailRow` are no longer needed here, so remove both of them. 

## Changes in App.vue

### Passing the Props 

Now we need to modify `App.vue`, so that all necessary data are declared and pass into `<my-vuetable>` via properties we've defined earlier. Here is what we need to do:
- Add `data` section and declare our variables
- Import `FieldDefs.js` in here 
- Import `Vue` and `DetailRow` and register `DetailRow` with `Vue.use` here
- Add prop to our App template

So, our `App.vue` should now looks like this:

```vue
// App.vue

<template>
  <div id="app">
    <img src="./assets/logo.png">
    <my-vuetable
      api-url="https://vuetable.ratiw.net/api/users"
      :fields="fields"
      :sort-order="sortOrder"
      :append-params="moreParams"
      detail-row-component="my-detail-row"
    ></my-vuetable>
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
```

Now, run the project and everything should still work exactly the same. The only difference is that we are now passing relevant properties from our `App` component down to our `MyVuetable` component. This should make it much more reusable.

However, there is one more thing that we still haven't look into which is the [scoped slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots) for our `actions` buttons which is still embedded inside our `MyVuetable`.

The scoped slots cannot be passed down like any other properties. We will deal with this in the next lesson.




