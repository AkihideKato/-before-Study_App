$(document).ready(function() {
  $.post("http://api.openweathermap.org/data/2.5/weather?id=" + '1850147' + "&appid=c106b69af6ee65949b49ee148ad5b898&lang=ja&units=metric",
      function(json){
          $("#weather").html(json.weather[0].description);
          $("#humidity").html(json.main.humidity);
          $("#temp").html(Math.round(json.main.temp));
          
          switch (json.weather[0].main){
          case 'Clouds':
          $("#weatherMark").html("<img src='http://openweathermap.org/img/w/04d.png' >");
          break;
          case 'Snow':
          $("#weatherMark").html("<img src='http://openweathermap.org/img/w/13d.png' >");
          break;
          case 'Rain':
          $("#weatherMark").html("<img src='http://openweathermap.org/img/w/09d.png' >");
          break;
          case 'Clear':
          $("#weatherMark").html("<img src='http://openweathermap.org/img/w/01d.png' >");
          break;
          case 'Fog':
          $("#weatherMark").html("<img src='http://openweathermap.org/img/w/50d.png' >");
          break;
          case 'Mist':
          $("#weatherMark").html("<img src='http://openweathermap.org/img/w/50n.png' >");
          break;
          case 'Haze':
          $("#weatherMark").html("<img src='http://openweathermap.org/img/w/50d.png' >");
          break;
          default:
          $("#weatherMark").html("<img src='http://openweathermap.org/img/w/01n.png' >");
        }
        // setTimeout("location.reload()",10000);
    }
  );
});