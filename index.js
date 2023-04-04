document.addEventListener('DOMContentLoaded', () => {               //allows us to see the movie details when the DOM loads
    const movie = document.querySelector('#movie');
    const buyTicketBtn = movie.querySelector('#buyTicketBtn');
    const availableTickets = movie.querySelector('#availableTickets');
    let films = [];
    let currentMovie = 0;
  
    fetch('http://localhost:3000/films')    //this gets our data from db.json
      .then(response => response.json())
      .then(data => {
        films = data;
        displayMovie();
      })
      .catch(error => console.error(error));
  
      // this code allows us to display the following on the DOM and calculate available tickets
    function displayMovie() {
      const film = films[currentMovie];
      const movieTitle = movie.querySelector('#title');
      const moviePoster = movie.querySelector('#poster');
      const movieRuntime = movie.querySelector('#runtime');
      const movieShowtime = movie.querySelector('#showtime');
      const movieAvailableTickets = movie.querySelector('#availableTickets');
      const movieCapacity = movie.querySelector('#capacity');
      const movieTicketsSold = movie.querySelector('#ticketssold');
  
      movieTitle.textContent = film.title;
      moviePoster.src = film.poster;
      movieRuntime.textContent = `Runtime: ${film.runtime} min`;
      movieShowtime.textContent = `Showtime: ${film.showtime}`;
      movieCapacity.textContent = `Capacity: ${film.capacity}`;
      movieTicketsSold.textContent = `Tickets sold: ${film.tickets_sold}`;
  
      const availableTicketsCount = parseInt(movieCapacity.textContent.split(' ')[1]) - parseInt(movieTicketsSold.textContent.split(' ')[2]);
      movieAvailableTickets.textContent = `Available tickets: ${availableTicketsCount}`;
    }
  
    //makes the webpage more interactive by being able to buy a movie ticket
    buyTicketBtn.addEventListener('click', () => {
      const availableTicketsCount = parseInt(availableTickets.textContent.split(' ')[2]);
      if (availableTicketsCount > 0) {
        const film = films[currentMovie];
        film.tickets_sold++;
        displayMovie();
      } else {
        alert('Sorry, this showing is sold out.');
      }
    });
  
    //this allows us to get the title and display them in list form as our menu
    const filmsList = document.querySelector('#films');
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(data => {
        data.forEach(film => {
          const listItem = document.createElement('li');
          listItem.textContent = film.title;
          listItem.addEventListener('click', () => {
            currentMovie = data.indexOf(film);
            displayMovie();
          });
          filmsList.appendChild(listItem);
        });
      })
      .catch(error => console.error(error));
  });
  