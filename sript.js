document.addEventListener("DOMContentLoaded", () => {
    const SearchInput = document.getElementById("search-input");
    const SearchButton = document.getElementById("search-button");
  
    const pokemon_name = document.getElementById("pokemon-name");
    const pokemon_weight = document.getElementById("weight");
    const pokemon_id = document.getElementById("pokemon-id");
    const pokemon_height = document.getElementById("height");
    const pokemon_types = document.getElementById("types");
    const hp = document.getElementById("hp");
    const attack = document.getElementById("attack");
    const defense = document.getElementById("defense");
    const spec_attack = document.getElementById("special-attack");
    const spec_def = document.getElementById("special-defense");
    const speed = document.getElementById("speed");
    const sprite_con = document.getElementById("sprite-con");
  
    const getPokemon = async () => {
      try {
        const poke_name_id = SearchInput.value.toLowerCase().trim();
        if (!poke_name_id) {
          alert("Please enter a Pokémon name or ID.");
          return;
        }
  
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${poke_name_id}`);
        if (!res.ok) {
          throw new Error("Pokémon not found");
        }
  
        const data = await res.json();
        setPokemonInfo(data);
      } catch (err) {
        alert("Pokémon not found");
        console.log(err);
      }
    };
  
    const setPokemonInfo = (data) => {
      const { name, id, weight, height, types, sprites, stats } = data;
  
      pokemon_name.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      pokemon_id.textContent = `#${id}`;
      pokemon_weight.textContent = `Weight: ${weight} `;
      pokemon_height.textContent = `Height: ${height}`;
      hp.textContent = `${stats[0].base_stat}`;
      attack.textContent = `${stats[1].base_stat}`;
      defense.textContent = `${stats[2].base_stat}`;
      spec_attack.textContent = `${stats[3].base_stat}`;
      spec_def.textContent = `${stats[4].base_stat}`;
      speed.textContent = `${stats[5].base_stat}`;
  
      // Handle types
      pokemon_types.innerHTML = ''; // Clear previous types
      types.forEach(typeInfo => {
        const typeSpan = document.createElement('span');
        typeSpan.textContent = typeInfo.type.name.toUpperCase();
        pokemon_types.appendChild(typeSpan);
      });
  
      // Handle sprite
     sprite_con.innerHTML = ''; // Clear previous sprite
      if (sprites.front_default) {
        const img = document.createElement('img');
        img.id = "sprite"; // Add an id to the img element
        img.src = sprites.front_default;
        sprite_con.appendChild(img);
      } else {
        sprite_con.textContent = "No image available"; 
      }
    };
  
    SearchButton.addEventListener("click", (e) => {
      e.preventDefault();
      getPokemon();
    });
  });

if (SearchButton.textContent == ''){
  pokemon_name.textContent = ' ';
  pokemon_id.textContent = ' ';
  pokemon_weight.textContent = '';
  pokemon_height.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  spec_attack.textContent = '';
  spec_def.textContent = '';
  speed.textContent = '';
}