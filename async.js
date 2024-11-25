/*
Task 1: Obtaining API Key and Configuration
Obtain an API key from the Marvel Comics API website. Investigate and understand the necessary configurations required to authenticate requests to 
the API.
Task 2: Fetching Characters Using Fetch API
Implement a function to fetch Marvel Comics characters asynchronously from the API endpoint using the Fetch API and promises. Utilize the API key 
and configurations obtained in Task 1. Log the fetched characters to the console.
Task 3: Updating User Interface Dynamically
Write a function to dynamically update the user interface with the fetched characters' information. Utilize promises and the Fetch API to ensure 
that the UI updates only after the characters are successfully fetched.
*/

async function fetchMarvelCharacters() {
    const publicKey = "4a9c153da2c8839e9a0dd10f27d4c624";
    const privateKey = "d76e0083d08a30096214f0947721e81d05bb1804";
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    const baseURL = 'http://gateway.marvel.com/v1/public/characters';
    const url = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched characters: ", data.data.results);
        return data.data.results;
    } catch (error) {
        console.error("Failed to fetch characters: ", error);
        return[];
    }
}

//task 3:
async function updateUIWithCharacters() {
    const charactersContainer = document.getElementById('characters-container');
    charactersContainer.innerHTML = '';

    const characters = await fetchMarvelCharacters();

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';

        characterCard.innerHTML = `
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}" />
            <h3>${character.name}</h3>
            <p>${character.description || 'No description available.'}</p>
        `;
        charactersContainer.appendChild(characterCard);
    });
}

updateUIWithCharacters("Spider-Man");