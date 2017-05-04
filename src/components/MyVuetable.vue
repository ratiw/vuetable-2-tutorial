<template>
  <vuetable ref="vuetable"
    api-url="https://vuetable.ratiw.net/api/users"
    :fields="['name', 'email', 'birthdate', 'address.line1', 'address.line2', 'address.zipcode']"
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
  components: {
    Vuetable
  }
}
</script>
