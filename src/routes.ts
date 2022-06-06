import express from 'express'
import { SubmitFeedbackController } from './controllers/submit-feedback-controller' 

export const routes = express.Router()

const submitFeedbackController = new SubmitFeedbackController()

routes.post('/feedbacks', submitFeedbackController.handle)