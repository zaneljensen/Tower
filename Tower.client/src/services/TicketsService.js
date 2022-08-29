import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { eventsService } from "./EventsService"



class TicketsService {

    async getMyTickets() {
        const res = await api.get('account/tickets')
        logger.log(res.data)
        AppState.myTickets = res.data
    }
    async getEventTickets(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('tickets', res.data)
        AppState.tickets = res.data
    }

    async createTicket(ticketData) {
        const res = await api.post('api/tickets', ticketData)
        logger.log(res.data)
        AppState.tickets.push(res.data)
        await eventsService.getEvents()
    }
    async deleteTicket(eventId) {
        let ticket = AppState.myTickets.find(t => t.eventId == eventId)
        const res = await api.delete(`api/tickets/${ticket.id}`)
        logger.log(res.data)
        AppState.eventsAttending.filter(e => e.id != eventId)

        await this.getMyTickets();
        await eventsService.getEventsForMyTickets();

    }


}

export const ticketsService = new TicketsService