import { isAfter, isBefore } from "date-fns";
import { STATUSACTIVITY } from "../../../domain/entities/Activity";
import { IActivityRepository } from "../../repositories/IActivityRepository";
import { UpdateActivityByIdRequestDTO } from "./UpdateActivityByIdDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IProjectRepository } from "../../repositories/IProjectRepository";
import { MessageActivity, TYPEMESSAGE } from "../../../domain/entities/MessageActivity";
import { IMessageActivityRepository } from "../../repositories/IMessageActivityRepository";

export class UpdateActivityByIdUseCase {

    constructor(
        private activityRepository: IActivityRepository,
        private userRepository: IUserRepository,
        private projectRepository: IProjectRepository,
        private messageActivityRepository: IMessageActivityRepository
    ) { }

    async execute(userId: string, dataUpdate: UpdateActivityByIdRequestDTO) {
        const { id, ...dataUpdateWithoutId } = dataUpdate
        const { conclusion_date, created_at, description, due_date, progress_status, responsible_id, title, type_node, updated_at, start_date, project_id } = dataUpdate;

        const userAuthorExist = await this.userRepository.findById(userId)

        if (!userAuthorExist) {
            throw new Error("Author not exist!")
        }

        const activityExists = await this.activityRepository.findById(id)
        if (!activityExists) {
            return new Error('Activity not exists')
        }

        const dataPayloadDiffInDatabase = activityExists.checkDifferenceExist({ ...dataUpdateWithoutId })

        if (!dataPayloadDiffInDatabase) {
            throw new Error("To update the data, discrepancy in the data is necessary")
        }

        console.log(" dados da requisição difere sobre o banco:", dataPayloadDiffInDatabase)


        if (start_date && activityExists.props.due_date && isAfter(start_date, activityExists.props.due_date)) {
            throw new Error("the start date must be before the end date")
        }

        if (due_date && activityExists.props.start_date && isBefore(due_date, activityExists.props.start_date)) {
            throw new Error("the end date must be later than the start date")
        }

        if (!activityExists.props.conclusion_date && conclusion_date) {
            throw new Error("It is not possible to change the completion date of an activity that has not been completed")
        }

        if (conclusion_date === null && activityExists.props.conclusion_date) {
            throw new Error("It is not possible to delete the completion date of an activity that has been completed")
        }

        if (progress_status &&
            activityExists.props.progress_status &&
            progress_status != activityExists.props.progress_status
        ) {
            if (progress_status == STATUSACTIVITY.CLOSED) {
                dataUpdate.conclusion_date = new Date()
            }
            else {
                dataUpdate.conclusion_date = null
            }
        }
        var messageUpdateResponsibleActivity: MessageActivity | undefined;
        if (responsible_id) {
            const responsibleExist = await this.userRepository.findById(responsible_id)
            if (!responsibleExist) {
                throw new Error("Responsible not exist")
            }

            if (responsibleExist.props.organization_sector_id != activityExists.props.sector_id) {
                dataUpdate.sector_id = responsibleExist.props.organization_sector_id;
            }
            else {
                dataUpdate.sector_id = undefined
            }

            const messageContentUpdatedResponsible = `atribuido como responsavel ${responsibleExist.props.name}`
            const message = MessageActivity.create({
                content: messageContentUpdatedResponsible,
                activity_id: dataUpdate.id,
                user_id: userAuthorExist.id,
                type_message: TYPEMESSAGE.SYSTEM,
                publication_date: new Date(),
            })
            messageUpdateResponsibleActivity = message
        }

        if (project_id) {
            const projectExists = await this.projectRepository.findById(project_id);
            if (!projectExists) {
                throw new Error("Project not exist, please enter data valid")
            }
        }

        const activityUpdated = await this.activityRepository.update({ ...dataUpdate })

        const messageContentUpdatedActivity = `Os dados da atividade foram atualizados ${Object.keys(dataUpdate).reduce((prev, curr, index) => {
            if (index == 0) {
                return prev + curr
            }
            return prev + ', ' + curr
        }, '')}`
        const messageUpdateActivity = MessageActivity.create({
            content: messageContentUpdatedActivity,
            activity_id: dataUpdate.id,
            user_id: userAuthorExist.id,
            type_message: TYPEMESSAGE.SYSTEM,
            publication_date: new Date(),
        })

        const messageUpdatedResult = await this.messageActivityRepository.save(messageUpdateActivity)
        if (!messageUpdatedResult) {
            throw new Error("error registering activity update message")
        }


        if (messageUpdateResponsibleActivity) {
            const messageResponsibleResult = await this.messageActivityRepository.save(messageUpdateResponsibleActivity);
            if (!messageResponsibleResult) {
                throw new Error("Error recording activity message")
            }
        }
        console.log(messageUpdateActivity)

        return activityUpdated;
    }
}