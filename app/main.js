function matchPattern(inputLine, pattern) {
   function createRegexFromPattern(part) {
      if (part === "\\d") {
         return "\\d";
      } else if (part === "\\w") {
         return "\\w";
      } else if (/^\[.*\]$/.test(part) && !part.startsWith("[^")) {
         const characters = part.slice(1, -1);
         return `[${characters}]`;
      } else if (/^\[\^.*\]$/.test(part)) {
         const characters = part.slice(2, -1);
         return `[^${characters}]`;
      } else {
         return part;
      }
   }

   if (pattern.includes(" ")) {
      const patternParts = pattern.split(/\s+/);
      let regexPattern = "";
      for (const part of patternParts) {
         regexPattern += createRegexFromPattern(part) + "\\s*";
      }
      regexPattern = regexPattern.trim();

      const regex = new RegExp(`${regexPattern}`, "i");
      return regex.test(inputLine);
   } else {
      const regex = new RegExp(`${createRegexFromPattern(pattern)}`, "i");
      return regex.test(inputLine);
   }
}

function main() {
   const pattern = process.argv[3];
   const inputLine = require("fs").readFileSync(0, "utf-8").trim();

   if (process.argv[2] !== "-E") {
      console.log("Expected first argument to be '-E'");
      process.exit(1);
   }

   // You can use print statements as follows for debugging, they'll be visible when running tests.
   console.log("Logs from your program will appear here");

   // Uncomment this block to pass the first stage
   if (matchPattern(inputLine, pattern)) {
      process.exit(0);
   } else {
      process.exit(1);
   }
}

main();
