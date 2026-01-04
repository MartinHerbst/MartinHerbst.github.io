export class Cities {
    /*
    Trida zodpovedna za nacitany dat z json souboru
    */
    constructor(cityData) {
        /**
         * @param {json} cityData - json soubor s daty mest
         */
        this.cityData = cityData;
        this.cities = [];
    }

    async loadCities() {
        const response = await fetch(this.cityData);
        this.cities = await response.json();

        return this.cities;
    }
}