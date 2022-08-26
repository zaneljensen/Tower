import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class EventsService {
    async getEvents() {
        const res = await api.get('api/events')
        logger.log('[getting events]', res.data)
        AppState.events = res.data.map(e => new Event(e))
    }

    async getEventbyEventId(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        AppState.activeEvent = res.data
    }

    async createEvent(eventData) {
        const res = await api.post('/api/events', eventData)
        AppState.events.unshift(new Event(res.data))
    }

}



export const eventsService = new EventsService()