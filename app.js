const pokedex = document.querySelector('#pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map(data => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', '),
            ability: data.abilities.map((obj) => {
                return obj.ability.name
            }).join(', '),
            type: data.types.map((ty) => {
                return ty.type.name
            }).join(', '),
            bgColorType: data.types.map((ty) => {
                return ty.type.name   
            })[0]
        }))

        displayPokemon(pokemon)
    })
};

const bgRelation = {
    grass: 'forestgreen',
    fire: 'red',
    water: 'dodgerblue',
    bug: 'yellowgreen',
    flying: 'cornflowerblue',
    poison: 'purple',
    normal: 'gray',
    electric: 'yellow',
    ground:  'burlywood',
    fairy: 'pink',
    fighting: 'darkred',
    psychic: 'violet',
    rock: 'brown',
    steel: 'slategray',
    ice: 'lightskyblue',
    ghost: 'mediumorchid',
    dragon: 'blue',
    dark: 'darkslategray',
}

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokeman => `
    <li style='background-color: ${bgRelation[pokeman.bgColorType]}' class='card'>
        <img class='card-img' src='${pokeman.image}'/>
        <h2 class='card-title'>${pokeman.id}. ${pokeman.name}</h2>
        <p class='card-subtitle'>Tipo: ${pokeman.type}</p>
        <p class='card-subtitle'>Habilidade: ${pokeman.ability}</p>
    </li>
    `).join('')
    pokedex.innerHTML = pokemonHTMLString
}


fetchPokemon();
