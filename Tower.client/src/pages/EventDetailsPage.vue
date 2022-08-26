<template>
  <div class="container">
    <div class="row" v-if="event">
        <div class="col-12 text-center">
         <h4>{{event.name}}</h4>
         <img :src="event.coverImg" alt="">
        </div>
         <p>{{event.description}}</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router'
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
export default {
    setup() {
        const route = useRoute();
        async function getById(){
            try {
              await eventsService.getEventbyEventId(route.params.eventId);  
            } catch (error) {
              Pop.error(error); 
            }
        }
        onMounted(() => {
            getById();
        });
        return {
            event: computed(() => AppState.activeEvent)
        }
    }
}
</script>

<style>

</style>