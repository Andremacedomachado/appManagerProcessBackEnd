import { getAnnexActivityInfoUseCase } from "../getAnnexActivityInfo";
import { IGetAnnexFileDataResponseDTO, IGetAnnexFileRequestDTO } from "./GetAnnexFileDTO";
import fs from "fs";
import path from "path";

export class GetAnnexFileUseCase {
    async execute(dataSeachAnnex: IGetAnnexFileRequestDTO) {
        const annexActivityInfoOrError = await getAnnexActivityInfoUseCase.execute(dataSeachAnnex);
        if (annexActivityInfoOrError instanceof Error) {
            return annexActivityInfoOrError;
        }
        const pathFile = path.resolve(__dirname, '../../../../uploads', `${annexActivityInfoOrError.file_name}`);
        const fileExtension = annexActivityInfoOrError.original_name.split('.').pop()
        if (!fileExtension) {
            return new Error('Error extension file not provide');
        }
        if (fs.existsSync(pathFile)) {
            return {
                path: pathFile,
                name: annexActivityInfoOrError.original_name,
                extension: fileExtension
            } as IGetAnnexFileDataResponseDTO;
        }

        return new Error('Not found file');
    }
}