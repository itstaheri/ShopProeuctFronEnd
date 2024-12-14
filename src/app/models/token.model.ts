export class Token {
    tokenID! : string
    expireDate! :  string

    

    constructor(init?: Partial<Token>){
        Object.assign(this, init);
    }
}

