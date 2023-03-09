import { IAnnexActivityUnique } from "../../repositories/IAnnexActivityRepository";

export interface IGetAnnexFileRequestDTO extends IAnnexActivityUnique { }

export interface IGetAnnexFileDataResponseDTO {
    path: string,
    name: string,
    extension: string,
}