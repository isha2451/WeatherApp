const currlocation = document.getElementById('locationHead');
const temparature = document.getElementById('temp');
const climate = document.getElementById('climate');
const tempMin = document.getElementById('tempMin');
const tempMax = document.getElementById('tempMax');
const icon = document.querySelector('.weather-icon');
const moreinfo = document.getElementById('moreInfo');


const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('searchBtn');

  /* Users currents location*/
    window.addEventListener('load', () => {
        let lon;
         let lat;

         if(navigator.geolocation){
             navigator.geolocation.getCurrentPosition((position) => {
                lon = position.coords.longitude;
                            lat = position.coords.latitude;
                
                            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8d8130ce9780d2adb74f87eb67859567`;
                            

                            fetch(url).then((response) => {
                                //console.log(response.json());
                                return response.json();
                                
                        })

                        .then(data => {
                            const {name} = data;
                            const{feels_like, temp_min,temp_max} = data.main;
                            const {id, main} = data.weather[0];
                            const {icon} = data.weather[0];

                            currlocation.textContent = name;
                            temparature.textContent = `${(feels_like-273).toFixed(2)} ℃` ;
                            climate.textContent = main;
                           // icon.innerHTML= "http://openweathermap.org/img/w/" +icon + ".png' alt='Icon depicting current weather.'>";
                             tempMax.textContent = `${(temp_max-273).toFixed(2)} ℃`;
                            tempMin.textContent = `${(temp_min-273).toFixed(2)} ℃`;
                            //tempDetails.textContent = main;
                            console.log(data);
                        })
             })
         }
    })


    /*User search city*/

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        getWeather(searchInput.value);
        searchInput.value = "";
        
    });

    const getWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d8130ce9780d2adb74f87eb67859567`,
            {mode: 'cors'}
            );
            
            const weatherData = await response.json();
            const {name} = weatherData;
            const {feels_like, temp_min,temp_max } = weatherData.main;
            const {id, main} = weatherData.weather[0];

            currlocation.textContent = name;
            temparature.textContent = `${(feels_like-273).toFixed(2)} ℃`;
            climate.textContent = main;
            tempMax.textContent = `${(temp_max-273).toFixed(2)} ℃`;
            tempMin.textContent = `${(temp_min-273).toFixed(2)} ℃`;
    }
    catch(err){
        console.log(err);
    }
};

//JS chart

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Monday', 'Tuesday', 'thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'MAX Temprature',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'MIN Temprature',
            data: [23, 90, 55, 15, 18, 30],
            backgroundColor: [
                'rgba(103, 128, 159, 1  )',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
const updateBtn = document.getElementsByClassName('.update');
const city = searchInput.value;

function updateChart(city) {
     
    const response = fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt={cnt}&appid={API key}`)
    .then((response) => {
        console.log("chart Data " + response.json());
    });

    myChart.data.datasets[0].data = [10, 20, 30, 40, 50, 60]
    myChart.data.datasets[1].data = [80, 60, 30, 34, 23, 60]

    myChart.update();
}