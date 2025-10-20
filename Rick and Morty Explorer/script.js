const characterList = document.getElementById('character-list');
const loadMoreButton = document.getElementById('load-more');
let currentPage = 1;

async function fetchCharacters(page) {
    try {
        const response = await fetch
        (`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        // CORREÇÃO 1: O array de personagens é 'results', não 'result'
        if (data.results) {
            displayCharacters(data.results);
        } else {
            // Se não houver mais páginas ou personagens na resposta.
            console.error('No more characters found or API error.');
            loadMoreButton.disabled = true; // Desabilita o botão se não houver mais resultados
            loadMoreButton.textContent = 'Sem mais personagens';
        }
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

function displayCharacters(characters) {
    // CORREÇÃO 2: Variável deve ser 'character' no singular, não 'characters'
    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        const image = document.createElement('img');
        image.src = character.image;
        // CORREÇÃO 3: Usar '=' para atribuição, não '-'
        image.alt = character.name; 

        const name = document.createElement('h2');
        name.textContent = character.name;

        const status = document.createElement('p');
        status.textContent = `Status: ${character.status}`;

        const species = document.createElement('p');
        species.textContent = `Species: ${character.species}`;

        characterCard.appendChild(image);
        characterCard.appendChild(name);
        characterCard.appendChild(status);
        characterCard.appendChild(species);
        characterList.appendChild(characterCard);
    }); 
}

loadMoreButton.addEventListener('click', () => {
    currentPage++;
    fetchCharacters(currentPage);
});

fetchCharacters(currentPage);
// CORREÇÃO 4: Remove a chave de fechamento extra aqui que quebra o escopo.