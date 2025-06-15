
let baseurl = "https://latest.currency-api.pages.dev/v1/currencies/";
let btn = document.querySelector("form button")
let amount  = document.querySelector(".amount input")
let msg = document.querySelector(".msg")
let dropdown = document.querySelectorAll(".dropdown select")
let from = dropdown[0];
let to = dropdown[1];

let data
for(let select of dropdown) {
    for(let code in countryList) {
        let newoption = document.createElement("option")
        newoption.innerHTML = code
        newoption.value = code
        if(select.name == "from" && code == "USD")  {
            newoption.selected="selected";
        } 
        else if(select.name == "to" && code == 'INR'){
            newoption.selected="selected";
        }
        select.append(newoption)
    }
    select.addEventListener("click",(evt)=> {
        updateflag(evt.target);

    });
}


const updateflag = (ele) => {
    let code = ele.value
    let country = countryList[code];
    let mysrc = "https://flagsapi.com/"+country+"/flat/64.png";
    let img = ele.parentElement.querySelector("img")
    img.src=mysrc;
};


btn.addEventListener("click", async (ele)=> {
    ele.preventDefault()
    let amtval = amount.value;
    if(amtval == "" || amtval < 1)
    {
        amount.value=1;
        amtval = 1;
        msg.innerHTML="Enter Valid Amount !"
    }
    else {
    let f = from.value.toLowerCase()
    let t = to.value.toLowerCase()
    let url = baseurl+f+".json";
    res = await fetch(url)
    data = await res.json()
    msg.innerHTML = amtval +"  "+f.toUpperCase()+"  =  "+(amtval*data[f][t]).toFixed(4)+"  "+t.toUpperCase();
    }
})