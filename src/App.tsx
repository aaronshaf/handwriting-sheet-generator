import { useSearchParams } from "react-router-dom";
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

const getSettings = (searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());
  const darkness = params.get("darkness") || "100";
  const fontFamily = params.get("fontFamily") || "HomemadeApple";
  const blankLines = params.get("blankLines") || "1";
  const wordSpacing = params.get("wordSpacing") || "7";
  const maxCharacters = params.get("maxCharacters") || "45";
  const text = params.get("text") || "";
  return { darkness, fontFamily, blankLines, wordSpacing, maxCharacters, text };
};

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const settings = getSettings(searchParams);

  const currentFont =
    fonts.find((f) => f.fontFamily === settings.fontFamily) || fonts[0];

  const lines = splitter(
    settings.text.trim() || "",
    parseInt(settings.maxCharacters, 10) || 45
  );

  console.log(searchParams.get("fontFamily"));

  return (
    <div className="App">
      <section className="Nav">
        <nav className="navbar bg-base-300">
          <div className="navbar-start">
            <a
              href="/handwriting-worksheet-generator/"
              className="btn btn-ghost normal-case text-xl"
            >
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
      <section className="Settings mb-4">
        <div className="grid md:grid-cols-3 gap-1 mb-2 md:mb-1">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Font</span>
            </label>
            <select
              onChange={(event) => {
                setSearchParams({
                  ...settings,
                  fontFamily: event.target.value,
                });
              }}
              defaultValue={settings.fontFamily}
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
              min={0}
              step={1}
              name="blankLines"
              defaultValue={parseInt(settings.blankLines, 10)}
              onChange={(event) => {
                setSearchParams({
                  ...settings,
                  blankLines: String(event.target.value),
                });
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
              min={0}
              step={1}
              defaultValue={settings.maxCharacters}
              onChange={(event) => {
                setSearchParams({
                  ...settings,
                  maxCharacters: String(
                    Math.max(parseInt(event.target.value, 10), 0) || 45
                  ),
                });
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
              min={0}
              step={1}
              defaultValue={settings.wordSpacing}
              onChange={(event) => {
                setSearchParams({
                  ...settings,
                  wordSpacing: String(
                    Math.max(parseInt(event.target.value, 10), 0) || 7
                  ),
                });
              }}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Darkness</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="number"
              min={0}
              max={100}
              step={1}
              defaultValue={settings.darkness}
              onChange={(event) => {
                const integer = parseInt(event.target.value, 10) || 100;
                const darkness = String(Math.min(Math.max(integer, 1), 100));
                setSearchParams({ ...settings, darkness });
              }}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Text</span>
          </label>
          <textarea
            defaultValue={settings.text}
            className="textarea textarea-bordered h-24"
            placeholder="Text"
            onChange={(event) => {
              setSearchParams({ ...settings, text: event.target.value });
            }}
          ></textarea>
        </div>
      </section>

      {(settings.text || "").length > 0 && (
        <main
          className="Notebook"
          style={{
            fontSize: currentFont.fontSize,
            lineHeight: currentFont.lineHeight,
          }}
        >
          {lines.map((line, index) => {
            const colorNumber =
              255 - ((parseInt(settings.darkness, 10) || 0) / 100) * 255;
            return (
              <div key={index} className="Line">
                <div
                  className="TextLine"
                  style={{
                    fontFamily: currentFont.fontFamily,
                    marginBottom: currentFont.marginBottom,
                    wordSpacing: `${settings.wordSpacing}px`,
                    color: `rgb(${colorNumber}, ${colorNumber}, ${colorNumber})`,
                  }}
                >
                  <span>{line || <>&nbsp;</>}</span>
                </div>
                {Array.from(
                  Array(parseInt(settings.blankLines, 10)).keys()
                ).map((index) => {
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
          {Array.from(Array(1).keys()).map((index) => {
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
