export class User {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    dateOfCreation?: Date;

    constructor( id?: number, username?: string, email?: string, dateOfCreation?: Date, password?: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.dateOfCreation = dateOfCreation;
        this.password = password;
    }
}