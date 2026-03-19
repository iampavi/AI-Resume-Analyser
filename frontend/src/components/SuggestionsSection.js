import { useState } from "react";

function SuggestionsSection({ result }) {

  const [openIndex, setOpenIndex] = useState(null);

  if (!result) return null;

  return (
    <div className="section">

      <h2>Suggestions</h2>

      <div className="suggestionList">

        {result.suggestions.map((s, i) => {

          const short = s.length > 60 ? s.substring(0, 60) + "..." : s;

          return (
            <div key={i} className="suggestionCard">

              <div
                className="suggestionHeader"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="suggestionNumber">{i + 1}</div>

                <div className="suggestionTitle">
                  {short}
                </div>

                <div className="suggestionArrow">
                  {openIndex === i ? "−" : "+"}
                </div>
              </div>

              {openIndex === i && (
                <div className="suggestionBody">
                  {s}
                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default SuggestionsSection;