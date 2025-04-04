<template>
  <component :is="currentComponent" :roomId="route.params.id" :index="route.query.index" />
</template>

<script>
import { useRoute } from 'vue-router';

import sifra_room from './subrooms/room_type_1.vue';



export default {
  setup() {
    const route = useRoute();

    const componentsMap = {
      sifra: sifra_room,
    };

    const currentComponent = componentsMap[route.params.type] || {
      template: '<div>Unknown subroom type: {{ route.params.type }}</div>',
    };

    return { currentComponent, route };
  }
};
</script>
