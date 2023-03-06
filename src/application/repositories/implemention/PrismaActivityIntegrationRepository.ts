import { Activity } from "../../../domain/entities/Activity";
import { RecordCollaborator } from "../../../domain/entities/RecordCollaborator";
import { IActivityIntegrationRepository, IActivityTree, ICollectionActivityTreeFullInfo } from "../IActivityIntegrationRepository";
import { IActivityRepository } from "../IActivityRepository";
import { ICollaboratorRepository } from "../ICollaboratorReposytory";
import { IUserRepository } from "../IUserRepository";

export class PrismaActivityIntegrationRepository implements IActivityIntegrationRepository {
    constructor(
        private userRepository: IUserRepository,
        private collaboratorRepository: ICollaboratorRepository,
        private activityRepository: IActivityRepository
    ) { }
    saveChange(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllActivityByUser(userId: string): Promise<ICollectionActivityTreeFullInfo | Error> {

        const userExists = await this.userRepository.findById(userId);

        if (!userExists) {
            return new Error('User dont exists!');
        }

        const allRecordsCollaborations = await this.collaboratorRepository.findByUserId(userId);

        if (!allRecordsCollaborations || allRecordsCollaborations.length == 0) {
            return {
                collectionsActivityTree: []
            } as ICollectionActivityTreeFullInfo;
        }

        var recordsNotFound = allRecordsCollaborations;
        const collectionTree = { collectionsActivityTree: [] } as ICollectionActivityTreeFullInfo;

        do {
            const actvityRootNode = await this.activityRepository.findRootNodeById(recordsNotFound[0].activity_id);
            const activitytreeInDatabase = await this.activityRepository.findTreeDescendant(actvityRootNode?.id as string);
            const actvityTree: IActivityTree = {
                activities: []
            }
            activitytreeInDatabase?.forEach((activitiNode) => {
                const activitiInformat = activitiNode as Activity;
                const { title, description, responsible_id, created_at, updated_at, due_date, start_date, dependency_link_date, parent_activity_id, progress_status } = activitiInformat.props;
                actvityTree.activities.push({
                    id: activitiInformat.id,
                    props: {
                        title,
                        description,
                        responsible_id,
                        created_at,
                        updated_at,
                        due_date,
                        start_date,
                        dependency_link_date,
                        parent_activity_id,
                        progress_status,
                    },
                });
            });
            const collaboratorsActivityTreeCurrent = await this.collaboratorRepository.findByActivityId(recordsNotFound[0].activity_id);
            actvityTree.collaborators = collaboratorsActivityTreeCurrent as RecordCollaborator[];
            collectionTree.collectionsActivityTree.push(actvityTree);

            recordsNotFound = recordsNotFound.filter(record => {
                return actvityTree.activities.every(activity => {
                    return activity.id !== record.activity_id
                })
            });

        } while (recordsNotFound.length != 0);

        return collectionTree;
    }

}