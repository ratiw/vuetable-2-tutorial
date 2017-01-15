
# 3) Cleaning up code

In the last lesson, we added more fields to be displayed using the `fields` prop. In the more complex data structure, there could be a lot more field to display. As you can see the `fields` prop could get quite lengthy.

We could make use of the `data` section of Vue to make it cleaner, like so.

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
        'address.line1', 'address.line2', 'address.zipcode'
      ]
    }
  }
}
</script>
```

Run the project again to see that everything is still working the same.
```shell
  $ yarn run dev
```

We should also remove the unused file that comes pre-install with vue-cli webpack template.
- Delete `src\components\Hello.vue`

[Source code for this lesson](https://github.com/ratiw/vuetable-2-tutorial/tree/lesson-3)
