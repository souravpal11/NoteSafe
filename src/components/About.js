import React from "react";


const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <div className="hero-badge">
            🔒 Secure. Private. Simple.
          </div>

          <h1>
            Your Notes. <span>Your Privacy.</span>
          </h1>

          <p>
            NoteSafe is a secure cloud-based note management platform designed
            to help you store, organize, and access your notes with confidence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="about-container about-grid">
          <div className="about-content">
            <span className="section-tag">OUR MISSION</span>

            <h2>Privacy should never be complicated.</h2>

            <p>
              We believe your personal notes deserve protection. NoteSafe
              combines a simple note-taking experience with secure data
              handling to give you a reliable place for your ideas,
              information, and important thoughts.
            </p>

            <p>
              Whether you're saving study notes, personal ideas, tasks, or
              important information, NoteSafe helps keep everything organized
              and accessible.
            </p>
          </div>

          <div className="security-card">
            <div className="security-icon">🔐</div>

            <h3>Built with Security in Mind</h3>

            <p>
              Your notes are encrypted before being stored in the database and
              decrypted only when they are retrieved for authorized use.
            </p>

            <div className="security-line"></div>

            <div className="security-item">
              <span>✓</span>
              Encrypted note storage
            </div>

            <div className="security-item">
              <span>✓</span>
              Secure authentication
            </div>

            <div className="security-item">
              <span>✓</span>
              Private user data
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="about-container">
          <div className="section-heading">
            <span className="section-tag">WHY NOTESAFE</span>

            <h2>Simple features. Serious protection.</h2>

            <p>
              Everything you need to manage your notes securely and efficiently.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Encrypted Notes</h3>
              <p>
                Your note content is securely encrypted before being stored.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">☁️</div>
              <h3>Cloud Access</h3>
              <p>
                Access your notes from anywhere using your secure account.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Protected Account</h3>
              <p>
                Authentication helps ensure only authorized users access their
                personal notes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Easy Management</h3>
              <p>
                Create, edit, organize, and delete notes with a clean and
                simple interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="technology-section">
        <div className="about-container">
          <div className="technology-content">
            <span className="section-tag">BUILT WITH MODERN TECHNOLOGY</span>

            <h2>Designed for reliability and security.</h2>

            <p>
              NoteSafe is built using modern web technologies to provide a fast,
              responsive, and secure experience.
            </p>

            <div className="tech-list">
              <span>React</span>
              <span>Node.js</span>
              <span>Express.js</span>
              <span>MongoDB</span>
              <span>JWT</span>
              <span>AES Encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="about-footer">
        <div className="about-container">
          <div className="footer-card">
            <div className="footer-lock">🔐</div>

            <h2>Your thoughts deserve a safe place.</h2>

            <p>
              NoteSafe gives you a simple and secure way to store what matters
              to you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;