# Passing Scoped Slot to MyVuetable

In the last lesson, we have successfully create properties in our `MyVuetable` component allowing passing data in from the main component/instant. But the only remaining thing we are not able to do is the [scoped slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots).

Scoped slots has been newly introduced in Vue 2.1 and it is a very powerful concept when working with Vue.js. It offers a more convenient way of flexible content distribution. Before the introduction of scope slots, you would have to create another component for the job. 

## The Problem

As of the current release of Vue 2.3, there is still no way to pass the scoped slot down into the component via template. The only way possible is to implement the `render` function where you'll have access to `scopedSlots` data object. This will allow you to pass down the scoped slot into your component. But this means you will have to give up the template and render your component using the `render` function only.

This seems like a daunting task. Luckily, in our case, this is not that hard but you will need some background knowledge before proceeding. Read the following topic in Vue documentation first, then come back to continue with the tutorial. You don't need to understand everything though.
- [Scope slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots)
- [Render function](https://vuejs.org/v2/guide/render-function.html)


## Converting `<template>` to render function

It is possible to start making your component with `render` function from the beginning if your component is not so complex (e.g. does not have a complex html structure). But template is actually more natural and a lot easier to comprehend, especially if you're still new to making Vue component.

In fact, you don't really have to care or learn about `render` function until you really need to use it. Since we would like our users to be able to use scoped slots from our `MyVuetable` component and pass this down to Vuetable, we need to 
be able to access to `scopedSlots` data object which only available inside the `render` function.

### Reviewing the `<template>`

So, let's begin by reviewing the current template of our `MyVuetable`. This will help guide us on what we need to do.

```vue
<template>
  <div class="ui container">
    <filter-bar></filter-bar>
    <vuetable ref="vuetable"
      :api-url="apiUrl"
      :fields="fields"
      pagination-path=""
      :per-page="10"
      :multi-sort="true"
      :sort-order="sortOrder"
      :append-params="appendParams"
      detail-row-component="detailRowComponent"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:pagination-data="onPaginationData"
    >
      //... this used to be where scoped slot "actions" was ...
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
```

> Please note that the template above does not include the scoped slots "actions".
> As it should be passed down from the parent component, so it no longer needs to be there.

### **Looks quite intimidating, isn't it?**

__Fear Not!__ It's easier than you might think. There's a trick to that and we'll show you how.

### Digesting the Template

The `render` function is nothing more than mimicking the browser in rendering the HTML. So, if you look at the stardard HTML page, you would see layers of layers of HTML tags inside with the outermost layer is the `<html>` tag.

```html
<html>
  <head>
    <title></title>
  </head>
  <body>
    <div class="container">
      <div class="header">
        //...
      </div>
      <div class="content">
        //...
      </div>
      <div class="footer">
        //...
      </div>
    </div>
  </body>
</html>
```

The `render` function that you're going to write is exactly the same. You render from the outermost layer into the innermost one, step by step, passing the [`createElement` argument](https://vuejs.org/v2/guide/render-function.html#createElement-Arguments) (usually denoted with `h` for brevity) down to the inner layer, so that it can be used to render other stuff inside its block.

Let's digest our template down a bit and I'll explain why it is digestible to this.

```vue
<template>
  <div>
    <filter-bar></filter-bar>
    <vuetable></vuetable>
    <div>
      <vuetable-pagination-info></vuetable-pagination-info>
      <vuetable-pagination></vuetable-pagination>
    </div>
  </div>
</template>
```

### Look much better, isn't it?

After all, our component structure wasn't so complex. What makes it complex is the functionality inside that has been exposed through its properties and events. When we strip them down, what's left is the skeleton that we can comprehend.

That, however, doesn't mean that we do not need those attributes and directives we omit. We do, but we will deal with them one by one inside its own block.

Let's discuss each block and starting writing our `render` function.

## The "container" `<div>` block

Every Vue component must has exactly one root element, which in our case is the outermost `<div>` block. To be precise, the actual block looks like this. (We will leave out the `<template>` tag from now on.)

```html
  <div class="ui container">
    <filter-bar></filter-bar>
    <vuetable></vuetable>
    <div></div> <!-- pagination block -->
  </div>
```

- It has `ui` and `container` classes
- It contains __three__ children, which are
  - `<filter-bar>`
  - `<vuetable>`, and
  - pagination `<div>`

With this information, we can start writing our `render` function for the outermost layer. And here's what the `render` function looks like.

```javascript
  render (h) {
    return h(
      'div',  //.. first parameter,
      {},     //.. second parameter,
      []      //.. third parameter
    )
  },
```

> __Note__   
> The `render` function is not inside the `methods` section, it lives at the same level as the `props`, `data`, and `methods` section!

When you declare the `render` function, Vue will pass in the `createElement` argument as a parameter. Since we are going to use this argument very often, we should name it very short. And by convention, it usually names `h`.

The `createElement` argument (from now on will be referred to as `h`) is actually a function, so to use it you have to call it and supplies parameters to it and must return itself back to its parent so that the execution can be chained and handled properly by the main instance.

- The first parameter is the "tag" that you want to render out as HTML tag, in this case, a `div`.
- The second parameter _(optional)_ is the [Data Object](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) describing the characteristics of the element to be rendered.
- The third parameter _(optional)_ can be either a string that will be inside the element tag (e.g. `<title>Hello</title>`) _or_ an array of its children.

> __Note__   
> In this tutorial, we will always write its parameters in its own line, so that it is easier to notice.

Here is the complete `render` function of our outermost `div` block.

```javascript
  render (h) {
    return h(
      'div', 
      {
        class: { ui: true, container: true }
      },
      [
        h('filter-bar'),
        this.renderVuetable(h),
        this.renderPagination(h)
      ]
    )
  },
```

We specify that this `div` should have `ui` and `container` class inside the [Data Object](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) in the second parameter.

In the third parameter, we specify that this `div` block will contain __3__ children:
- the first one (`filter-bar`) does not have any attribute, so we just use `h` to render it out.
- the second one (`vuetable`) will contain quite a lot information, so we just delegate it to another method (`renderVuetable`) to do the rendering of its block and pass in the `h` for its use inside.
- the third one will also contain some attributes, so we will also delegate to another method (`renderPagination`) to render its own block as well.

Looks how we build the `render` function to follow our digested template. 

## The `<vuetable>` block

Now, let's look at the `<vuetable>` block and how the `renderVuetable` method will look like. Again, we should start by looking at the template of the `<vuetable>` block.

```html
  <vuetable ref="vuetable"
    :api-url="apiUrl"
    :fields="fields"
    pagination-path=""
    :per-page="10"
    :multi-sort="true"
    :sort-order="sortOrder"
    :append-params="appendParams"
    detail-row-component="detailRowComponent"
    @vuetable:cell-clicked="onCellClicked"
    @vuetable:pagination-data="onPaginationData"
  ></vuetable>
```

And here is `renderVuetable` function that we've converted from the template above. 

```javascript
  methods: {
    renderVuetable(h) {
      return h(
        'vuetable', 
        { 
          ref: 'vuetable',
          props: {
            apiUrl: this.apiUrl,
            fields: this.fields,
            paginationPath: "",
            perPage: 10,
            multiSort: true,
            sortOrder: this.sortOrder,
            appendParams: this.appendParams,
            detailRowComponent: this.detailRowComponent,
          },
          on: {
            'vuetable:cell-clicked': this.onCellClicked,
            'vuetable:pagination-data': this.onPaginationData,
          },
          scopedSlots: this.$vnode.data.scopedSlots
        }
      )
    },
    //...
```
The structure looks the same as in the main `render` function for the `div` block we did earlier. The main different is the Data Object describing this element contains so much more information. Let's break it down:

- The first parameter, we specify that we want to render `vuetable` tag
- The second parameter, the Data Object (you may need to re-read [this](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) again). If you trace back to the template, you should clearly see how it is converted to each key in the Data Object.
- The third parameter, the children of this element. In this case, we expect to have the `scopedSlots` pass down from the parent and refer to those scoped slots via `$vnode.data.scopedSlots`.

Now that we've seen the most complex block, the next one should be relatively easy.

## The "pagination" `<div>` block

Here is the template for the pagination block.

```html
  <div class="vuetable-pagination ui basic segment grid">
    <vuetable-pagination-info ref="paginationInfo"
    ></vuetable-pagination-info>
    <vuetable-pagination ref="pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
  </div>
```

And here is the render function for this block, `renderPagination`.

```javascript
  methods: {
    //..
    renderPagination(h) {
      return h(
        'div',
        { class: {'vuetable-pagination': true, 'ui': true, 'basic': true, 'segment': true, 'grid': true} },
        [
          h('vuetable-pagination-info', { ref: 'paginationInfo' }),
          h('vuetable-pagination', {
            ref: 'pagination',
            on: {
              'vuetable-pagination:change-page': this.onChangePage
            }
          })
        ]
      )
    },
    //...
```

The interesting one is the third parameter where we supply an array of its children.

In this case, each child is quite simple and does not have any children of its own, so we use `h` to render it in-place. No need to create another function for each of them. 

## There, you have it!

We have now completed converting the template to `render` function. So, you can now delete the whole `<template>` section from `MyVuetable.vue` file.

__But our task is not finish yet.__ 

Remember, we have left out the "actions" scoped slot from the template at the begining? Now, we need to move it into the `App.vue`. And as it needs to call `onAction` method, we also need to move `onAction` into `App.vue` as well.

And here is how the `App.vue` should look.
```vue
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
```

[Source code for this lesson](https://github.com/ratiw/vuetable-2-tutorial/tree/lesson-17)

