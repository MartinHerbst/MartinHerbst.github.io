export class Weather {
    /*
    Trida pro ziskavani informaci o pocasi
    */
    constructor(data) {
        /**
         * @param {list} data - pole s udaji o pocasi pro dany casovy interval
         */

        this.data = data;
    }

    get_date(index) {
        return new Date(this.data[index].dt * 1000);
    }

    get_time(index) {
        const date = this.get_date(index);

        let time = new Intl.DateTimeFormat(navigator.language, {hour: "2-digit", minute: "2-digit"}).format(date);
        if(time.charAt(0) == "0") { time = time.slice(1) };

        return time;
    }

    get_dayDate(index) {
        const date = this.get_date(index);

        return new Intl.DateTimeFormat(navigator.language, {day: "2-digit", month: "2-digit", year: "numeric"}).format(date);
    }

    get_weekDay(index) {
        const date = this.get_date(index);

        const day = new Intl.DateTimeFormat(navigator.language, {weekday: "long"}).format(date);
        return day.charAt(0).toUpperCase() + day.slice(1);
    }

    get_temp(index) {
        return Math.round(this.data[index].main.temp * 10) / 10;
    }

    get_feelsLike(index) {
        return Math.round(this.data[index].main.feels_like * 10) / 10;
    }

    get_humidity(index) {
        return this.data[index].main.humidity;
    }

    get_tempMin(index) {
        return Math.round(this.data[index].main.temp_min * 10) / 10;
    }

    get_tempMax(index) {
        return Math.round(this.data[index].main.temp_max * 10) / 10;
    }

    get_skyStatus(index) {
        return this.data[index].weather[0].description;
    }

    get_windSpeed(index) {
        return this.data[index].wind.speed;
    }

    get_weatherIconSrc(index) {
        return `https://openweathermap.org/img/wn/${this.data[index].weather[index].icon}@2x.png`;
    }

    get_weatherDescription(index) {
        return this.data[index].weather[index].description;
    }
}