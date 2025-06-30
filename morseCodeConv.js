// list of Morse code representations for letters and numbers (not complete set)
const jumpList = {
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.--",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o":  "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "..--.",
  ":": "---...",
  "-": "-....-",
  "/": "-..-.",
  "(": "-.--.",
  "= ": "-...-",
  " ": "/", // Space is represented by a slash in Morse code
};

// This function converts a string of text into Morse code.
function morseCodeConv() {
    const input = document.getElementById("morseCodeText").value;
    // array  to store Morse code conversion results
    let morseCodeArray = [];

    // for each character in input string (lowercase to match jumpList keys)
    for (let char of input.toLowerCase()) {
        if (jumpList[char]) {
            // If the character exists in jumpList, add its Morse code to the array
            morseCodeArray.push(jumpList[char]);
        } else {
            // In case of unknown characters such as emojis and such
            morseCodeArray.push("?");
        }
    }

    document.getElementById("morseCodeOutput").value = morseCodeArray.join(" ");
}