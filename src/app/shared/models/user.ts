export class User {
    id?: Number;
    username!: String;
    email!: String;
    imagePath!: String;
    dateOfCreation!: Date;
    deleted!: Boolean;
    authorityTitle?: String;
    authorityLevel?: Number;
}