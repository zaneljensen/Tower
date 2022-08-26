import { Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class TicketsService {
    async create(newTicket) {
        const ticket = await dbContext.Tickets.create(newTicket)
        await ticket.populate('event')
        await ticket.populate('profile', 'name picture')
        let event = await dbContext.Events.findById(ticket.eventId)
        // @ts-ignore
        event.capacity--
        // @ts-ignore
        await event.save()
        return ticket
    }

    async getByAccountId(accountId) {
        let tickets = await dbContext.Tickets.find({ accountId: accountId }).populate('event')
        return tickets
    }

    async getTicketsByEvent(eventId) {
        let tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'picture name')
        return tickets
    }

    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (ticket.accountId != userId)
            throw new Forbidden('You cannot delete this ticket')
        await ticket.save()
        return ticket
    }
}



export const ticketsService = new TicketsService()