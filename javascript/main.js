import { Cities }               from "./cities-loader.js";
import { Autocomplete }         from "./autocomplete.js";
import { WeatherSearcher }      from "./weather-searcher.js";
import { WeatherRenderer }      from "./weather-renderer.js";

class WeatherApp {
    constructor(config) {
        this.config = config;
        this.init();
    }

    async init() {

        this.weatherRenderer = new WeatherRenderer(
            this.config.inputBoxId,
            this.config.weatherOutputId, 
            this.config.dayCount,
            this.config.unitsType
        );

        this.weatherRenderer.loadDefaulCity(this.config.defaultCoord, this.config.apiKey);

        this.allCities = new Cities(this.config.cityDataSrc);

        //cekani na nacteni mest
        await this.allCities.loadCities();

        this.autocomplete = new Autocomplete(
            this.config.inputBoxId, 
            this.config.resultBoxId, 
            this.allCities.cities
        );

        this.weatherSearcher = new WeatherSearcher(
            this.config.apiKey,
            this.config.searchBtnId,
            this.config.inputBoxId,
            this.config.unitsType,
            this.allCities.cities
        );

        //nastaveni call back funkce
        this.weatherSearcher.weatherDataLoaded = (weatherData) => {
            this.weatherRenderer.renderData(weatherData);
        };
    }
}

const app = new WeatherApp({
    weatherOutputId: "weather-output",
    dayCount: 5,
    cityDataSrc: "../city_data/city.list.json",
    inputBoxId: "input-box",
    resultBoxId: "result-box",
    searchBtnId: "search-weather-btn",
    apiKey: "12e49942ab49cef19008daf14e55b97e",
    unitsType: "metric",
    defaultCoord: {lon: 17.251751, lat: 49.59552}
});
