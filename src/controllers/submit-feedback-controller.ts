import { Request, Response } from "express"
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter"
import { PrismaFeedbackRepository } from "../repositories/prisma/prisma-feedback-repository"
import { SubmitFeedbackUsecase } from "../use-cases/submit-feedback-use-case"

export class SubmitFeedbackController{
    async handle(request: Request, response: Response){
        const { type, comment, screenshot} = request.body
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

        return response.status(201).send('Feedback enviado com sucesso')
    }
}