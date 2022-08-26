export class Event {
    constructor(data) {
        this.id = data.id || ''
        this.creatorId = data.creatorId || ''
        this.coverImg = data.coverImg || ''
        this.name = data.name || ''
        this.description = data.description || ''
        this.location = data.location || ''
        this.capacity = data.capacity || ''
        this.startDate = data.startDate || ''
        this.isCanceled = data.isCanceled || ''
        this.type = data.type || ''
    }
}
