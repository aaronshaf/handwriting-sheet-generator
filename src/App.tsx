import { useState } from "react";
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
};

const fonts: Font[] = [
  {
    fontFamily: "HomemadeApple",
    fontSize: "1.5em",
    marginBottom: "-15px",
    lineHeight: "1.8em",
  },
  {
    fontFamily: "Dawning_of_a_New_Day",
    fontSize: "2em",
    marginBottom: "-6px",
    lineHeight: "1.1em",
  },
  {
    fontFamily: "AlexBrush",
    fontSize: "2em",
    marginBottom: "-10px",
    lineHeight: "1.1em",
  },
  {
    fontFamily: "Rochester",
    fontSize: "2em",
    marginBottom: "-3px",
    lineHeight: "1.05em",
  },
];

function App() {
  const [text, setText] =
    useState(`In the beginning was the Word, and the Word was with God, and the Word was God. He was in the beginning with God. All things were made through him, and without him was not any thing made that was made. In him was life, and the life was the light of men. The light shines in the darkness, and the darkness has not overcome it.
  There was a man sent from God, whose name was John. He came as a witness, to bear witness about the light, that all might believe through him. He was not the light, but came to bear witness about the light.
  The true light, which gives light to everyone, was coming into the world. He was in the world, and the world was made through him, yet the world did not know him. He came to his own, and his own people did not receive him. But to all who did receive him, who believed in his name, he gave the right to become children of God, who were born, not of blood nor of the will of the flesh nor of the will of man, but of God.`);
  const [currentFont, setCurrentFont] = useState<Font>(fonts[0]);
  const [blankLines, setBlankLines] = useState<number>(1);
  const [maxCharacters, setMaxCharacters] = useState<number>(45);
  const [wordSpacing, setWordSpacing] = useState<number>(7);

  const lines = splitter(text, maxCharacters);

  return (
    <div className="App">
      <section className="Nav">
        <nav className="navbar bg-base-300">
          <div className="navbar-start">
            <a className="btn btn-ghost normal-case text-xl">
              Handwriting Sheet Generator
            </a>
          </div>
          <div className="navbar-end">
            <button className="btn" onClick={() => window.print()}>
              Print
            </button>
          </div>
        </nav>
      </section>
      <section className="Settings">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Font</span>
          </label>
          <select
            onChange={(event) => {
              setCurrentFont(
                fonts.find((font) => event.target.value === font.fontFamily) ||
                  fonts[0]
              );
            }}
            className="select select-bordered"
          >
            {fonts.map((font) => {
              return (
                <option key={font.fontFamily} value={font.fontFamily}>
                  {font.fontFamily}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Blank lines</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            name="blankLines"
            value={blankLines}
            onChange={(event) => {
              setBlankLines(Math.max(parseInt(event.target.value, 10), 0) || 0);
            }}
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Max characters per line</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            value={maxCharacters}
            onChange={(event) => {
              setMaxCharacters(
                Math.max(parseInt(event.target.value, 10), 0) || 45
              );
            }}
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Word spacing</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            value={wordSpacing}
            onChange={(event) => {
              setWordSpacing(
                Math.max(parseInt(event.target.value, 10), 0) || 7
              );
            }}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Text</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Text"
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></textarea>
        </div>
      </section>

      {text.length > 0 && (
        <main
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
                    wordSpacing: `${wordSpacing}px`,
                  }}
                >
                  <span>{line}</span>
                </div>
                {Array.from(Array(blankLines).keys()).map((index) => {
                  return (
                    <div
                      key={index}
                      className="BlankLine"
                      style={{
                        fontFamily: currentFont.fontFamily,
                        marginBottom: currentFont.marginBottom,
                      }}
                    >
                      <span>&nbsp;</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </main>
      )}
    </div>
  );
}

export default App;
