const fs = require('fs');
let powerOfSets = 0;

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

      let maxRedCubes = 0;
      let maxGreenCubes = 0;
      let maxBlueCubes = 0;

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

          if (counts.hasOwnProperty(color)) {
            counts[color] += parseInt(count, 10);
          } else {
            counts[color] = parseInt(count, 10);
          }
        }

        // Update max counts
        maxRedCubes = Math.max(maxRedCubes, counts.red);
        maxGreenCubes = Math.max(maxGreenCubes, counts.green);
        maxBlueCubes = Math.max(maxBlueCubes, counts.blue);
      }

      powerOfSets += maxRedCubes * maxGreenCubes * maxBlueCubes;
    }
  });

  console.log(`Power of Sets: ${powerOfSets}`);
} catch (error) {
  console.error(error);
}
