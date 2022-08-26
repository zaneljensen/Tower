import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class CommentService {
    async create(newComment) {
        const comment = await dbContext.Comments.create(newComment)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async getByEventId(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments

    }

    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        // @ts-ignore
        if (comment.creatorId != userId) {
            throw new BadRequest("You dont own this comment")
        }
        // @ts-ignore
        await comment.remove()
        return comment
    }
}




export const commentService = new CommentService()