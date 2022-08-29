<template>
    <div class="row flex-column">

        <form @submit.prevent="createEvent" id="event-form">
      <div class="col-12">Create Event</div>
            <div class="col-6">
              <label for="" class="form-label">Title</label>
              <input type="text" v-model="editable.name" class="form-control" name="title" id="title">
            </div>
            <div class="col-6">
              <label for="" class="form-label">Cover Image</label>
              <input type="url" v-model="editable.coverImg" class="form-control" name="title" id="title"
                aria-describedby="helpId" placeholder="">
            </div>
              <div class="col-6">
              <label for="" class="form-label">Location</label>
              <input type="text" v-model="editable.location" class="form-control" name="title" id="title"
                aria-describedby="helpId" placeholder="">
            </div>
              <div class="col-6">
              <label for="" class="form-label">Capacity</label>
              <input type="number" v-model="editable.capacity" class="form-control" name="title" id="title"
                aria-describedby="helpId" placeholder="">
            </div>
              <div class="col-6">
              <label for="" class="form-label">Start Date</label>
              <input type="date" v-model="editable.startDate" class="form-control" name="title" id="title"
                aria-describedby="helpId" placeholder="">
            </div>
            <div class="col-6">
              <label for="" class="form-label ">Category</label>
              <select v-model="editable.type" name="" id="" class="form-control">
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
              </select>
            </div>
              <div>
              <label for="" class="form-label">Description</label>
              <input type="text" v-model="editable.description" class="form-control" name="title" id="title"
                aria-describedby="helpId" placeholder="">
            </div>
            <button class="col-6 btn btn-success m-4">Submit</button>
        </form>
    </div>
</template>


<script>
import { ref } from "@vue/reactivity"
import { eventsService } from "../services/EventsService"
import Pop from "../utils/Pop"
import { onMounted, watchEffect } from '@vue/runtime-core'
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
import { logger } from "../utils/Logger"
export default {
    props: { event: { type: Object, required: false } },
    setup() {
        let editable = ref({})
        const router = useRouter()
        return {
            editable,
            async createEvent() {
                try {
                    let eventData = editable.value
                    let newEvent = await eventsService.createEvent(eventData)
                    logger.log('here is the new event', newEvent)
                    Pop.toast('Event listed', 'success')
                    Modal.getOrCreateInstance(document.getElementById('create-event')).hide()
                    
                    router.push({name: "EventDetails", params: {id: newEvent.id}})
                    editable.value = {}
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>