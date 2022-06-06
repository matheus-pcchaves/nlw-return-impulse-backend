import express from 'express'
import { SubmitFeedbackController } from './controllers/submit-feedback-controller' 

export const routes = express.Router()

routes.post('/feedbacks', SubmitFeedbackController.handle)