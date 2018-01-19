var menuOperations = {
    menuList:[],

    add(menuItemObject){
        this.menuList.push(menuItemObject);
    },

    delete(type){
        this.menuList = this.menuList.filter(menuItemObject => menuItemObject.type !== type);
    },

    searchByName(type){
        return this.menuList.filter(menuItemObject => menuItemObject.type === type)[0];
    }


}