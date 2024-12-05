<template>
  <UserForm :user-id="Number($route.params.id)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditUserPage',

  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
})
</script>
