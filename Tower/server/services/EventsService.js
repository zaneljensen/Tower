import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
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
    async editEvent(eventId, eventData) {
        let event = await this.getById(eventId)

        if (event.isCanceled) {
            throw new BadRequest("this event is cancled")
        }

        // event.creatorId = eventData.creatorId || event.creatorId
        event.name = eventData.name || event.name
        event.description = eventData.description || event.description
        event.coverImg = eventData.coverImg || event.coverImg
        event.location = eventData.location || event.location
        event.capacity = eventData.capacity || event.capacity
        event.startDate = eventData.startDate || event.startDate
        // event.isCanceled = eventData.isCanceled || eve
        event.type = eventData.type || event.type


        await event.save()
        return event
    }
    async archive(eventId, userId) {
        const event = await this.getById(eventId)
        if (event.creatorId != userId) {
            throw new Forbidden("You don't have permission to delete that")
        }
        event.isCanceled = true
        await event.save()
        return `event ${event.name} was archived`
    }
}

export const eventsService = new EventsService()