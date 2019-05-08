const serverUrl = `http://localhost:3000`;
const api = axios.create({
  baseURL: `${serverUrl}`
});

async function getBase(location) {
  const responsFromBase = await api.get(`${location}`);
  return responsFromBase.data;
};

async function renderCards() {
  const listings = await getBase('/players?_sort=id');
  const limitListings = listings.slice(0, 8);
  (async () => await _renderPlayerCard(listings, '.playersCards'))();
};

async function _renderPlayerCard(listings, location) {
  for (const player of listings) {
    const users = await getBase(`/players/${player.id}`);
    const $playersCards = $(`${location}`);
    const $player = $(
      `<div id="singlePlayerCard">
      <img class="Hea" src="${player.imgUrl}" alt="">

      <div class="singleCardText">
          <h3>${player.jerseyNo}</h3>
          <p>${player.name} <br>${player.lastName}</p>
      </div>
    </div>`);
    $player.appendTo($playersCards);
  }
};

function onLoadHTML() {
  const page = location.href;
  if (page.search('/players.html') >= 0) {
    return renderCards();
  }
};

$(document).on('load', onLoadHTML());