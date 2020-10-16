window.onload = () => {
    const userInput = document.querySelector("#loc");
    const submit = document.querySelector("#submit");
    const region = document.querySelector(".regionName");
    const countryName = document.querySelector(".countryName");
    const population = document.querySelector(".populationTotal");
    const NOCInfected = document.querySelector(".NOCInfected");
    const NOCDeaths = document.querySelector(".NOCDeaths");
    const NOCRecovered = document.querySelector(".NOCRecovered");
    const NOCcriticalCase = document.querySelector(".NOCcriticalCase");
    const NOCActiveCase = document.querySelector(".NOCActiveCase");
    const NOCtotalCase = document.querySelector(".NOCtotalCase");
    const NOCrecentDeaths = document.querySelector(".NOCrecentDeaths");
    const NOCtotalTests = document.querySelector(".NOCtotalTests");
    const fetchingDataFromApi = async () => {
        const userLocation = userInput.value;
        if (userLocation === "") {
            alert("Please enter your location...");
            userInput.style.cssText = " border-left: 2px solid red;border-top: 2px solid red;border-bottom: 2px solid red;";
            submit.style.cssText = "border-right: 2px solid red;border-top: 2px solid red;border-bottom: 2px solid red;"
        }
        else {
            try {
                const url = fetch(`https://covid-193.p.rapidapi.com/history?country=${userLocation}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "covid-193.p.rapidapi.com",
                        "x-rapidapi-key": "1f98988481mshaf71d0b16041b35p14a73cjsn1e20a5387d6d"
                    }
                })
                    .then(response => {
                        return response.json();
                    }).then(result => {
                        const working = [result];
                        console.log(working);
                        region.innerHTML = working[0].response[0].continent;
                        countryName.innerHTML = working[0].parameters.country;
                        population.innerHTML = working[0].response[0].population;
                        NOCInfected.innerHTML = working[0].response[0].cases.total;
                        NOCDeaths.innerHTML = working[0].response[0].deaths.total;
                        NOCRecovered.innerHTML = working[0].response[0].cases.recovered;
                        NOCcriticalCase.innerHTML = working[0].response[0].cases.critical;
                        NOCActiveCase.innerHTML = working[0].response[0].cases.active;
                        NOCtotalCase.innerHTML = working[0].response[0].cases.new;
                        NOCrecentDeaths.innerHTML = working[0].response[0].deaths.new;
                        NOCtotalTests.innerHTML = working[0].response[0].tests.total;
                    })
                    .catch(err => {
                        alert("Enter a valid country name...");
                    });
                console.log(working);

            } catch (error) {

            }
        }
    }
    const fieldStyle = () => {
        userInput.style.cssText = " border-left: 2px solid green;border-top: 2px solid green;border-bottom: 2px solid green;";
        submit.style.cssText = "border-right: 2px solid green;border-top: 2px solid green;border-bottom: 2px solid green;"
    };
    userInput.addEventListener("click", fieldStyle);
    submit.addEventListener("click", fetchingDataFromApi);
}