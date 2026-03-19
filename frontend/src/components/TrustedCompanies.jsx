import {
  FaAmazon,
  FaGoogle,
  FaMicrosoft,
  FaApple,
  FaGithub,
  FaLinkedin
} from "react-icons/fa";

export default function TrustedCompanies() {

  return (

    <section className="trustedSection">

      <p className="trustedText">
        Candidates using ResumeAI got interviews at
      </p>

      <div className="trustedLogos">

        <FaMicrosoft />
        <FaAmazon />
        <FaGoogle />
        <FaApple />
        <FaGithub />
        <FaLinkedin />

      </div>

    </section>

  );
}