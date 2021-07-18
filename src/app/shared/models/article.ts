export class Article {
    id?: string;
    title: string;
    content: string;
    date_of_creation: Date;
    user_id: number;
    category_id: number;
    user_username?: string;
    category_name?: string;

    constructor(title: string, content: string, date_of_creation: Date, user_id: number, category_id: number, id?: string, user_username?: string, category_name?: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date_of_creation = date_of_creation;
        this.user_id = user_id;
        this.category_id = category_id;
        this.user_username = user_username;
        this.category_name = category_name;
    }
}