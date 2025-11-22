let eventsData = [];

// Load events JSON
fetch('../events/events.json')
  .then(res => res.json())
  .then(data => {
    eventsData = data;
    renderEvents('upcoming'); // default filter
  });

// Listen to dropdown changes
const select = document.getElementById('events-select');
select.addEventListener('change', () => {
  renderEvents(select.value);
});

// Render function
function renderEvents(filter) {
  const container = document.getElementById('events-container');
  container.innerHTML = '';

  const today = new Date();

  const filtered = eventsData.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'past') return new Date(event.date) < today;
    if (filter === 'upcoming') return new Date(event.date) >= today;
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p>No events found.</p>';
    return;
  }

  filtered.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('event-card');

    card.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p>${event.description}</p>
      ${event.instagram ? `<a href="${event.instagram}" target="_blank">Instagram Post</a>` : ''}
    `;

    container.appendChild(card);
  });
}
