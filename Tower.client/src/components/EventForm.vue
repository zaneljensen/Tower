<template>
   <!-- <div class="modal fade" id="create-event" tabindex="-1" role="dialog" aria-labelledby="modelTitleId"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-body"> -->
          <form @submit.prevent="handleSubmit" class="row bg-white text-dark p-4 elevation-2">
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
        <!-- </div> -->

      <!-- </div> -->
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { ref } from 'vue';
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
    setup() {
        const editable = ref({})
        return {
            editable,
            async handleSubmit() {
                try {
                    logger.log('creating event', editable.value)
                    await eventsService.createEvent(editable.value)
                    Pop.toast('Event Created!')
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }

}
</script>

<style>

</style>