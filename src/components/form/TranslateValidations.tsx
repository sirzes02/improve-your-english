import { FC, useState } from "react";

interface IProps {
  lyric: string;
}

const TranslateValidation: FC<IProps> = ({ lyric }) => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(0);
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = async () => {
    setIsLoading(true);

    const result = await fetch("/api/translations", {
      method: "POST",
      body: JSON.stringify({ original: lyric, value: value }),
    });
    const jsonFormat = await result.json();

    setTranslation(jsonFormat.original);
    setIsLoading(false);
  };

  return (
    <div className="row mt-1">
      <div className="col">
        <div className="">{lyric}</div>
        <div className="text-muted" style={{ marginTop: -5 }}>
          {translation}
        </div>
      </div>
      <div className="col d-flex">
        <input
          id={value}
          onChange={({ target }) => setValue(target.value)}
          type="text"
          className="form-control"
          placeholder={"--- " + lyric + "..."}
          disabled={isLoading}
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
          <button
            className="btn btn-sm"
            onClick={handleValidation}
            disabled={isLoading}
          >
            <i style={{ color: "green" }} className="fa-solid fa-check"></i>
          </button>
        )}
      </div>

      <div className="col-1">{result}%</div>
    </div>
  );
};

export default TranslateValidation;
