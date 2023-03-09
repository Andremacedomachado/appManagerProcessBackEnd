
export interface IAnnexActivityProps {
    original_name: string,
    publication_date?: Date,
    file_name: string,
    url: string,
    user_id: string,
    activity_id: string,
}

export class AnnexActivity implements IAnnexActivityProps {
    constructor(
        public original_name: string,
        public publication_date: Date | undefined,
        public file_name: string,
        public url: string,
        public user_id: string,
        public activity_id: string
    ) {
        this.publication_date = publication_date ? publication_date : new Date
    }

    static create({ original_name, file_name, publication_date, url, user_id, activity_id }: IAnnexActivityProps) {
        return new AnnexActivity(original_name, publication_date, file_name, url, user_id, activity_id);
    }
}