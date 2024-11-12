export class ProfileInfoModel {
    id : number = 0;
    firstName? : String = "";
    lastName? : String = "";
    nationalCode? : String = "";
    gender? : number = 0;
    birthDate? : String = "";
    phoneNumber : String = "";

    

    constructor(init?: Partial<ProfileInfoModel>){
        Object.assign(this, init);
    }
}

