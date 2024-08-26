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

   function handleBackreferences(pattern) {
      const captureGroupPattern = /\(([^()]+)\)/g;
      const backreferencePattern = /\\(\d+)/g;
      let match;
      let groupNumber = 0;
      let groupMap = {};

      pattern = pattern.replace(captureGroupPattern, (match, group) => {
         groupNumber++;
         groupMap[groupNumber] = group;
         return `(${createRegexFromPattern(group)})`;
      });

      pattern = pattern.replace(backreferencePattern, (match, groupNum) => {
         return `\\${groupNum}`;
      });

      return pattern;
   }

   const modifiedPattern = handleBackreferences(pattern);
   const regex = new RegExp(modifiedPattern, "i");

   return regex.test(inputLine);
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
