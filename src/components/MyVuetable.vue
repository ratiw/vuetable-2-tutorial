<template>
  <vuetable ref="vuetable"
<<<<<<< HEAD
    api-url="https://vuetable.ratiw.net/api/users"
    :fields="fields"
=======
    api-url="http://vuetable.ratiw.net/api/users"
    :fields="['name', 'email', 'birthdate', 'address.line1', 'address.line2', 'address.zipcode']"
>>>>>>> lesson-2
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
