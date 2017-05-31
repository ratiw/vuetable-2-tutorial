# Column alignment

Let's make some adjustments to the `MyVuetable.vue` by removing and adding some fields.

- remove following fields: `address.line1`, `address.line2`, and `address.zipcode`
- then, add these fields:  `nickname`, `gender`, and `salary`

Your code should look like this

```vue
// MyVuetable.vue

<template>
  <vuetable ref="vuetable"
    api-url="https://vuetable.ratiw.net/api/users"
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
        'name', 'email',
        {
          name: 'birthdate',
        },
        {
          name: 'nickname',
        },
        {
          name: 'gender',
        },
        {
          name: 'salary',
        }
      ]
    }
  }
}
</script>
```

Now, you can specify the appropriate CSS class for column alignment.

- Sementic UI
    - class="left aligned"
    - class="center aligned"
    - class="right aligned"
    
- Bootstrap 3
    - class="text-left"
    - class="text-center"
    - class="text-right"

`titleClass` option is used to specify the alignment of the field title.

`dataClass` option is used to specify the alignment of the field data.

We will add these options to `birthdate`, `gender`, and `salary` fields.

```vue
// MyVuetable.vue

<template>
  <vuetable ref="vuetable"
    api-url="https://vuetable.ratiw.net/api/users"
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
        'name', 'email',
        {
          name: 'birthdate',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        },
        {
          name: 'nickname',
        },
        {
          name: 'gender',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        },
        {
          name: 'salary',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        }
      ]
    }
  }
}
</script>
```

Run the project and you should see this

![image](https://raw.githubusercontent.com/ratiw/images/master/vuetable-2-tutorial/05-1.png)

## Play with it

<vuep template="#lesson05"></vuep>

<script v-pre type="text/x-template" id="lesson05">
<template>
    <vuetable ref="vuetable"
          api-url="https://vuetable.ratiw.net/api/users"
          :fields="fields">
    </vuetable>
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
                  dataClass: 'center aligned'
                },
                {
                  name: 'nickname',
                },
                {
                  name: 'gender',
                  titleClass: 'center aligned',
                  dataClass: 'center aligned'
                },
                {
                  name: 'salary',
                  titleClass: 'center aligned',
                  dataClass: 'right aligned'
                }
              ]
      }
    }
  }
</script>

</script>

[Source code for this lesson](https://github.com/ratiw/vuetable-2-tutorial/tree/lesson-5)
