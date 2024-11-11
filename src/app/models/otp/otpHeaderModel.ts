export class OtpHeaderModel {
    Code? : number;
    Refrence? : String;

    constructor(init?: Partial<OtpHeaderModel>){
        Object.assign(this, init);
    }
}

