import { OrganizationSector } from "../../../domain/entities/OrganizationSector";
import { IOrganizationRepository } from "../../repositories/IOrganizationRepository";
import { IOrganizationSectorRepository } from "../../repositories/IOrganizationSectorRepository";
import { IOrganizationSectorRequestDTO } from "./CreateOranizationSectorDTO";


export class CreateOrganizationSectorUseCase {

    constructor(private organizationSectorRepository: IOrganizationSectorRepository, private organizationRepository: IOrganizationRepository) { }

    async execute(data: IOrganizationSectorRequestDTO) {
        const { name, created_at, updated_at, employeesAllocated, organization_id } = data

        const organizationExists = await this.organizationRepository.findById(organization_id);
        if (!organizationExists) {
            return new Error('Organization not exists');
        }

        const sector = OrganizationSector.create({
            name,
            created_at,
            updated_at,
            employeesAllocated,
            organization_id,

        })

        const sectorInDatabase = await this.organizationSectorRepository.save(sector);

        if (!sectorInDatabase) {
            return new Error('Error insert data in database');
        }

        return sectorInDatabase;
    }
}