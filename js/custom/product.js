class Product{

    constructor(name,url,price,seller,rating,qty,category="null"){
        this.name = name;
        this.price = price;
        this.seller = seller;
        this.rating = rating;
        this.qty = qty;
        this.category = category;
        this.qtyPurchased = 0;
    }
    
    createImg(){
        var img = document.createElement("img");
        img.src = this.url;
        img.classList.add("photo");

        return img;
    }

}