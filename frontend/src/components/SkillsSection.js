function SkillsSection({result}){

 if(!result) return null;

 return(

  <div className="section container">

   <h2>Detected Skills({result.detectedRequiredSkills.length})</h2>

   <div className="skills">

    {result.detectedRequiredSkills.map((skill,i)=>(
     <span key={i} className="skill">
      {skill}
     </span>
    ))}

   </div>

  </div>

 )

}

export default SkillsSection;