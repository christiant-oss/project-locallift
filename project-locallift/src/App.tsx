import "./App.css";

function App() {
  const businesses = [
    {
      id: 1,
      name: "Brooklyn Bites Cafe",
      category: "Restaurant",
      inventoryStatus: "Low Stock",
      weeklySales: "$1,240",
      accessibility: "Needs alt text updates",
      owner: "Maria Lopez",
      location: "Brooklyn, NY",
    },
    {
      id: 2,
      name: "Flatbush Fashion",
      category: "Retail",
      inventoryStatus: "In Stock",
      weeklySales: "$2,980",
      accessibility: "WCAG check passed",
      owner: "Jamal Carter",
      location: "Flatbush, NY",
    },
    {
      id: 3,
      name: "Crown Heights Prints",
      category: "Print Shop",
      inventoryStatus: "Medium Stock",
      weeklySales: "$1,875",
      accessibility: "Missing button labels",
      owner: "Sonia Patel",
      location: "Crown Heights, NY",
    },
  ];

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-text">
          <p className="eyebrow">Project LocalLift</p>
          <h1>Helping small businesses manage orders, inventory, and sales with less stress.</h1>
          <p className="hero-description">
            LocalLift is a simple and accessible digital toolkit designed for small and
            immigrant-owned businesses that may not have the time, budget, or technical
            experience to use complex software.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">View Dashboard</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>

        <div className="hero-card">
          <h3>Weekly Overview</h3>
          <div className="mini-stat">
            <span>Total Businesses</span>
            <strong>3</strong>
          </div>
          <div className="mini-stat">
            <span>Weekly Sales</span>
            <strong>$6,095</strong>
          </div>
          <div className="mini-stat">
            <span>Accessibility Issues</span>
            <strong>2 flagged</strong>
          </div>
          <div className="mini-stat">
            <span>System Status</span>
            <strong>Operational</strong>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="stats-grid">
          <div className="stat-card">
            <h3>Active Shops</h3>
            <p>3</p>
            <span>Businesses currently using the platform</span>
          </div>

          <div className="stat-card">
            <h3>Orders Processed</h3>
            <p>127</p>
            <span>Tracked this week across all businesses</span>
          </div>

          <div className="stat-card">
            <h3>Inventory Alerts</h3>
            <p>4</p>
            <span>Items that need restocking attention</span>
          </div>

          <div className="stat-card">
            <h3>Accessibility Score</h3>
            <p>86%</p>
            <span>Average usability and compliance health</span>
          </div>
        </section>

        <section className="section-header">
          <div>
            <p className="section-label">Business Dashboard</p>
            <h2>Small business activity snapshot</h2>
          </div>
          <button className="secondary-btn">Export Report</button>
        </section>

        <section className="business-grid">
          {businesses.map((business) => (
            <article className="business-card" key={business.id}>
              <div className="business-top">
                <div>
                  <h3>{business.name}</h3>
                  <p>{business.category}</p>
                </div>
                <span className="badge">{business.inventoryStatus}</span>
              </div>

              <div className="business-details">
                <div>
                  <span className="detail-label">Owner</span>
                  <strong>{business.owner}</strong>
                </div>
                <div>
                  <span className="detail-label">Location</span>
                  <strong>{business.location}</strong>
                </div>
                <div>
                  <span className="detail-label">Weekly Sales</span>
                  <strong>{business.weeklySales}</strong>
                </div>
                <div>
                  <span className="detail-label">Accessibility</span>
                  <strong>{business.accessibility}</strong>
                </div>
              </div>

              <div className="card-actions">
                <button className="primary-btn small-btn">Open Profile</button>
                <button className="secondary-btn small-btn">View Insights</button>
              </div>
            </article>
          ))}
        </section>

        <section className="impact-section">
          <div className="impact-text">
            <p className="section-label">Social Impact Goal</p>
            <h2>Closing the digital gap for smaller businesses</h2>
            <p>
              LocalLift was designed to support small businesses that often get left behind by
              expensive and overly complicated digital systems. The platform focuses on simple
              workflows, readable layouts, and accessibility-friendly design so more business
              owners can manage their operations with confidence.
            </p>
          </div>

          <div className="impact-box">
            <h3>Accessibility Features</h3>
            <ul>
              <li>Clear headings and readable text hierarchy</li>
              <li>Simple navigation for less technical users</li>
              <li>Color contrast focused on readability</li>
              <li>Support for identifying WCAG-related issues</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;