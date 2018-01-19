window.addEventListener("load",()=>{
    document.querySelector("#login").addEventListener("click",login);
    document.querySelector("#registerBt").addEventListener("click",register);

    doajax(loadCustomers,"GET","http://localhost:3000/json/customers.json");
    doajax(loadmenu,"GET","http://localhost:3000/json/menuItems.json");
    doajax(loadveg,"GET","http://localhost:3000/json/vegetables.json");
    doajax(loadfruit,"GET","http://localhost:3000/json/fruits.json");
    doajax(loadbeverages,"GET","http://localhost:3000/json/beverages.json");
//    defaultDataEntry();

});

function loadveg(json){

    var tempList = JSON.parse(json);
    var menuItemObject = menuOperations.searchByName("vegetable");
    tempList.forEach(element => {
        var productObject = new Product(element.name,element.url,element.price,element.seller,element.rating,element.qty);
        menuItemObject.add(productObject);
    });
}

function loadfruit(json){

    var tempList = JSON.parse(json);
    var menuItemObject = menuOperations.searchByName("fruits");
    tempList.forEach(element => {
        var productObject = new Product(element.name,element.url,element.price,element.seller,element.rating,element.qty);
        menuItemObject.add(productObject);
    });
}

function loadbeverages(json){

    var tempList = JSON.parse(json);
    var menuItemObject = menuOperations.searchByName("beverages");
    tempList.forEach(element => {
        var productObject = new Product(element.name,element.url,element.price,element.seller,element.rating,element.qty);
        menuItemObject.add(productObject);
    });
}

function loadmenu(json){
    var tempList = JSON.parse(json);

    tempList.forEach(element =>{
        var menuItemObject = new menuItem(element.type);
        menuOperations.add(menuItemObject);
    });
}
function loadCustomers(json){
    var tempList = JSON.parse(json);

    tempList.forEach(element => {
        var customerObject = new Customer(element.uname,element.pass,element.name,element.address);
        customerOperations.customerList.push(customerObject);
    });
    
}

function login(){
    var userName = document.querySelector("#uname").value;
    var pass = document.querySelector("#pass").value;
 
    var customerObject = customerOperations.getCustomer(userName);
    if(customerObject)
    {
        console.log("Customer Object : ",customerObject);
        if(customerObject.verifyPass(pass))
        {
            console.log(customerObject);
            document.querySelector("#loginContainer").classList.toggle("show");
            document.querySelector("#loginContainer").classList.toggle("hide");
            document.querySelector("#menuContainer").classList.toggle("hide");
            document.querySelector("#menuContainer").classList.toggle("show");
            displayMenu();
        }
        else{
            var invalid = document.querySelector("#invalidPassword");
            invalid.classList.toggle("hide");
            invalid.classList.add("show");
            console.log("Invalid Password");
        }

    }
    else
        console.log("Invalid Customer");

}

function register(){

    document.querySelector("#registerContainer").classList.toggle("show");
    document.querySelector("#loginContainer").classList.toggle("show");
    document.querySelector("#loginContainer").classList.toggle("hide");
    var uname = document.querySelector("#rg-uname").value;    
    var pass = document.querySelector("#rg-pass").value;
    var name = document.querySelector("#rg-name").value;
    var address = document.querySelector("#rg-address").value;

    var customerObject = new Customer(uname,pass,name,address);
    customerOperations.add(customerObject);

}

function displayMenu(){
    var menuList = menuOperations.menuList;
    var tbody = document.querySelector("#menuItems");
    menuList.forEach((menuItemObject) =>{
        var tr = tbody.insertRow();
        var label = document.createElement("label");
        label.innerHTML = menuItemObject.type;
        label.classList.add("form-control");
        label.classList.add("menuItem");
        label.setAttribute("product-name",menuItemObject.type);
        label.addEventListener("click",showProducts);
        tr.insertCell().appendChild(label);
    });
}

function showProducts(event){
    console.log("Show Products is called");
    var ItemName = event.srcElement.getAttribute("product-name");
    var menuItemObject = menuOperations.searchByName(ItemName);
    console.log("Menu Item Object : ",menuItemObject);
    displayProducts2(menuItemObject);

}
/*function defaultDataEntry(){
    var menuItemObject = new menuItem("vegetable");
    var menuItem2 = new menuItem("fruits");
    var menuItem3 = new menuItem("beverages");

    menuOperations.add(menuItemObject);
    menuOperations.add(menuItem2);
    menuOperations.add(menuItem3);

    var product1 = new Product("Coffee","images/fruits/apple.jpg",80,"Vishal Mega Mart",25,250);
    var product2 = new Product("HotChocolate","images/fruits/mango.jpg",130,"Subhiksha",72,87);
    var product3 = new Product("Milk","images/fruits/banana.jpg",25,"Reliance Fresh",40,80);
    var product4 = new Product("Mimosa","images/fruits/avacado.jpg",60,"Gotham Central",100,78);
    var product5 = new Product("Juice","images/fruits/apricot.jpg",22,"Raj Mandir",44,548);

    menuItemObject.add(product1);
    menuItemObject.add(product2);
    menuItemObject.add(product3);
    menuItemObject.add(product4);
    menuItemObject.add(product5);

    console.log(menuItemObject.productList);
}*/

