const playwright = require('@playwright');
const {test, expect} = require('@playwright/test')

test('Demo',async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Fetch all Pokemon data
  const response = await page.goto('https://pokeapi.co/api/v2/pokemon/');
  const pokemonData = await response.json();

  // Select 3 random Pokemon
  const randomPokemon = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * pokemonData.results.length);
    randomPokemon.push(pokemonData.results[randomIndex].name);
  }

  const pokemonAbilities = [];

  // Fetch and log abilities for each Pokemon
  for (const pokemon of randomPokemon) {
    const abilityResponse = await page.goto(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const pokemonDetails = await abilityResponse.json();

    const abilities = pokemonDetails.abilities.map(ability => ability.ability.name);
    pokemonAbilities.push({ name: pokemon, abilities });

    console.log(`${pokemon}'s abilities: ${abilities.join(', ')}`);
  }

  // Return the JSON array
  const result = JSON.stringify({ pokemon: pokemonAbilities });
  console.log(result);

  // Bonus: Simulate community voting and render results (replace with actual voting logic)
  const strongestTeam = 'Charizard, Machamp, Alakazam'; // Replace with community-voted team

  await page.setContent(`
    <h1>Strongest Team (Bonus): ${strongestTeam}</h1>
  `);

  await browser.close();
})();
