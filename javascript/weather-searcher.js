export class WeatherSearcher {
    /*
    Trida pro obsluhu vyhledani informaci o pocsi ve vyhledavanem meste
    */
    constructor(apiKey, searchButton, inputBox, unitsType, cities) {
        /**
         * Konstruktor pro inicializaci. Pridava eventListener na "click" pro tlacitko.
         * @param {API KEY} apiKey - API key
         * @param {string} searchButton - ID tlacitka, ktere slouzi pro "vyhledat"
         * @param {string} inputBox - ID inputu, do ktereho se pise hledane mesto
         * @param {string} unitsType - urceni jednotek - standard(Kelvin)/metric/imperial
         * @param {list} cities - pole objektu mest 
         */
        this.apiKey = apiKey;
        this.searchButton = document.getElementById(searchButton);
        this.inputBox = document.getElementById(inputBox);
        this.unitsType = unitsType;
        this.cities = cities;

        this.searchButton.addEventListener("click", () => this.searchWeather());

        //pripravene pro call back funkci
        this.weatherDataLoaded = null;

        this.weatherData = null;
    }

    correctCity(result) {
        /*
        Filter nefiltruje dokonale. Napriklad inputu "Jeseník" odpovídá "Jeseník" a zároveň "Jeseník nad Odrou".
        Proto by nastala situace, ze pro input "Jeseník" bychom dostaly data pro "Jeseník nad odrou", kdybychom automaticky brali
        první objekt v poli objektu result.

        Proto existuje tato funkce, ktera z objektu v poli result vybere objekt s kratsim nazvem.
        */
        let resultIndex = 0;
        let letterCount = result[0].name.length;
        for(let i=0;i<result.length;i++) {
            if(result[i].name.length < letterCount) {
                letterCount = result[i].name.length;
                resultIndex = i;
            }
        }
        return resultIndex;
    }
    searchObject() {
        /*
        Funkce pro ziskani objektu mesta podle nazvu mesta v hledacku
        */
        let input = this.inputBox.value;
        let result = [];

        result = this.cities.filter(city => {
            return city.name.toLowerCase().includes(input.toLowerCase());
        });
        
        if(result.length > 1) { //kdyz existuje vice mest, kde nazev jednoho z mest je prodlouzeni nazvu mesta jineho
            return result[this.correctCity(result)];
        }
        return result[0];
    }

    async searchWeather() {
        /*
        Řídící metoda pro obsluhu vyhledání počasí pro zadané město
        */
        let result = this.searchObject();
        
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${result.coord.lat}&lon=${result.coord.lon}&appid=${this.apiKey}&units=${this.unitsType}&lang=cz`);
        this.weatherData = await response.json();
        // ^ "weatherData" nyni obsahuje udaje o predpovedi pocasi pro zadane mesto na 5 dni dopredu s 3hod rozestupy. Celkem tedy 40 zaznamu
        
        //pokud se nastavila callback funkce, zavola se. Call back funkce se nastavuje v mainu
        if (typeof this.weatherDataLoaded === "function") {
            this.weatherDataLoaded(this.weatherData);
        }
    }
}