function matchPattern(inputLine, pattern) {
  function createRegexFromPattern(pattern) {
    if (pattern === "\\d") {
      return /\d/;
    } else if (pattern === "\\w") {
      return /\w/;
    } else if (/^\[.*\]$/.test(pattern) && !pattern.startsWith("[^")) {
      const characters = pattern.slice(1, -1);
      return new RegExp(`[${characters}]`);
    } else if (/^\[\^.*\]$/.test(pattern)) {
      const characters = pattern.slice(2, -1);
      return new RegExp(`[^${characters}]`);
    } else {
      throw new Error(`Unhandled pattern ${pattern}`);
    }
  }

  if (pattern.includes(" ")) {
    const patternParts = pattern.split(/\s+/);
    let currentIndex = 0;

    for (const part of patternParts) {
      const regex = createRegexFromPattern(part);
      const match = regex.exec(inputLine.slice(currentIndex));

      if (match) {
        currentIndex += match[0].length;
      } else {
        return false;
      }
    }

    return currentIndex === inputLine.length;
  } else {
    if (pattern.length === 1) {
      return inputLine.includes(pattern);
    } else if (pattern === "\\d") {
      return /\d/.test(inputLine);
    } else if (pattern === "\\w") {
      return /\w/.test(inputLine);
    } else if (/^\[.*\]$/.test(pattern) && !pattern.startsWith("[^")) {
      const characters = pattern.slice(1, -1);
      const regex = new RegExp(`[${characters}]`);
      return regex.test(inputLine);
    } else if (/^\[\^.*\]$/.test(pattern)) {
      const characters = pattern.slice(2, -1);
      const regex = new RegExp(`[^${characters}]`);
      return regex.test(inputLine);
    } else {
      throw new Error(`Unhandled pattern ${pattern}`);
    }
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
