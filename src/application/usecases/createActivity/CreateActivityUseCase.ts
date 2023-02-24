import { Activity } from "../../../domain/entities/Activity";
import { IActivityRepository, IActivityUniqueContentProps } from "../../repositories/IActivityRepository";
import { ICreateActivityRequestDTO } from "./CreateActivityDTO";


export class CreateActivityUseCase {
    constructor(private activityRepository: IActivityRepository) { }

    async excute(activity: ICreateActivityRequestDTO) {

        const activityExists = await this.activityRepository.findUniqueForcontent({
            title: activity.title,
            created_at: activity.created_at
        } as IActivityUniqueContentProps)

        if (activityExists) {
            return new Error('Activity alread exists');
        }

        const { title, description, responsible_id, created_at, dependency_link_date, due_date, parent_activity_id, progress_status, updated_at } = activity
        const activityInMemory = Activity.create({
            title,
            description,
            created_at,
            updated_at,
            responsible_id,
            dependency_link_date,
            parent_activity_id,
            due_date,
            progress_status,
        });
        const activityIdOrNull = await this.activityRepository.save(activityInMemory);

        if (!activityIdOrNull) {
            return new Error('Error insert data in dabase');
        }

        return activityIdOrNull;

    }
}