// Foursquare API Info
const clientId = '';
const clientSecret = '';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20201217`;

  try {
    // Sending GET request
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      let venues = jsonResponse.response.groups[0].items;
      venues = venues.map(place => place.venue);
      console.log(venues);
      return venues;
    }
  } catch(e) {
    console.log(e);
  }
}

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&appid=${openWeatherKey}`;
  try {
    // Sending GET request
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch(e) {
    console.log(e);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Represent individual venues
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    // console.log(venueIcon);
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;

    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
