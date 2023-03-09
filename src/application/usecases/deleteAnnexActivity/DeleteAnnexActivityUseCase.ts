import { IAnnexActivityRepository } from "../../repositories/IAnnexActivityRepository";
import { IDeleteAnnexActivityRequestDTO } from "./DeleteAnnexActivityDTO";
import path from 'path';
import fs from 'fs';

export class DeleteAnnexActivtyUseCase {
    constructor(private annexActivityRepository: IAnnexActivityRepository) { }

    async execute(annexId: IDeleteAnnexActivityRequestDTO) {
        const annexActivity = await this.annexActivityRepository.delete(annexId);
        if (!annexActivity) {
            return new Error('Annex not exists');
        }
        const pathFile = path.resolve(__dirname, '../../../../uploads', `${annexActivity.file_name}`);

        if (fs.existsSync(pathFile)) {
            fs.rmSync(pathFile);
        }

        return null;
    }
}