<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id} }">
    <div class="bg-light border elevation-2 rounded selectable"> 
      <div class="p-3">
        <img class="img-fluid" :src="event.coverImg" alt="">
        <h4 class="text-center">{{event.name}}</h4> 
      </div>
    </div>
  </router-link>
</template>
    
    


<script>
export default {
    props: {
        event: { type: Object, required: true}
    },
    setup(props) {
        return {
            goTo() {
                router.push({ name: 'EventDetails', params: { eventId: props.event.id}})
            }
        }

    }

};
</script>

<style>

</style>