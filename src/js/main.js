const serverUrl = `http://localhost:3000`;
const api = axios.create({
  baseURL: `${serverUrl}`
});

async function getBase(location) {
  const responsFromBase = await api.get(`${location}`);
  return responsFromBase.data;
};

async function renderAds() {
  const listings = await getBase('/players?_sort=id&_order=desc');
  const limitListings = listings.slice(0, 8);
  (async () => await _render_small(limitListings, '.playersCards'))();
  $('body').removeAttr('onload');
};

async function _render_small(listings, location) {
  for (const player of players) {
    const users = await getBase(`/players/${players.id}`);
    const $adsContainer = $(`${location}`);
    const $ad = $(`<div id="singlePlayerCard">
      <img class="Hea" src="${ad.imgUrl}" alt="">

      <div class="singleCardText">
          <h3>${ad.jerseyNo}</h3>
          <p>${ad.name} <br>${ad.lastName}</p>

      </div>
  </div>`);
    $ad.appendTo($adsContainer);
    // $(`.image_${ad.id}`).on('click', () => fullAds(ad.id));
    // $(`#fav_${ad.id}`).on('click', addToFavorites);
  }
};

function onLoadHTML() {
  const page = location.href;
  if (page.search('/players.html') >= 0) {
      return renderAds();
  }
  //  else if (page.search('/ad.html') >= 0) {
  //     return renderFullAds();
  // } else if (page.search('/publish_ad.html') >= 0) {
  //     return loadAdToForm();
  // } else if (page.search('/user_panel.html') >= 0) {
  //     return usersAds();
  // }
};

$(document).on('load', onLoadHTML());