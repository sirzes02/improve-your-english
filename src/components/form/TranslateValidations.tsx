import { FC, useState } from "react";
import { compareTwoStrings } from "string-similarity";

interface IProps {
  lyric: string;
}

const TranslateValidation: FC<IProps> = ({ lyric }) => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("0");
  const [translation, setTranslation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = async () => {
    setIsLoading(true);

    const result = await fetch("/api/translations", {
      method: "POST",
      body: JSON.stringify({ original: lyric }),
    });
    const jsonFormat = await result.json();
    const originalTrans = jsonFormat.original;

    setResult((compareTwoStrings(originalTrans, value) * 100).toFixed(2));
    setTranslation(originalTrans);
    setIsLoading(false);
  };

  return (
    <div className="row mt-1">
      <div className="col">
        <div className="">{lyric}</div>
        {translation && (
          <div className="text-muted" style={{ marginTop: -5 }}>
            {translation}
          </div>
        )}
      </div>
      <div className="col d-flex">
        <input
          id={value}
          onChange={({ target }) => setValue(target.value)}
          type="text"
          className="form-control"
          placeholder={"--- " + lyric + "..."}
          disabled={isLoading || result !== "0"}
        />
        {isLoading ? (
          <div className="btn btn-sm d-flex justify-content-center align-items-center">
            <div
              className="spinner-border spinner-border-sm text-success"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          result === "0" && (
            <button
              className="btn btn-sm"
              onClick={handleValidation}
              disabled={isLoading || result !== "0"}
            >
              <i style={{ color: "green" }} className="fa-solid fa-check"></i>
            </button>
          )
        )}
      </div>

      <div className="col-1">{result}%</div>
    </div>
  );
};

export default TranslateValidation;
