import { DOMBuilder } from "./dom-builder.js";
import { Weather } from "./weather.js";

export class WeatherRenderer {
    /*
    Ridici trida pro generovani DOM struktury widgetu pocasi
    */
    constructor (input, weatherOutput, dayCount, unitsType) {
        /**
         * @param {string} input - ID inputu pro vyhledavani
         * @param {string} weatherOutput - ID elementu, ve kterem se struktura vytvori
         * @param {number} dayCount - pocet dni
         * @param {string} unitsType - urceni jednotek - standard(Kelvin)/metric/imperial
         */

        this.input = document.getElementById(input);
        this.weatherOutput = document.getElementById(weatherOutput);
        this.dayCount = dayCount;

        this.unitsType = unitsType;

        this.speedUnit = "km/h";
        this.tempUnit = "°C";
        if (this.unitsType == "imperial") {
            this.tempUnit = "°F"
            this.speedUnit = "mph"
        }
    }

    renderData(weatherData, defaultCity=null) {
        /*
        Ridici metoda pro vypis udaju o pocasi
        */
        var cityName = this.input.value;
        if (this.input.value == ""){
            cityName = "Olomouc";
        }
        if(defaultCity) {       //je potreba zvlast nastavit pro defaultni mesto
            cityName = defaultCity;
        }

        const treeList = [];    //pole pro ukladani DOM stromu pro jednotlive dny
        for(let i=0; i<this.dayCount; i++) {

            let start = i*((weatherData.list.length)/this.dayCount);
            let end = ((i+1)*((weatherData.list.length)/this.dayCount));
            let chunk = weatherData.list.slice(start, end);

            treeList[i] = this.treeConstructor(cityName, this.dayCount, chunk, weatherData, i);    //chunk momentalne obsahuje jen 8 zaznamu pro samostatny den
        }
        
        this.completeTreeList = treeList;
        this.switchDay();
    }

    treeConstructor(cityName, dayCount, chunk, weatherData, index) {
        /*
        Metoda pro postaveni konkretniho DOM stromu - widgetu podle zadanych parametru
        */

        const builder = new DOMBuilder();
        const weatherDay = new Weather(chunk); //zaznamy pro konkretni den
        const weatherWeek = new Weather(weatherData.list); //vsechny zaznamy pro vsechny dny - potreba k spravnemu zobraeni nabidky dnu

        builder.appendHeading("h1", cityName);

        const wrapper = builder.appendDiv("wrapper");
        builder.setParent(wrapper);

        //------------------------------------------------------------------- innerOne
        const innerOne = builder.appendDiv("inner-one");
        builder.setParent(innerOne);

        const mainInfoWrapper = builder.appendDiv("main-info");
        builder.setParent(mainInfoWrapper);

        const mainInfoVisual = builder.appendDiv("main-info-visual");
        builder.setParent(mainInfoVisual);

        builder.appendImg(weatherDay.get_weatherIconSrc(0), weatherDay.get_weatherDescription(0));

        builder.setParent(mainInfoWrapper);

        const mainInfoData = builder.appendDiv("main-info-data");
        builder.setParent(mainInfoData);
        
        builder.appendHeading("h2", weatherDay.get_weekDay(0) + " " + weatherDay.get_dayDate(0));
        builder.appendHeading("h2", weatherDay.get_time(0));
        builder.appendHeading("h1", weatherDay.get_temp(0) + this.tempUnit);
        builder.appendParagraph("pocitově " + weatherDay.get_feelsLike(0) + this.tempUnit);
        builder.appendParagraph("vítr " + weatherDay.get_windSpeed(0) + this.speedUnit);
        builder.appendParagraph(weatherDay.get_skyStatus(0));

        builder.setParent(wrapper);

        const timeLine = builder.appendDiv("time-line");
        builder.setParent(timeLine);

        for(let i=0;i<chunk.length;i++) { 
            let step = builder.appendDiv(`step-${i+1}`);
            builder.setParent(step);
            builder.appendHeading("h4", weatherDay.get_skyStatus(i));
            builder.appendHeading("h4", weatherDay.get_temp(i) + this.tempUnit);
            builder.appendHeading("h4", weatherDay.get_time(i));
            builder.setParent(timeLine);
        }
    
        //------------------------------------------------------------------- innerTwo
        builder.setParent(wrapper);
        
        const innerTwo = builder.appendDiv("inner-two");
        builder.setParent(innerTwo);

        for(let i=0;i<dayCount;i++){
            let daySwitch = builder.appendDiv(`day-switch-${i+1}`);
            if(index == i) {
                daySwitch.classList.add("active");
            }
            daySwitch.addEventListener("click", () => {
                this.switchDay(i);    //nastaveni prepinani dnu pro jednotlive DOM div elementy .day-switch-[0-*]
            })
            builder.setParent(daySwitch);

            builder.appendHeading("h3", weatherWeek.get_weekDay(i*(weatherWeek.data.length/dayCount)));
            builder.appendHeading("h3", weatherWeek.get_dayDate(i*(weatherWeek.data.length/dayCount)));
            builder.appendHeading("h2", cityName);

            builder.setParent(innerTwo);
        }

        builder.setParent(builder.root);
        return builder.root;
    }


    switchDay(index = 0) {
        /*
        Metoda pro prepinani widgetu podle zvoleneho dne
        */
        this.weatherOutput.innerHTML = "";
        //let root = this.completeTreeList[index];
        //root.querySelector(`.day-switch-${index+1}`).classList.add('active');
        this.weatherOutput.appendChild(this.completeTreeList[index]);
    }

    async loadDefaulCity(coord, apiKey) {
        /*
        Pri otevreni stranky se nactou data k tomuto mestu

        Moznost rozsirit o funkcionalitu a pri otevreni stranky nacitat mesto pomoci geolokace
        */
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${this.unitsType}&lang=cz`);
        let weatherData = await response.json();

        this.renderData(weatherData, weatherData.city.name);
    }
}
