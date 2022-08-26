<template>
  <div>
    <div class="row bg-dark py-1 px-5 text-light">
 
      <div class="col-12">
        filter <i class="mdi mdi-filter"></i>
      </div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = ''">All</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'convention'">Convention</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'concert'">Concert</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'sport'">Sports</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'digital'">Digital</div>
    </div>
    
    
    <div class="masonry">
      <div class="container-fluid" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>
    
      
      
    

<script>
import { computed, onMounted, ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import EventForm from '../components/EventForm.vue';

export default {
    // name: 'Home'
    setup() {
        const filterTerm = ref('')
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                logger.error("Getting Events", error);
                Pop.error(error);
            }
        }
        onMounted(() => {
            getEvents();
        });
        return {
            filterTerm,
            events: computed(() => AppState.events.filter(e => filterTerm.value ? e.type == filterTerm.value : true))
        };
    },
    components: { EventCard, EventForm }
}
</script>

<style scoped lang="scss">
// .home{
//   display: grid;
//   height: 80vh;
//   place-content: center;
//   text-align: center;
//   user-select: none;
//   .home-card{
//     width: 50vw;
//     > img{
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       object-fit: contain;
//       object-position: center;
//     }
//   }
// }
.masonry {
  columns: 320px;
  column-gap: 1em;

  div {
    display: block;
    margin-bottom: 1em;
  }
}
</style>
