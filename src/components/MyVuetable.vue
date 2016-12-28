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
