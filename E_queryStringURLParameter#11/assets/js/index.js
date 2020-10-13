
//window.onload = () => {
var date = document.querySelector(".datecs");
var time = document.querySelector(".timecs");
var userLocation = document.querySelector(".userLocation");
var wethConIcon = document.querySelector(".wethCondIcon");
var currentTemp = document.querySelector(".wethTemp");
var weekday = document.querySelector(".weekdaycs");
var userInput = document.querySelector("#location");
var submit = document.querySelector("#submit");
const getCurrDay = () => {
    var d = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    var n = weekdays[d.getDay()];
    return n;
}
const getCurrMonth = () => {
    var d = new Date();
    let yearMonth = ["January", "Fabuary", "March", "Aprail", "May", "June", "July", "August", "September", "Octuber", "November", "December"];
    var res = yearMonth[d.getMonth()];
    return res;
}
date.innerHTML = `${getCurrDay()} , ${new Date().getDate()} ${getCurrMonth()}`;
const getCurrTime = () => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let sec = new Date().getSeconds();
    let MN = "am";
    if (hours > 11) {
        MN = "pm";
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    time.innerHTML = `${hours}:${minutes}:${sec} ${MN}`;
}

// time.innerHTML = `${getCurrTime()}`;

// mian part fetching data from api using fetch
setInterval(getCurrTime, 1000);
weekday.innerHTML = `${getCurrDay()}`;
const userInputMan = async (event) => {
    event.preventDefault();
    const userValue = userInput.value;
    if (userValue === "") {
        alert("please enter a city name")
    }
    else {
        try {
            let urlApi = `http://api.openweathermap.org/data/2.5/weather?q=${userValue}&units=metric&appid=4331b45d1fe637fef6296514745974f8`;
            const response = await fetch(urlApi);
            const readableData = await response.json();
            const arrObj = [readableData];
            console.log(arrObj[0].name);
            console.log(arrObj[0].main.temp);
            console.log(arrObj[0].weather[0].main);
            userLocation.innerHTML = `${arrObj[0].name},${arrObj[0].sys.country}`;
            currentTemp.innerHTML = `${Math.round(arrObj[0].main.temp)} &deg;C `;
            const wetCondition = arrObj[0].weather[0].main;
            console.log(wetCondition);

            switch (wetCondition) {
                case "Clear":
                    wethConIcon.innerHTML = "<i style='color:#fff;transform: scale(6);' class='far fa-sun'></i>";
                    break;
                case "Clouds":
                    wethConIcon.innerHTML = "<i style='color:#fff;transform: scale(6);' class='fas fa-poo-storm'></i>";
                    break;
                case "Rain":
                    wethConIcon.innerHTML = "<i style='color:#fff;transform: scale(6);' class='fas fa-cloud-showers-heavy'></i>";
                    break;
                default:
                    wethConIcon.innerHTML = "<i style='color:#fff;transform: scale(6);' class='far fa-sun'></i>";
            }
        }
        catch (error) {
            alert(`Please enter a valid city name ${error}`);
        }
    }
}
submit.addEventListener("click", userInputMan);
//}
