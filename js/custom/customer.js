class Customer{
    constructor(uname,pass,name,address){
        this.uname = uname;
        this.pass = pass;
        this.name = name;
        this.address = address;
    }

    verifyPass(pass){
        return this.pass === pass;
    }

    
}