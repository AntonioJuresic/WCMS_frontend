export class User {
    id?: number;
    username: string;
    password?: string;
    email: string;
    date_of_creation: Date;

    constructor(username: string, email: string, date_of_creation: Date, id?: number, password?: string,) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.date_of_creation = date_of_creation;
        this.password = password;
    }
}