function doajax(fn,method,url){
    var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open(method,url);
    xmlHttpReq.onreadystatechange = function(){
        if(xmlHttpReq.readyState==4 && xmlHttpReq.status==200){
            fn(xmlHttpReq.responseText);
        }
    }  
    xmlHttpReq.send(null);

}