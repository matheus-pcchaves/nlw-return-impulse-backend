import express from 'express'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUsecase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

routes.post('/feedbacks', async(req, res) =>{
    const { type, comment, screenshot} = req.body
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const submitFeedbackUsecase = new SubmitFeedbackUsecase(
        prismaFeedbackRepository,
        nodemailerMailAdapter
    )  

    await submitFeedbackUsecase.execute({
        type,
        comment, 
        screenshot,
    })

    return res.status(201).send()
})