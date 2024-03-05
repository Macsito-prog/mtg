/*commander*/

const cardResult = document.getElementById('card-result');

async function fetchCards(query) {
    const response = await fetch(`https://api.magicthegathering.io/v1/cards?name=${query}&supertypes=Legendary`);
    const data = await response.json();
    return data.cards;
}

function displayCards(card) {
    cardResult.innerHTML = `
    <h2>${card.name}</h2>
    <img src="${card.imageUrl}" alt="${card.name}" />
    `;
}

function searchCard(query) {
    if (!query) {
        cardResult.innerHTML = '';
        return;
    }

    fetchCards(query).then(cards => {
        if (cards.length === 0) {
            cardResult.innerHTML = '';
            return;
        }

        const card = cards[0];
        displayCards(card);
    }).catch(error => {
        console.error(error);
        cardResult.innerHTML = 'An error occurred';
    });
}



let life = 40;

function lifeCounter(param) {
    if (param === 1) {
        life++;
    } else if (param === -1) {
        life--;
    }
    document.getElementById('lifeCounter').textContent = `Tienes ${life} de vida`;
    if (life === 0) {
        document.getElementById('lifeCounter').textContent = `Perdiste, te quedaste sin vida`;
    }
    return life;
}

window.onload = function () {
    document.getElementById('lifeCounter').textContent = `Tienes ${life} de vida`;
}

/* Index */

/* Datos Falsos*/

