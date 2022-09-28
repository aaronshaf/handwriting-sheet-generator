import { useState, Fragment } from "react";
import "./App.css";

function splitter(str: string, l: number) {
  var strs = [];
  while (str.length > l) {
    var pos = str.substring(0, l).lastIndexOf(" ");
    pos = pos <= 0 ? l : pos;
    strs.push(str.substring(0, pos));
    var i = str.indexOf(" ", pos) + 1;
    if (i < pos || i > pos + l) i = pos;
    str = str.substring(i);
  }
  strs.push(str);
  return strs;
}

type Font = {
  fontFamily: string;
  fontSize: string;
  marginBottom: string;
  lineHeight: string;
  maxCharacters: number;
};

const fonts: Font[] = [
  {
    fontFamily: "HomemadeApple",
    fontSize: "1.5em",
    marginBottom: "-15px",
    lineHeight: "1.8em",
    maxCharacters: 48,
  },
  {
    fontFamily: "AlexBrush",
    fontSize: "2em",
    marginBottom: "-10px",
    lineHeight: "1.1em",
    maxCharacters: 58,
  },
  {
    fontFamily: "Rochester",
    fontSize: "2em",
    marginBottom: "-3px",
    lineHeight: "1.05em",
    maxCharacters: 55,
  },
  {
    fontFamily: "Dawning_of_a_New_Day",
    fontSize: "2em",
    marginBottom: "-6px",
    lineHeight: "1.1em",
    maxCharacters: 50,
  }
];

function App() {
  const [text, setText] =
    useState(`In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God. All things were made through him, and without him was not any thing made that was made. In him was life, and the life was the light of men. The light shines in the darkness, and the darkness has not overcome it.
  There was a man sent from God, whose name was John. He came as a witness, to bear witness about the light, that all might believe through him. He was not the light, but came to bear witness about the light.
  The true light, which gives light to everyone, was coming into the world. He was in the world, and the world was made through him, yet the world did not know him. He came to his own, and his own people did not receive him. But to all who did receive him, who believed in his name, he gave the right to become children of God, who were born, not of blood nor of the will of the flesh nor of the will of man, but of God.`);
  const [currentFont, setCurrentFont] = useState<Font>(fonts[0]);

  const lines = splitter(text, currentFont.maxCharacters);

  return (
    <div className="App">
      <section className="Settings">
        <div>
          <label>
            Font:
            <select
              onChange={(event) => {
                setCurrentFont(
                  fonts.find(
                    (font) => event.target.value === font.fontFamily
                  ) || fonts[0]
                );
              }}
            >
              {fonts.map((font) => {
                return (
                  <option key={font.fontFamily} value={font.fontFamily}>
                    {font.fontFamily}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <textarea
          onChange={(event) => {
            setText(event.target.value);
          }}
        ></textarea>
      </section>
      <section>
        <div
          className="Notebook"
          style={{
            fontSize: currentFont.fontSize,
            lineHeight: currentFont.lineHeight,
          }}
        >
          {lines.map((line, index) => {
            return (
              <div key={index} className="Line">
                <div
                  className="TextLine"
                  style={{
                    fontFamily: currentFont.fontFamily,
                    marginBottom: currentFont.marginBottom,
                  }}
                >
                  <span>{line}</span>
                </div>
                <div
                  className="BlankLine"
                  style={{
                    fontFamily: currentFont.fontFamily,
                    marginBottom: currentFont.marginBottom,
                  }}
                >
                  <span>&nbsp;</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