function displayProducts(menuItemObject){

    console.log("Display Products is called");
    document.querySelector("#productContainer").classList.toggle("hide");
    document.querySelector("#productContainer").classList.toggle("show");
    document.querySelector("#menuContainer").classList.toggle("hide");
    document.querySelector("#menuContainer").classList.toggle("show");

    var table = document.querySelector("#products");
    table.classList.add("productTable");
    menuItemObject.productList.forEach(productObject => {
        var pr = createProductDisplay2(productObject);
        console.log(pr);
        table.insertRow().insertCell().appendChild(pr);
        
    });
    
}

function displayProducts2(menuItemObject){

    console.log("Display Products is called");
    document.querySelector("#productContainer").classList.toggle("hide");
    document.querySelector("#productContainer").classList.toggle("show");
    document.querySelector("#menuContainer").classList.toggle("hide");
    document.querySelector("#menuContainer").classList.toggle("show");

    var table = document.querySelector("#products");
    table.classList.add("productTable");
    menuItemObject.productList.forEach(productObject => {
        var tr = table.insertRow();
        

        var nameLabel = `<label>${productObject.name}</label>`;
        var img = productObject.createImg();
        
        var td = tr.insertCell().innerHTML = nameLabel;
        tr.insertCell().appendChild(img);
        

        var price = `<label>${productObject.price}</label>`;
        var seller = `<label>${productObject.seller}</label>`;
        var rating = `<label>${productObject.rating}</label>`;
        var qty = `<label>${productObject.qty}</label>`;

        tr.insertCell().innerHTML = price;
        tr.insertCell().innerHTML = seller;
        tr.insertCell().innerHTML = rating;
        tr.insertCell().innerHTML = qty;

    var button = document.createElement("button");
    button.innerHTML = "Add To Cart";
    button.setAttribute("product-name", productObject.name);
    
    tr.insertCell().appendChild(button);
        
    });
    
}

function createProductDisplay3(productObject){
    
}

function createProductDisplay2(productObject){
    var productTable = document.createElement("table");
    var tr = productTable.insertRow();
    var td = tr.insertCell().innerHTML = `<label>${productObject.name}</label>`;
   

    tr = productTable.insertRow();
    tr.insertCell().appendChild(productObject.createImg());

    tr = productTable.insertRow();
    tr.insertCell().innerHTML = "Seller";
    tr.insertCell().innerHTML = `<label>${productObject.seller}</label>`;

    tr = productTable.insertRow();
    tr.insertCell().innerHTML = "Price";
    tr.insertCell().innerHTML = `<label>${productObject.price}</label>`;

    tr = productTable.insertRow();
    tr.insertCell().innerHTML = "Quantity";
    tr.insertCell().innerHTML = `<input type="number" step ="1" value = "0" product-name = ${productObject.name}>`;
    

    var button = document.createElement("button");
    button.innerHTML = "Add To Cart";
    button.setAttribute("product-name", productObject.name);

    tr = productTable.insertRow();
    tr.insertCell().appendChild(button);

    productTable.classList.add("productTable");
    return productTable;


}
function createProductDisplay(product){
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var li4 = document.createElement("li");
    var li5 = document.createElement("li");
    var li6 = document.createElement("li");

    li.innerHTML = product.name;
    li2.appendChild(product.createImg());
    li3.innerHTML = product.price;
    li4.innerHTML = product.seller;
    li5.innerHTML = product.rating;
    li6.innerHTML = product.qty;
    
    var button = document.createElement("button");
    button.innerHTML = "Add to Cart"

    ul.appendChild(li);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
    ul.appendChild(button);

    return ul;
}

function checkUsername(uname){
    var customerObject = customerOperations.getCustomer(uname);
    if(customerObject)
        console.log("Customer Already Exists");

    if(uname.length<6 || uname.length>25)
        console.log("Username must be between 6-25 characters");
    
    if(uname==="" || uname.trim.length==0)
        console.log("Username cannot be blank");

}