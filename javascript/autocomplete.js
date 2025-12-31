
export class Autocomplete {
    /*
    Trida zodpovedna za logiku naseptavace
    */
    constructor(inputBox, resultBox , cities) {
        /**
         * @param {string} inputBox - ID input elementu pro vyhledavani
         * @param {string} resultBox - ID elementu, kde se ma naseptava ukazovat
         * @param {list} cities - pole objektu mest
         */
        this.inputBox = document.getElementById(inputBox);
        this.resultBox = document.getElementById(resultBox);
        this.cities = cities;

        this.inputBox.addEventListener("keyup", () => this.onkeyUp());
    }
    normalizeInput(input) {
        /*
        Metoda pro odignorovani diakritiky a velikosti pisma pro lepsi filtraci hledani
        */
        let asciiInput = input.normalize('NFKD').replace(/[^\w\s.-_\/]/g, '');
        let normalizedInput = asciiInput.toLowerCase();
        return normalizedInput;
    }

    onkeyUp() {
        /*
        Metoda, ktera se provadi pri psani znaku do inputBox
        */
        let result = []; //pole pro uchovani objektu mest
        let input = this.inputBox.value;

        if(input.length) {
            result = this.cities.filter(city => {
                return this.normalizeInput(city.name).includes(this.normalizeInput(input));
            });
        }

        this.display(result.map(city => city.name));
    }

    display(resultNames) {
        /*
        Metoda pro samotne vypsani seznamu vhodnych mest
        */

        this.resultBox.innerHTML = ""; //zresetovani vysledku naseptavace - odstraneni kontentu uvnitr elementu


        //seznam validnich mest jako seznam
        const validCitiesList = document.createElement("ul");

        resultNames.forEach(cityName => {
            //validni mesto jako radek/cast seznamu
            const validCity = document.createElement("li"); 

            //vlozeni nazvu mesta do radku
            validCity.textContent = cityName;

            //kdyz se klikne na tento radek, vlozi se kontent tohoto radku do hledacku a smaze se nabidka naseptavace
            validCity.addEventListener("click", () => {
                this.inputBox.value = cityName;      
                this.resultBox.innerHTML = ""; 
            });

            //pridani validniho mesta do seznamu/vlozeni dalsiho radku do seznamu
            validCitiesList.appendChild(validCity);
        });

        //vlozeni celeho seznamu do elementu
        this.resultBox.appendChild(validCitiesList);
    }
}