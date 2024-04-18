// // Your code here
initialize();

const filmTitle = document.getElementById('title');
const runTime = document.getElementById('runtime');
const filmInfo = document.getElementById('film-info');
const showTime = document.getElementById('showtime');
const ticketNum = document.getElementById('ticket-num');
const button = document.getElementById('buy-ticket');
const poster = document.getElementById('poster');
const filmList = document.getElementById('films');

filmList.replaceChildren();

function getAllfilms(id = 1){
    fetch(`http://localhost:3000/films/${id}`) // Corrected URL format
    .then(res => res.json())
    .then(item => {
        setPosterDetails(item);
    })
    .catch(error => console.error('Error fetching films:', error));
}

function setPosterDetails(item){
    filmTitle.innerHTML = item.title;
    runTime.innerHTML = `${item.runtime} minutes`; // Added backticks for template literal
    filmInfo.innerHTML = item.description;
    showTime.innerHTML = item.showtime;
    poster.src = item.poster;
    ticketNum.innerHTML = item.capacity - item.tickets_sold;
    const remainingTickets = item.capacity - item.tickets_sold;
    ticketNumber(remainingTickets);
}

function listFilms(){
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(item => {
        item.forEach(film => {
            let filmItem = document.createElement('li');
            filmItem.textContent = film.title.toUpperCase();
            filmList.append(filmItem);
            filmItem.addEventListener('click', (e) => {
                e.preventDefault();
                setPosterDetails(film);
            });
        });
    })
    .catch(error => console.error('Error fetching film list:', error));
}

function ticketNumber(remainingTickets){
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (remainingTickets > 0){
            remainingTickets -= 1;
            ticketNum.textContent = remainingTickets;
        } else if (remainingTickets <= 0){ // Corrected condition
            button.textContent = "Sold Out";
            button.disabled = true; // Disable button when sold out
        }
    });
}

function initialize(){
    getAllfilms();
    listFilms();
}
