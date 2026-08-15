import React, { useRef } from "react";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);

  const personal = data?.personalInformation || {};

  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const certifications = Array.isArray(data?.certifications)
    ? data.certifications
    : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const achievements = Array.isArray(data?.achievements)
    ? data.achievements
    : [];
  const languages = Array.isArray(data?.languages) ? data.languages : [];
  const interests = Array.isArray(data?.interests) ? data.interests : [];

  return (
    <div
      className="w-full flex justify-center"
      style={{
        margin: 0,
        padding: 0,
        background: "#ffffff",
      }}
    >
      {/* ================================
          A4 RESUME PAGE
      ================================= */}

      <div
        ref={resumeRef}
        id="resume-preview"
        style={{
          width: "210mm",
          height: "297mm",
          boxSizing: "border-box",

          /* Equal margins */
          padding: "9mm 11mm",

          margin: "0 auto",

          backgroundColor: "#ffffff",
          color: "#111111",

          /* IMPORTANT: remove left highlighting */
          border: "none",
          borderLeft: "none",
          boxShadow: "none",
          outline: "none",

          overflow: "hidden",

          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "11px",
          lineHeight: "1.35",
        }}
      >
        {/* =================================
            HEADER
        ================================= */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.3px",
              color: "#111111",
            }}
          >
            {personal.fullName || ""}
          </h1>

          {personal.location && (
            <div
              style={{
                marginTop: "2px",
                fontSize: "9px",
                color: "#555555",
              }}
            >
              {personal.location}
            </div>
          )}

          {/* Contact */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "6px",
              fontSize: "9px",
              color: "#444444",
            }}
          >
            {personal.email && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FaEnvelope size={8} />
                {personal.email}
              </span>
            )}

            {personal.phoneNumber && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FaPhone size={8} />
                {personal.phoneNumber}
              </span>
            )}
          </div>

          {/* Links */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
              marginTop: "5px",
              fontSize: "9px",
              color: "#444444",
            }}
          >
            {personal.gitHub && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FaGithub size={9} />
                GitHub
              </span>
            )}

            {personal.linkedin && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FaLinkedin size={9} />
                LinkedIn
              </span>
            )}

            {personal.portfolio && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FaGlobe size={9} />
                Portfolio
              </span>
            )}
          </div>
        </div>

        {/* =================================
            SECTION COMPONENT
        ================================= */}

        <style>
          {`
            .resume-section {
              margin-top: 9px;
            }

            .resume-section-title {
              font-size: 14px;
              font-weight: 800;
              text-transform: uppercase;
              margin: 0 0 5px 0;
              padding-bottom: 4px;
              border-bottom: 1px solid #bfc3c8;
              color: #111111;
            }

            .resume-text {
              font-size: 10.5px;
              line-height: 1.4;
              color: #222222;
            }

            .resume-small {
              font-size: 9.5px;
              color: #555555;
            }

            .resume-item {
              margin-bottom: 6px;
            }

            .resume-item-title {
              font-size: 10.5px;
              font-weight: 700;
              color: #111111;
            }

            .resume-bullet {
              margin: 2px 0;
              padding-left: 13px;
              font-size: 10px;
              line-height: 1.35;
              color: #222222;
            }

            .resume-two-column {
              display: grid;
              grid-template-columns: 1fr 1fr;
              column-gap: 35px;
            }

            @media print {
              * {
                box-shadow: none !important;
              }

              body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
              }

              #resume-preview {
                margin: 0 auto !important;
                border: none !important;
                border-left: none !important;
                outline: none !important;
                box-shadow: none !important;
              }
            }
          `}
        </style>

        {/* =================================
            PROFESSIONAL SUMMARY
        ================================= */}

        {data?.summary && (
          <section className="resume-section">
            <h2 className="resume-section-title">
              Professional Summary
            </h2>

            <div className="resume-text">
              {data.summary}
            </div>
          </section>
        )}

        {/* =================================
            EDUCATION
        ================================= */}

        {education.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">
              Education
            </h2>

            {education.map((edu, index) => (
              <div
                key={index}
                className="resume-item"
              >
                {edu.degree && (
                  <div className="resume-item-title">
                    {edu.degree}
                  </div>
                )}

                <div className="resume-small">
                  {edu.university && edu.university}

                  {edu.location &&
                    `, ${edu.location}`}

                  {edu.graduationYear &&
                    ` | ${edu.graduationYear}`}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* =================================
            TECHNICAL SKILLS
        ================================= */}

        {skills.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">
              Technical Skills
            </h2>

            <div className="resume-two-column">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "10px",
                    marginBottom: "3px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    • {skill?.title || ""}
                  </span>

                  {skill?.level && (
                    <span
                      style={{
                        color: "#666666",
                        marginLeft: "3px",
                      }}
                    >
                      ({skill.level})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================
            EXPERIENCE
        ================================= */}

        {experience.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">
              Experience
            </h2>

            {experience.map((exp, index) => (
              <div
                key={index}
                className="resume-item"
              >
                <div className="resume-item-title">
                  {exp.jobTitle || ""}
                  {exp.company && ` | ${exp.company}`}
                  {exp.location && ` | ${exp.location}`}
                </div>

                {exp.duration && (
                  <div className="resume-small">
                    {exp.duration}
                  </div>
                )}

                {exp.responsibility && (
                  <div className="resume-text">
                    {exp.responsibility}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* =================================
            PROJECTS
        ================================= */}

        {projects.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">
              Projects
            </h2>

            {projects.map((project, index) => (
              <div
                key={index}
                className="resume-item"
              >
                {project.title && (
                  <div className="resume-item-title">
                    {project.title}
                  </div>
                )}

                {project.description && (
                  <div className="resume-text">
                    {project.description}
                  </div>
                )}

                {project.technologiesUsed &&
                  project.technologiesUsed.length > 0 && (
                    <div
                      className="resume-small"
                      style={{
                        marginTop: "2px",
                      }}
                    >
                      <strong>Technologies:</strong>{" "}
                      {Array.isArray(
                        project.technologiesUsed
                      )
                        ? project.technologiesUsed.join(
                            ", "
                          )
                        : project.technologiesUsed}
                    </div>
                  )}
              </div>
            ))}
          </section>
        )}

        {/* =================================
            CERTIFICATIONS
        ================================= */}

        {certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">
              Certifications
            </h2>

            {certifications.map(
              (certification, index) => (
                <div
                  key={index}
                  className="resume-bullet"
                >
                  •{" "}
                  <strong>
                    {certification?.title || ""}
                  </strong>

                  {certification?.issuingOrganization && (
                    <span>
                      {" "}
                      -{" "}
                      {certification.issuingOrganization}
                    </span>
                  )}

                  {certification?.year && (
                    <span>
                      {" "}
                      ({certification.year})
                    </span>
                  )}
                </div>
              )
            )}
          </section>
        )}

        {/* =================================
            ACHIEVEMENTS
        ================================= */}

        {achievements.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">
              Achievements
            </h2>

            {achievements.map(
              (achievement, index) => (
                <div
                  key={index}
                  className="resume-item"
                >
                  <div className="resume-bullet">
                    •{" "}
                    <strong>
                      {achievement?.title || ""}
                    </strong>

                    {achievement?.year && (
                      <span>
                        {" "}
                        ({achievement.year})
                      </span>
                    )}
                  </div>

                  {achievement?.extraInformation && (
                    <div
                      className="resume-small"
                      style={{
                        marginLeft: "13px",
                      }}
                    >
                      {achievement.extraInformation}
                    </div>
                  )}
                </div>
              )
            )}
          </section>
        )}

        {/* =================================
            LANGUAGES
        ================================= */}

        {languages.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">
              Languages
            </h2>

            <div className="resume-text">
              {languages
                .map((language) => language?.name)
                .filter(Boolean)
                .join(" | ")}
            </div>
          </section>
        )}

        {/* =================================
            INTERESTS
        ================================= */}

        {interests.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">
              Interests
            </h2>

            <div className="resume-text">
              {interests
                .map((interest) => interest?.name)
                .filter(Boolean)
                .join(" | ")}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Resume;