const $app = document.querySelector('.app');
const $loading = document.querySelector('.loading');
const $flexContainer = document.querySelector('.flex-container');
const $activePlayers = document.querySelector('.active-players');
var tmplActiveUser = document.querySelector('#activeUser');

function setLoading(isLoading) {
  $app.style.display = isLoading ? 'none' : 'flex';
  $loading.style.display = isLoading ? 'block' : 'none';
};

function buildActiveUsers(activeUsers) {
    activeUsers?.forEach(user => {
        const clone = tmplActiveUser.content.cloneNode(true);
        const img = clone.querySelector('img');
        img.src = `/assets/icons/${user.hero}.png`
        img.alt = user.user_name;

        const player = clone.querySelector('.player-name');
        player.innerText = user.user_name;

        $activePlayers.appendChild(clone);
    });

    setLoading(false);
}

async function run() {
    setLoading(true);

    const res = await fetch('https://api.diablo.run/active-users');
    const activeUsers = await res.json();

    buildActiveUsers(activeUsers);
}


run();
