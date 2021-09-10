export class User {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    dateOfCreation?: Date;
    deleted?: boolean;

    constructor( id?: number, username?: string, email?: string, dateOfCreation?: Date, password?: string, deleted?: boolean) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.dateOfCreation = dateOfCreation;
        this.password = password;
        this.deleted = deleted;
    }
}