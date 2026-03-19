function ScoreDashboard({result}){

  if (!result) return null;

  return (

    <div id="score" className="dashboard">

      <h2>Your Resume Analysis</h2>

      <div className="cards">

        <div className="card">
          Score
          <span>{result.score}</span>
        </div>

        <div className="card">
          Skills
          <span>{result.skillsScore}</span>
        </div>

        <div className="card">
          ATS
          <span>{result.atsScore}</span>
        </div>

        <div className="card">
          Keywords
          <span>{result.keywordScore}</span>
        </div>

      </div>

    </div>

  );

}

export default ScoreDashboard;