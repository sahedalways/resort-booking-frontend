
const Loading = () => {
  return (
    <div className="loader" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner"></div>
      <p className="loader-content">Loading Prokiti-Bari...</p>
    </div>
  );
};

export default Loading;
