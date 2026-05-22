import { useState } from "react";

// ─────────────────────────────────────────────
//  CERTIFICATE DATABASE
//
//  photo  → put image in: public/photos/
//  file   → put PDF in:   public/certificates/
//
//  Example:
//    photo: "/photos/mayank.jpg"
//    file:  "/certificates/APMG-INT-2026-021.pdf"
// ─────────────────────────────────────────────


const certificates = {
  
  "INT-2026-022": {
    name: "Avi Jain",
    issueDate: "20/04/2026",
    validTill: "",
    status: "Verified",
    type: "Internship Completion Certificate",
    duration: "120 Hours",
    photo: "/photos/avi.jpeg",
    file: "/certificates/INT-2026-022(2).pdf",
  },
  
};

// ─────────────────────────────────────────────
//  DOWNLOAD — opens / downloads the real PDF
// ─────────────────────────────────────────────
function downloadCertificate(cert) {
  const link = document.createElement("a");
  link.href = cert.file;
  link.download = `Certificate_${cert.number}_${cert.name.replace(/\s+/g, "_")}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ─────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────
const styles = {
  body: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "#eef1f5",
    minHeight: "100vh",
    margin: 0,
  },
  navbar: {
    background: "#fff",
    borderBottom: "1px solid #dde2ea",
    padding: "12px 32px",
  },
  navbarBrand: {
    color: "#1565c0",
    fontWeight: 700,
    fontSize: "1.1rem",
    letterSpacing: "0.5px",
    margin: 0,
  },
  navbarSub: {
    color: "#666",
    fontSize: "0.75rem",
    margin: 0,
  },
  hero: {
    background: "linear-gradient(135deg, #1565c0 0%, #1976d2 60%, #1e88e5 100%)",
    padding: "48px 24px 52px",
    textAlign: "center",
  },
  heroTitle: {
    color: "#fff",
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "28px",
    letterSpacing: "0.3px",
  },
  searchBox: {
    display: "flex",
    maxWidth: "540px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "14px 18px",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    color: "#333",
  },
  searchBtn: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  },
  main: {
    padding: "40px 24px 60px",
    maxWidth: "640px",
    margin: "0 auto",
  },
  errorCard: {
    background: "#fff3f3",
    border: "1px solid #f5c6c6",
    borderLeft: "4px solid #e53935",
    borderRadius: "8px",
    padding: "16px 20px",
    color: "#c62828",
    fontWeight: 600,
    marginBottom: "16px",
  },
  resultCard: {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
  },
  resultHeader: {
    background: "#2e7d32",
    color: "#fff",
    padding: "14px 20px",
    fontWeight: 700,
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  checkmark: {
    width: "22px",
    height: "22px",
    background: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  resultBody: {
    padding: "24px 20px",
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
  },
  photoSection: { textAlign: "center", flexShrink: 0 },
  photoImg: {
    width: "100px",
    height: "110px",
    borderRadius: "6px",
    objectFit: "cover",
    marginBottom: "10px",
    display: "block",
    border: "2px solid #dde2ea",
  },
  photoPlaceholder: {
    width: "100px",
    height: "110px",
    background: "#c8d8f0",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
    overflow: "hidden",
  },
  photoName: { fontWeight: 700, fontSize: "0.95rem", color: "#222" },
  detailsGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px 20px",
  },
  detailLabel: {
    display: "block",
    fontSize: "0.72rem",
    color: "#888",
    marginBottom: "4px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },
  detailValue: { fontSize: "0.93rem", color: "#222", fontWeight: 600 },
  detailValueVerified: { fontSize: "0.93rem", color: "#2e7d32", fontWeight: 600 },
  fullWidth: { gridColumn: "1 / -1" },
  downloadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "calc(100% - 40px)",
    margin: "4px 20px 24px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "14px",
    fontSize: "0.95rem",
    fontWeight: 700,
    fontFamily: "inherit",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    boxSizing: "border-box",
  },
  noFileNote: {
    textAlign: "center",
    color: "#e65100",
    fontSize: "0.82rem",
    marginTop: "-8px",
    marginBottom: "20px",
    fontStyle: "italic",
  },
};

// ─────────────────────────────────────────────
//  CANDIDATE PHOTO COMPONENT
// ─────────────────────────────────────────────
function CandidatePhoto({ src, name }) {
  const [imgError, setImgError] = useState(false);
  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        style={styles.photoImg}
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div style={styles.photoPlaceholder}>
      <svg viewBox="0 0 80 90" width="80" height="90" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="28" r="20" fill="#90aad4" />
        <ellipse cx="40" cy="82" rx="32" ry="22" fill="#90aad4" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [fileExists, setFileExists] = useState(true);

  const verifyCert = () => {
    const key = input.trim().toUpperCase();
    setResult(null);
    setError("");
    setFileExists(true);
    if (!key) { setError("⚠️ Please enter a certificate number."); return; }
    const cert = certificates[key];
    if (!cert) { setError("❌ Certificate not found. Please check the number and try again."); return; }
    setResult({ ...cert, number: key });

    // Check if PDF file actually exists in public/certificates/
    fetch(cert.file, { method: "HEAD" })
      .then((res) => setFileExists(res.ok))
      .catch(() => setFileExists(false));
  };

  const handleDownload = () => {
    if (!result) return;
    downloadCertificate(result);
  };

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <p style={styles.navbarBrand}>K.S.M.G & ASSOCIATES</p>
        <p style={styles.navbarSub}>Certificate Verification Portal</p>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Verify Internship Certificate</h1>
        <div style={styles.searchBox}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Enter Certificate Number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verifyCert()}
          />
          <button style={styles.searchBtn} onClick={verifyCert}>
            Verify Certificate
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={styles.main}>
        {error && <div style={styles.errorCard}>{error}</div>}

        {result && (
          <div style={styles.resultCard}>
            {/* Green header */}
            <div style={styles.resultHeader}>
              <div style={styles.checkmark}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="#2e7d32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              Certificate Successfully Verified
            </div>

            {/* Body */}
            <div style={styles.resultBody}>
              <div style={styles.photoSection}>
                <CandidatePhoto src={result.photo} name={result.name} />
                <div style={styles.photoName}>{result.name}</div>
              </div>

              <div style={styles.detailsGrid}>
                <div>
                  <label style={styles.detailLabel}>Certificate Number</label>
                  <div style={styles.detailValue}>{result.number}</div>
                </div>
                <div>
                  <label style={styles.detailLabel}>Issue Date</label>
                  <div style={styles.detailValue}>{result.issueDate}</div>
                </div>
                <div>
                  <label style={styles.detailLabel}>Valid Till</label>
                  <div style={styles.detailValue}>{result.validTill || "—"}</div>
                </div>
                <div>
                  <label style={styles.detailLabel}>Status</label>
                  <div style={styles.detailValueVerified}>{result.status}</div>
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.detailLabel}>Certificate Type</label>
                  <div style={styles.detailValue}>{result.type}</div>
                </div>
                <div style={styles.fullWidth}>
                  <label style={styles.detailLabel}>Internship Duration</label>
                  <div style={styles.detailValue}>{result.duration}</div>
                </div>
              </div>
            </div>

            {/* Download button */}
            {fileExists ? (
              <button style={styles.downloadBtn} onClick={handleDownload}>
                ⬇ Download Certificate
              </button>
            ) : (
              <>
                <button style={{ ...styles.downloadBtn, background: "#90a4ae", cursor: "not-allowed" }} disabled>
                  ⬇ Download Certificate
                </button>
                <p style={styles.noFileNote}>
                  ⚠️ PDF file not found. Please add the certificate PDF to <code>public/certificates/</code>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}