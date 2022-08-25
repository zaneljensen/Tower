import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"





class EventsService {
    async create(newEvent) {
        const event = await dbContext.Events.create(newEvent)
        await event.populate('creator', 'name picture')
        return event
    }
    async getAll() {
        const events = await dbContext.Events.find().sort({ createAt: -1 }).populate('creator', 'name picture')
        return events
    }
    async getById(id) {
        const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest('no event by that id')
        }
        return event
    }
    async editEvent(id, eventData) {
        let event = await this.getById(id)

        event.id = eventData.id || event.id
        event.creatorId = eventData.creatorId || event.creatorId
        event.name = eventData.name || event.name
        event.description = eventData.description || event.description
        event.coverImg = eventData.coverImg || event.coverImg
        event.location = eventData.location || event.location
        event.capacity = eventData.capacity || event.capacity
        event.startDate = eventData.startDate || event.startDate
        event.isCanceled = eventData.isCanceled || event.isCanceled
        event.type = eventData.type || event.type

        await event.save()
        return event
    }
}





export const eventsService = new EventsService()