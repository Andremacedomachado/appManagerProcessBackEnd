import { TypeMessage } from "@prisma/client";
import { prisma } from "../../../database";
import { MessageActivity, TYPEMESSAGE } from "../../../domain/entities/MessageActivity";
import { IMessagaActivityRepository, IMessageActivityUpdateProps, IRecordMessageIdProps } from "../IMessageActivityRepository";

export class PrismaMessageActivityRepository implements IMessagaActivityRepository {
    async save(recordMessage: MessageActivity): Promise<IRecordMessageIdProps | null> {

        const userExists = await prisma.user.findUnique({
            where: {
                id: recordMessage.user_id
            }
        });

        if (!userExists) {
            return null
        }

        const activityExists = await prisma.activity.findUnique({
            where: {
                id: recordMessage.activity_id
            }
        })

        if (!activityExists) {
            return null
        }
        const { content, publication_date, updated_at, type_message, activity_id, user_id } = recordMessage;
        const messageInDatabase = await prisma.messageAtivity.create({
            data: {
                content,
                publication_date,
                updated_at,
                type_message: type_message as unknown as TypeMessage,
                activity_id,
                user_id
            }
        })

        return {
            activity_id: messageInDatabase.activity_id,
            user_id: messageInDatabase.user_id
        } as IRecordMessageIdProps;
    }
    async findAll(): Promise<MessageActivity[] | null> {
        const messagesActivity = await prisma.messageAtivity.findMany();
        if (messagesActivity.length == 0) {
            return null
        }
        const collectionMessageActivityInMemory = messagesActivity.map(messageActivityInDatabase => {
            const { content, publication_date, updated_at, type_message, activity_id, user_id } = messageActivityInDatabase
            return MessageActivity.create({
                content,
                publication_date,
                updated_at,
                type_message: type_message as unknown as TYPEMESSAGE,
                activity_id,
                user_id
            });
        });

        return collectionMessageActivityInMemory;
    }

    async findOne(messageId: IRecordMessageIdProps): Promise<MessageActivity | null> {
        const recordsMessageExists = await prisma.messageAtivity.findUnique({
            where: {
                activity_id_user_id_publication_date: messageId
            }
        })
        if (!recordsMessageExists) {
            return null;
        }
        const { content, publication_date, updated_at, type_message, activity_id, user_id } = recordsMessageExists
        const messageActivityInMemory = MessageActivity.create({
            content,
            publication_date,
            updated_at,
            type_message: type_message as unknown as TYPEMESSAGE,
            activity_id,
            user_id
        });

        return messageActivityInMemory;
    }
    async findManyByMessageContent(messageContentMatch: string): Promise<MessageActivity[] | null> {
        const recordsMessage = await prisma.messageAtivity.findMany({
            where: {
                content: {
                    contains: messageContentMatch
                }
            }
        })

        const collectionMessageActivityInMemory = recordsMessage.map(messageActivityInDatabase => {
            const { content, publication_date, updated_at, type_message, activity_id, user_id } = messageActivityInDatabase
            return MessageActivity.create({
                content,
                publication_date,
                updated_at,
                type_message: type_message as unknown as TYPEMESSAGE,
                activity_id,
                user_id
            });
        });
        return collectionMessageActivityInMemory;
    }
    async findByAtivityId(activityId: string): Promise<MessageActivity[] | null> {
        const activityExists = await prisma.activity.findUnique({
            where: {
                id: activityId
            }
        });

        if (!activityExists) {
            return null
        }

        const recordsMessage = await prisma.messageAtivity.findMany({
            where: {
                activity_id: activityId
            }
        })

        const collectionMessageActivityInMemory = recordsMessage.map(messageActivityInDatabase => {
            const { content, publication_date, updated_at, type_message, activity_id, user_id } = messageActivityInDatabase
            return MessageActivity.create({
                content,
                publication_date,
                updated_at,
                type_message: type_message as unknown as TYPEMESSAGE,
                activity_id,
                user_id
            });
        });
        return collectionMessageActivityInMemory;
    }

    async findByUserId(userId: string): Promise<MessageActivity[] | null> {
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!userExists) {
            return null
        }

        const recordsMessage = await prisma.messageAtivity.findMany({
            where: {
                user_id: userId
            }
        })

        const collectionMessageActivityInMemory = recordsMessage.map(messageActivityInDatabase => {
            const { content, publication_date, updated_at, type_message, activity_id, user_id } = messageActivityInDatabase
            return MessageActivity.create({
                content,
                publication_date,
                updated_at,
                type_message: type_message as unknown as TYPEMESSAGE,
                activity_id,
                user_id
            });
        });
        return collectionMessageActivityInMemory;
    }
    async update(messageUpdate: IMessageActivityUpdateProps): Promise<MessageActivity | null> {
        const { content, publication_date, updated_at, type_message, activity_id, user_id } = messageUpdate;
        const messageUpdated = await prisma.messageAtivity.update({
            where: {
                activity_id_user_id_publication_date: {
                    activity_id,
                    user_id,
                    publication_date
                }
            },
            data: {
                content,
                publication_date,
                updated_at: updated_at ?? new Date(),
                type_message: type_message ? type_message as unknown as TypeMessage : undefined
            }
        });

        return MessageActivity.create({
            content: messageUpdated.content,
            publication_date: messageUpdated.publication_date,
            updated_at: messageUpdated.updated_at,
            type_message: type_message as unknown as TYPEMESSAGE,
            activity_id: messageUpdated.activity_id,
            user_id: messageUpdated.user_id
        });
    }

}