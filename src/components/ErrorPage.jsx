export default function ErrorPage({
  code = 500,
  message = "Something went wrong!",
}) {
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.code} className="btn primary-bg text-white">
        {code}
      </h1>
      <p style={styles.message}>{message}</p>
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
  code: {
    fontSize: "80px",
    fontWeight: "700",
    margin: 0,
  },
  message: {
    fontSize: "20px",
    marginTop: "15px",
  },
};
