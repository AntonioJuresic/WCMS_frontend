export class User {
    id?: Number;
    username!: String;
    email!: String;
    imagePath!: String;
    password!: String; // vjerojatno nije potrebno
    dateOfCreation!: Date;
    deleted!: Boolean;
    authorityTitle?: String;
    authorityLevel?: Number;
}