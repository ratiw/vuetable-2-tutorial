# 4) Make change to field title

By default, vuetable uses the field name as column title in the table header. But we could easily change it to whatever we want. 

Let's look at how we can change the titles for address related columns.

```vue
// MyVuetable.vue

<template>
  <vuetable ref="vuetable"
    api-url="http://vuetable.ratiw.net/api/users"
    :fields="fields"
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
      fields: [
        'name', 'email', 'birthdate',
        {
          name: 'address.line1',
          title: 'Address 1'
        },
        {
          name: 'address.line2',
          title: 'Address 2'
        },
        {
          name: 'address.zipcode',
          title: 'Zipcode'
        }
      ]
    }
  }
}
</script>
```

The `fields` prop will internally get converted by Vuetable to an array of **field definition object**.

Each field definition object contains other options that will allow Vuetable to do much more. In this lesson, we only use `title` option to change the column title.

As you can see, we can mix `string` and `object` in the field definition. Those `string` will be used as `name` option of field definition when they are converted to object.

Later, we will learn about other options of field definition object that could combine those address into one column or hide it until it's needed to be displayed.

[Source code for this lesson](https://github.com/ratiw/vuetable-2-tutorial/tree/lesson-4)
