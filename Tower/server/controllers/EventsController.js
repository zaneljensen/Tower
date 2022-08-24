import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";






export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.editEvent)

    }


    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const events = await eventsService.getAll()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const event = await eventsService.getById(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            let eventData = req.body.creatorId
            let event = await eventsService.editEvent(req.params.id, eventData)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

}