
import { IOrganizationId, IOrganizationRepository } from "../../repositories/IOrganizationRepository";
import { CreateOrganizationRequestDTO } from "./CreateOrganizationDTO";
import { Organization } from "../../../domain/entities/Organization";



export class CreateOrganizationUsecase {
    constructor(private organizationRepository: IOrganizationRepository) { }

    async excute(data: CreateOrganizationRequestDTO): Promise<IOrganizationId | Error> {
        const { name, employeesAllocated, created_at, updated_at } = data;

        const organization = Organization.create({
            name,
            employeesAllocated,
            created_at,
            updated_at,
        });
        const organizationOrNull = await this.organizationRepository.save(organization)
        if (!organizationOrNull) {
            return new Error('Organization already exists');
        }
        return organizationOrNull;
    }
}