import { useState } from "react";
import { useLocalStorage } from "react-use";
import "./App.css";

function splitter(str: string, l: number) {
  let lines = [];
  while (str.length > l || str.includes("\n")) {
    const segment = str.slice(0, l);
    if (segment.includes("\n")) {
      lines.push(str.substring(0, segment.indexOf("\n")));
      str = str.substring(segment.indexOf("\n") + 1);
    } else if (segment.includes(" ")) {
      lines.push(str.substring(0, segment.lastIndexOf(" ")));
      str = str.substring(segment.lastIndexOf(" ") + 1);
    } else {
      lines.push(str.substring(0, l));
      str = str.substring(l);
    }
  }
  lines.push(str);

  // remove last empty line
  if (lines[lines.length - 1] === "") {
    lines.pop();
  }

  return lines;
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
  const [text, setText] = useLocalStorage("text", "");
  const [currentFont, setCurrentFont] = useState<Font>(fonts[0]);
  const [blankLines, setBlankLines] = useLocalStorage<number>("blankLines", 1);
  const [maxCharacters, setMaxCharacters] = useLocalStorage<number>(
    "maxCharacters",
    45
  );
  const [wordSpacing, setWordSpacing] = useLocalStorage<number>(
    "wordSpacing",
    7
  );

  const lines = splitter(text || "", maxCharacters || 45);

  return (
    <div className="App">
      <section className="Nav">
        <nav className="navbar bg-base-300">
          <div className="navbar-start">
            <a className="btn btn-ghost normal-case text-xl">
              Handwriting Worksheet Generator
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
          >
            {text}
          </textarea>
        </div>
      </section>

      {(text || "").length > 0 && (
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
                  <span>{line || <>&nbsp;</>}</span>
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
          {Array.from(Array(Math.max(blankLines || 0, 1)).keys()).map((index) => {
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
        </main>
      )}
    </div>
  );
}

export default App;
