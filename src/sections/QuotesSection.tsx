import { RevealText } from "../components/RevealText";
import { useTypingQuote } from "../hooks/useTypingQuote";
import portrait from "../../tingcc_1.jpg";

export function QuotesSection() {
  const quote = useTypingQuote();

  return (
    <section id="quotes" className="section about-section">
      <div className="section-inner about-inner">
        <div className="editorial-section-head">
          <span>02 / About</span>
          <span>Malaysia · building in public</span>
        </div>
        <div className="about-grid">
          <RevealText as="div" delay={80}>
            <h2>
              This is me,{' '}
              <a
                className="about-handle-link"
                href="https://www.linkedin.com/in/ting-chung-cheng-775a10225/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @tingcccc
              </a>
              .
            </h2>
            <h3>A Malaysian who read and write huge chunk of code.</h3>
            <h3>(Well mostly by Agents these days.)</h3>
          </RevealText>
          <RevealText as="div" className="about-copy" delay={180}>
            <figure className="about-portrait-frame">
              <img src={portrait} alt="Ting Chung Cheng" />
            </figure>
            <p>
              I work across mobile apps, web apps, cloud services and playful
              experiments — backed by my Computer Science with Artifical
              Intelligence bsc degree.
            </p>
          </RevealText>
        </div>
        <RevealText as="div" className="field-note" delay={280}>
          <div className="field-note-label">
            <span>Field note</span>
            <span>Typing through / quotes.json</span>
          </div>
          <blockquote aria-live="polite">
            &ldquo;<span className="quote-typing-text">{quote}</span>
            <span className="typing-cursor" aria-hidden="true">
              |
            </span>
            &rdquo;
          </blockquote>
        </RevealText>
      </div>
      <div className="about-marquee" aria-hidden="true">
        <div className="about-marquee-track">
          <span>DESIGN / BUILD / LEARN / REPEAT /</span>
          <span>DESIGN / BUILD / LEARN / REPEAT /</span>
          <span>DESIGN / BUILD / LEARN / REPEAT /</span>
        </div>
      </div>
    </section>
  );
}
