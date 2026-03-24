function MissingSkillsSection({ result }) {

 if (!result || !result.missingSkills?.length)
  return (
   <div className="missing-section">
    <h2>Missing Skills</h2>
    <p className="noMissing">No missing skills detected 🎉</p>
   </div>
  );

 return (
  <div className="section">

   <h2>Missing Skills ({result.missingSkills.length})</h2>

   <div className="skills">

    {result.missingSkills.map((skill,i)=>(
     <span key={i} className="skill missing">
      {skill}
     </span>
    ))}

   </div>

  </div>
 );
}

export default MissingSkillsSection;