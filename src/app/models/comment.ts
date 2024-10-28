import { user } from "./user";

export class comment{
    user : user;
    date : Date;
    comment :string;
    rating: number;

    constructor(user : user,
        date : Date,
        comment :string,
        rating: number){
            this.user = user;
            this.date = date;
            this.comment = comment;
            this.rating = rating;
        }
}