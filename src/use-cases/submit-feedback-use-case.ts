import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackCase{
    type: string,
    comment: string,
    screenshot?: string
}

class SubmitFeedbackUsecase{

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter){}

    async execute(request: SubmitFeedbackCase){
        const { type, comment, screenshot} = request

        await this.feedbacksRepository.create(
            {
                type,
                comment, 
                screenshot
            }
        )

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo do feedback: ${type}<p/>`,
                `<p>Comentário: ${comment}<p/>`,
                screenshot ? `<img src="${screenshot}"/>` : ``,
                `<div/>`
            ].join('\n')
        })
    }
}

export  { SubmitFeedbackUsecase }