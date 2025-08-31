
const DashboardPage = () => {
  return (
    <section id="dashboard" className="page" data-aos="fade-up">
      <div className="container dashboard">
        <h2>Resort Management Dashboard</h2>
        <div className="dashboard-container" data-aos="fade-up">
          <div className="sidebar">
            <h3>Management</h3>
            <ul className="sidebar-menu">
              <li><a href="#" className="active"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
              <li><a href="#"><i className="fas fa-bed"></i> Room Management</a></li>
              <li><a href="#"><i className="fas fa-calendar-check"></i> Bookings</a></li>
              <li><a href="#"><i className="fas fa-users"></i> Guests</a></li>
              <li><a href="#"><i className="fas fa-concierge-bell"></i> Services</a></li>
              <li><a href="#"><i className="fas fa-chart-line"></i> Reports</a></li>
              <li><a href="#"><i className="fas fa-cog"></i> Settings</a></li>
            </ul>
          </div>
          <div className="dashboard-content">
            <h3>Today's Overview</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Total Bookings</h4>
                <div className="number">142</div>
                <p>This Month</p>
              </div>
              <div className="stat-card">
                <h4>Occupancy Rate</h4>
                <div className="number">87%</div>
                <p>Current Status</p>
              </div>
              <div className="stat-card">
                <h4>Revenue</h4>
                <div className="number">$84,320</div>
                <p>This Month</p>
              </div>
              <div className="stat-card">
                <h4>Check-ins Today</h4>
                <div className="number">18</div>
                <p>Guests Arriving</p>
              </div>
            </div>
            <h3 style={{ marginTop: '40px' }}>Recent Bookings</h3>
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest</th>
                  <th>Room Type</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#RES-1024</td>
                  <td>Michael Johnson</td>
                  <td>Deluxe Suite</td>
                  <td>Jul 15, 2023</td>
                  <td>Jul 22, 2023</td>
                  <td><span className="status confirmed">Confirmed</span></td>
                </tr>
                <tr>
                  <td>#RES-1025</td>
                  <td>Sarah Williams</td>
                  <td>Ocean View Villa</td>
                  <td>Jul 16, 2023</td>
                  <td>Jul 20, 2023</td>
                  <td><span className="status confirmed">Confirmed</span></td>
                </tr>
                <tr>
                  <td>#RES-1026</td>
                  <td>Robert Chen</td>
                  <td>Premium Bungalow</td>
                  <td>Jul 18, 2023</td>
                  <td>Jul 25, 2023</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>#RES-1027</td>
                  <td>Emily Rodriguez</td>
                  <td>Family Suite</td>
                  <td>Jul 20, 2023</td>
                  <td>Jul 27, 2023</td>
                  <td><span className="status confirmed">Confirmed</span></td>
                </tr>
                <tr>
                  <td>#RES-1028</td>
                  <td>David Kim</td>
                  <td>Presidential Suite</td>
                  <td>Jul 22, 2023</td>
                  <td>Jul 29, 2023</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
