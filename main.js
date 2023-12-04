const fs = require('fs');
let totalOfGameNumbers = 0;
let gameNumber = 0;
const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

// Maximum number of cubes:
// 12 RED cubes
// 13 GREEN cubes
// 14 BLUE cubes

try {
  const data = fs.readFileSync('strings.txt', 'utf8');
  const parsedData = data.split('\r\n');
  parsedData.forEach((game) => {
    const regex = /Game (\d+):/;
    const regexMatch = game.match(regex);
    if (regexMatch) {
      gameNumber = parseInt(regexMatch[1], 10); 
      const removeGameId = game.replace(/Game \d+: /g, '');
      const individualMatches = removeGameId.split(';');
      console.log(`Game Number - ${gameNumber}`);
      for (let individualMatch = 0; individualMatch < individualMatches.length; individualMatch++) {
        const matches = individualMatches[individualMatch].match(/(\d+) (\w+)/g);

        const counts = {
          red: 0,
          green: 0,
          blue: 0,
        };

        // Divide the cube colors and count of color cubes
        for (const match of matches) {
          const [count, color] = match.split(' ');
          counts[color] += parseInt(count, 10);
        }

        // Check the conditions
        const isBelowMaxRedCubes = counts.red <= redCubes;
        const isBelowMaxGreenCubes = counts.green <= greenCubes;
        const isBelowMaxBlueCubes = counts.blue <= blueCubes;

        // Print the results
        console.log(`Line: ${individualMatches[individualMatch].trim()}`);
        console.log(`Red condition: ${isBelowMaxRedCubes}`);
        console.log(`Green condition: ${isBelowMaxGreenCubes}`);
        console.log(`Blue condition: ${isBelowMaxBlueCubes}`);
        console.log('----------------');

        // If any conditions are false, then we don't need the rest of the matches
        if (!isBelowMaxRedCubes || !isBelowMaxGreenCubes || !isBelowMaxBlueCubes) {
          break;
        }
        // If we are on the last individual match, then we know all matches are below the number of each cubes
        if (individualMatch === individualMatches.length - 1) {
          totalOfGameNumbers += gameNumber;
          console.log(`Add Game ID ${gameNumber}: ${totalOfGameNumbers}`);
        }
      }
      console.log('//////////////////////////////////////');
    }
  });
  console.log(`Total of Game IDs: ${totalOfGameNumbers}`);
} catch (error) {
  console.error(error);
}
