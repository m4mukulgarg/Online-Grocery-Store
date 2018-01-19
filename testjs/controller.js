function display(response){
    var obj = JSON.parse(response);
    document.querySelector("#ip").innerHTML = obj.ip;
    document.querySelector("#country_code").innerHTML = obj.country_code;
}

function getjson(){
    var website = document.querySelector("#website").value;
    doajax(display,"GET",`http://freegeoip.net/json/${website}.com`);
}

