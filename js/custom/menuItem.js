class menuItem{
    constructor(type){
        this.type = type;
        this.productList = [];       
    }

    add(product){
        this.productList.push(product);
    }

    searchProductByName(name){
        return product = this.productList.filter(productObject =>{
            productObject.name===name
        })[0];
    }

    delete(name){
        this.productList = this.productList.filter(productObject=>productObject.name!==name);
    }
    
}