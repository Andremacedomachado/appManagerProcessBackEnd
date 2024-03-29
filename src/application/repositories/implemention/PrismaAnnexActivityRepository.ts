import { prisma } from "../../../database";
import { AnnexActivity } from "../../../domain/entities/AnnexActivity";
import { IAnnexActivityIdProps, IAnnexActivityRepository, IAnnexActivityUnique, IFilterAnnexActivityProps } from "../IAnnexActivityRepository";

import path from 'path';
import fs from 'fs';
import { Annex } from "@prisma/client";

export class PrismaAnnexActivityRepository implements IAnnexActivityRepository {
    async save(annexAtivity: AnnexActivity): Promise<IAnnexActivityIdProps | null> {
        const { file_name, original_name, activity_id, publication_date, url, user_id } = annexAtivity;
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: activity_id
            }
        })

        if (!activityExists) {
            return null;
        }

        const userExists = await prisma.user.findUnique({
            where: {
                id: user_id
            }
        })

        if (!userExists) {
            return null;
        }

        const annexActivityInDatabase = await prisma.annex.create({
            data: {
                file_name,
                original_name,
                url,
                activity_id,
                user_id,
                publication_date
            }
        })

        return {
            publication_date: annexActivityInDatabase.publication_date,
            activity_id: annexActivityInDatabase.activity_id,
            user_id: annexActivityInDatabase.user_id
        } as IAnnexActivityIdProps
    }
    async findAll(): Promise<AnnexActivity[] | null> {
        const collectionAnnexActivity = await prisma.annex.findMany();

        if (collectionAnnexActivity.length == 0) {
            return null
        }

        const collectionAnnexActivityInMemory = collectionAnnexActivity.map(annexActivityInDatabase => {
            const { original_name, activity_id, file_name, publication_date, url, user_id } = annexActivityInDatabase;
            return AnnexActivity.create({
                original_name,
                file_name,
                url,
                publication_date,
                activity_id,
                user_id
            });
        });

        return collectionAnnexActivityInMemory;

    }
    async findOne(dataSearchAnnex: IAnnexActivityUnique): Promise<AnnexActivity | null> {
        const annexActivity = await prisma.annex.findFirst({
            where: {
                publication_date: dataSearchAnnex.publication_date,
                original_name: dataSearchAnnex.original_name
            }
        });

        if (!annexActivity) {
            return null
        }

        const { original_name, activity_id, file_name, publication_date, url, user_id } = annexActivity;
        const AnnexActivityInMemory = AnnexActivity.create({
            original_name,
            file_name,
            url,
            publication_date,
            activity_id,
            user_id
        });

        return AnnexActivityInMemory;
    }

    async findManyByActivityId(activityId: string): Promise<AnnexActivity[] | null> {
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: activityId
            }
        })

        if (!activityExists) {
            return null
        }

        const collectionAnnexActivity = await prisma.annex.findMany({
            where: {
                activity_id: activityId
            }
        });

        if (collectionAnnexActivity.length == 0) {
            return null
        }

        const collectionAnnexActivityInMemory = collectionAnnexActivity.map(annexActivityInDatabase => {
            const { original_name, activity_id, file_name, publication_date, url, user_id } = annexActivityInDatabase;
            return AnnexActivity.create({
                original_name,
                file_name,
                url,
                publication_date,
                activity_id,
                user_id
            });
        });

        return collectionAnnexActivityInMemory
    }
    async findManyByUserId(userId: string): Promise<AnnexActivity[] | null> {
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!userExists) {
            return null
        }

        const collectionAnnexActivity = await prisma.annex.findMany({
            where: {
                user_id: userId
            }
        });

        if (collectionAnnexActivity.length == 0) {
            return null
        }

        const collectionAnnexActivityInMemory = collectionAnnexActivity.map(annexActivityInDatabase => {
            const { original_name, activity_id, file_name, publication_date, url, user_id } = annexActivityInDatabase;
            return AnnexActivity.create({
                original_name,
                file_name,
                url,
                publication_date,
                activity_id,
                user_id
            });
        });

        return collectionAnnexActivityInMemory
    }

    async delete(dataSearchAnnex: IAnnexActivityIdProps): Promise<AnnexActivity> {
        const annexDeleted = await prisma.annex.delete({
            where: {
                activity_id_user_id_publication_date: dataSearchAnnex
            }
        });

        const { original_name, activity_id, file_name, publication_date, url, user_id } = annexDeleted;
        return AnnexActivity.create({
            original_name,
            file_name,
            url,
            publication_date,
            activity_id,
            user_id
        });
    }

    async deleteRecordsByfilter(filter: IFilterAnnexActivityProps): Promise<AnnexActivity[] | Error> {
        try {
            const deleteFileInLocalStorage = async (annexs: Annex[]) => {
                var countFileDeleted = 0;
                for (const annex of annexs) {
                    const pathFile = path.resolve(__dirname, '../../../../uploads', `${annex.file_name}`);
                    if (fs.existsSync(pathFile)) {
                        fs.rm(pathFile, (err) => {
                            if (err) {
                                throw err
                            }
                        });
                        countFileDeleted++;
                    }
                }
                return countFileDeleted
            }
            const filterValid = Object.values(filter).every(field => field !== undefined);
            if (!filterValid) {
                throw new Error('Filter invalid - please inform at least one field with value')
            }

            const annexInDelete = await prisma.$transaction(async (tx) => {
                const annexsFound = await tx.annex.findMany({
                    where: filter
                });

                const payloadDelete = await tx.annex.deleteMany({
                    where: filter
                });
                const fileDeleted = await deleteFileInLocalStorage(annexsFound);

                if (fileDeleted != payloadDelete.count) {
                    throw Error('Error In trasaction - annex not deleted')
                }

                return annexsFound
            })

            return annexInDelete.map(annex => AnnexActivity.create({ ...annex }))
        } catch (errors) {
            return errors as Error
        }
    }
}