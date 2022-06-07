import { registerSchema, messageSchema } from "../utils/validations.js"
import { ValidationError } from "../utils/errors.js"

export default (req, res, next) => {
    try {
        if (req.method === 'POST' && req.url == '/register') {
            const { error } = registerSchema.validate(req.body)
            if(error) throw error
        }

        if (req.method === 'POST' && req.url == '/messages') {
            const { error } = messageSchema.validate(req.body)
            if(error) throw error
        }


        return next();
    } catch (error) {
        return next(new ValidationError(400, error.message))
    }
}