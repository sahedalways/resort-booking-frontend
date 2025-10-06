// src/components/Loading.jsx
export default function Loading() {
  return (
    <div className="loading-wrapper" style={styles.wrapper}>
      <div className="spinner" style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "15px",
  },
  text: {
    fontSize: "18px",
    fontWeight: "500",
  },
};
