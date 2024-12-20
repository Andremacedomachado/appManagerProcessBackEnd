import { Activity } from "../../../domain/entities/Activity";
import { MessageActivity, TYPEMESSAGE } from "../../../domain/entities/MessageActivity";
import { IActivityRepository, IActivityUniqueContentProps } from "../../repositories/IActivityRepository";
import { ICollaboratorRepository } from "../../repositories/ICollaboratorReposytory";
import { IMessageActivityRepository } from "../../repositories/IMessageActivityRepository";
import { IProjectRepository } from "../../repositories/IProjectRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CreateActivityRequestData } from "./CreateActivityDTO";


export class CreateActivityUseCase {
    constructor(
        private activityRepository: IActivityRepository,
        private userRepository: IUserRepository,
        private projectRepository: IProjectRepository,
        private messageActivityRepository: IMessageActivityRepository,
        private collaboratorRepositoy: ICollaboratorRepository,
    ) { }

    async excute(userId: string, activity: CreateActivityRequestData) {

        const userIssuing = await this.userRepository.findById(userId);
        if (!userIssuing) {
            return new Error('User not exists')
        }

        const projectExist = await this.projectRepository.findById(activity.project_id)

        if (!projectExist) {
            return new Error('Project not exists')
        }

        const activityExists = await this.activityRepository.findUniqueForcontent({
            title: activity.title,
            created_at: activity.created_at
        } as IActivityUniqueContentProps)

        if (activityExists) {
            return new Error('Activity alread exists');
        }


        const userAuthorExist = await this.userRepository.findById(activity.responsible_id);
        if (!userAuthorExist) {
            return new Error('User responsible not exists')
        }

        const { title, description, responsible_id, created_at, due_date, start_date, progress_status, updated_at, project_id, type_node } = activity
        const activityInMemory = Activity.create({
            title,
            description,
            created_at,
            updated_at,
            responsible_id,
            due_date,
            start_date,
            progress_status,
            type_node,
            conclusion_date: null,
            project_id,
            sector_id: userAuthorExist.props.organization_sector_id ? userAuthorExist.props.organization_sector_id : 'null'
        });
        const activityIdOrNull = await this.activityRepository.save(activityInMemory);

        if (!activityIdOrNull) {
            return new Error('Error insert data in dabase');
        }


        const resultOrError = await this.collaboratorRepositoy.save([userAuthorExist.id], activityIdOrNull.id)

        if (resultOrError instanceof Error) {
            throw resultOrError
        }



        const messageCreatedActivity = MessageActivity.create({
            activity_id: activityIdOrNull.id,
            content: "Atividade criada com sucesso",
            type_message: TYPEMESSAGE.SYSTEM,
            user_id: userId,
        })

        const mc = await this.messageActivityRepository.save(messageCreatedActivity)

        const contentMessageCollaboration = "Realizado vinculo de colaboração com " + userAuthorExist.props.name
        const messageCollaboratorInActivity = MessageActivity.create({
            activity_id: activityIdOrNull.id,
            content: contentMessageCollaboration,
            type_message: TYPEMESSAGE.SYSTEM,
            user_id: userId,
        })

        const mcl = await this.messageActivityRepository.save(messageCollaboratorInActivity)


        const contentMessageReponsible = "atribuido responsavel da atividade como " + userAuthorExist.props.name
        const messageResponsibleInActivity = MessageActivity.create({
            activity_id: activityIdOrNull.id,
            content: contentMessageReponsible,
            type_message: TYPEMESSAGE.SYSTEM,
            user_id: userId,
        })

        const mr = await this.messageActivityRepository.save(messageResponsibleInActivity)


        return activityIdOrNull;

    }
}