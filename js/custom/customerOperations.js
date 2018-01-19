const customerOperations = {
    customerList : [],

    getCustomer(uname){
        var customerArr = this.customerList.filter((customer) => customer.uname === uname);

        if(customerArr)
            return customerArr[0];
        else
            return undefined;
    },

    verifyCustomer(uname){
        var cutomerObject = this.getCustomer(uname);
    },

    addCustomer(customerObject){
        customerList.push(customerObject);
    }
}