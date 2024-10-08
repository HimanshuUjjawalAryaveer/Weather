// f77ea5b684c7006a798d93c32df85e27
// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f77ea5b684c7006a798d93c32df85e27
// https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=f77ea5b684c7006a798d93c32df85e27

let input = document.querySelector("input");
let h1 = document.querySelector("h1");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let p3 = document.querySelector("#p3");
let p4 = document.querySelector("#p4");
let p5 = document.querySelector("#p5");
let p6 = document.querySelector("#p6");
let p7 = document.querySelector("#p7");
let p8 = document.querySelector("#p8");
let p9 = document.querySelector("#p9");
let i1 = document.querySelector("#i1");


document.addEventListener("keypress", (event) => {
    if(event.key == "Enter") {
        let city = input.value;
        wheather(city);
        input.value = "";
    }
})


const wheather = async (city) => {
    const wheatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f77ea5b684c7006a798d93c32df85e27`;
    try {
        const data = await fetch(wheatherUrl);
        const realData = await data.json();
        let {dt, main, sys, weather, wind} = realData;
        setName(sys.country, city);
        set(dt);
        setStatus(weather[0].main);
        p3.innerHTML = setTemperature(main.temp);
        p4.innerHTML = `Min : ` + setTemperature(main.temp_min);
        p5.innerHTML = `Max : ` + setTemperature(main.temp_max);
        p6.innerHTML = setTemperature(main.feels_like);
        p7.innerText = main.humidity + "%";
        p8.innerText = wind.speed + " m/s";
        p9.innerText = main.pressure + " hPa";
        i1.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}.png"/>`;
    } catch (err) {
        console.log(err);
    }
}

wheather("delhi");

function setTemperature(temp) {
    let newTemp = (temp-273).toFixed(2);
    return `${newTemp}&#176`+`C`;
}

function setStatus(status) {
    p2.innerText = status;
}
function set(dt) {
    let date = new Date(dt*1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    p1.innerText = formatter.format(date);
}
function format(para) {
    let st = String(para);
    if(st.length == 1) {
        return "0" + st;
    } else {
        return st;
    }
}

function setName(code, city) {
    let name = new Intl.DisplayNames([code], {type: "region"}).of(code);
    h1.innerText = `${city}, ${name}`;
}
