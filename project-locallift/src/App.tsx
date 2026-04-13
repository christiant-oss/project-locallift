import { useMemo, useState } from "react";
import "./App.css";

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  lastUpdated: string;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [message, setMessage] = useState("Welcome to LocalLift Inventory Manager.");

  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Tomato Sauce",
      category: "Ingredients",
      stock: 8,
      minStock: 10,
      price: 18,
      lastUpdated: "Today",
    },
    {
      id: 2,
      name: "Mozzarella Cheese",
      category: "Ingredients",
      stock: 14,
      minStock: 12,
      price: 25,
      lastUpdated: "Today",
    },
    {
      id: 3,
      name: "Pizza Boxes",
      category: "Packaging",
      stock: 6,
      minStock: 15,
      price: 30,
      lastUpdated: "Yesterday",
    },
    {
      id: 4,
      name: "Pepperoni",
      category: "Ingredients",
      stock: 11,
      minStock: 10,
      price: 22,
      lastUpdated: "Today",
    },
    {
      id: 5,
      name: "Soda Bottles",
      category: "Drinks",
      stock: 20,
      minStock: 8,
      price: 15,
      lastUpdated: "Today",
    },
    {
      id: 6,
      name: "Paper Plates",
      category: "Supplies",
      stock: 5,
      minStock: 10,
      price: 12,
      lastUpdated: "Yesterday",
    },
  ]);

  const categories = ["All", ...new Set(items.map((item) => item.category))];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const totalItems = items.length;
  const lowStockItems = items.filter((item) => item.stock < item.minStock);
  const totalStockUnits = items.reduce((sum, item) => sum + item.stock, 0);
  const estimatedInventoryValue = items.reduce(
    (sum, item) => sum + item.stock * item.price,
    0
  );

  const increaseStock = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: item.stock + 1, lastUpdated: "Just now" }
          : item
      )
    );
    setMessage("Stock updated successfully.");
  };

  const decreaseStock = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.stock > 0
          ? { ...item, stock: item.stock - 1, lastUpdated: "Just now" }
          : item
      )
    );
    setMessage("Stock updated successfully.");
  };

  const restockItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: item.minStock + 5, lastUpdated: "Just now" }
          : item
      )
    );
    setMessage("Item marked as restocked.");
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock < minStock) return "Low Stock";
    if (stock <= minStock + 3) return "Medium";
    return "Good";
  };

  const getStatusClass = (stock: number, minStock: number) => {
    if (stock < minStock) return "badge low";
    if (stock <= minStock + 3) return "badge medium";
    return "badge good";
  };

  const salesPercent = Math.min(
    100,
    Math.round((estimatedInventoryValue / 800) * 10)
  );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-icon">L</div>
            <div>
              <h2>LocalLift</h2>
              <p>Stock Tracker</p>
            </div>
          </div>

          <nav className="nav-links">
            <button
              className={`nav-btn ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveSection("dashboard")}
            >
              Dashboard
            </button>

            <button
              className={`nav-btn ${activeSection === "inventory" ? "active" : ""}`}
              onClick={() => setActiveSection("inventory")}
            >
              Inventory
            </button>

            <button
              className={`nav-btn ${activeSection === "reports" ? "active" : ""}`}
              onClick={() => setActiveSection("reports")}
            >
              Reports
            </button>

            <button
              className={`nav-btn ${activeSection === "accessibility" ? "active" : ""}`}
              onClick={() => setActiveSection("accessibility")}
            >
              Accessibility
            </button>
          </nav>
        </div>

        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Capstone Project Draft</p>
            <h1>Brooklyn Bites Pizzarea Inventory Dashboard</h1>
            <p className="subtext">
              A simple stock tracking system for one local business to monitor
              inventory levels, restocking needs, and supply value without using
              expensive or complicated software.
            </p>
          </div>
        </header>

        {activeSection === "dashboard" && (
          <>
            <section className="toolbar">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <button
                className="secondary-btn"
                onClick={() => setMessage("Prototype export completed.")}
              >
                Export Inventory
              </button>
            </section>

            <p className="system-message">{message}</p>

            <section className="stats-grid">
              <div className="stat-card">
                <span>Total Inventory Items</span>
                <h3>{totalItems}</h3>
                <p>Tracked products and supplies for this business</p>
              </div>

              <div className="stat-card">
                <span>Low Stock Alerts</span>
                <h3>{lowStockItems.length}</h3>
                <p>Items currently below minimum stock level</p>
              </div>

              <div className="stat-card">
                <span>Total Units in Stock</span>
                <h3>{totalStockUnits}</h3>
                <p>Total quantity across all inventory items</p>
              </div>

              <div className="stat-card">
                <span>Estimated Inventory Value</span>
                <h3>${estimatedInventoryValue}</h3>
                <p>Approximate value of current inventory on hand</p>
              </div>
            </section>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="panel-label">Inventory Records</p>
                    <h2>Current Stock</h2>
                  </div>
                  <span className="count-pill">{filteredItems.length} items</span>
                </div>

                <div className="inventory-grid">
                  {filteredItems.map((item) => (
                    <article className="inventory-card" key={item.id}>
                      <div className="inventory-head">
                        <div>
                          <h3>{item.name}</h3>
                          <p>{item.category}</p>
                        </div>
                        <span className={getStatusClass(item.stock, item.minStock)}>
                          {getStockStatus(item.stock, item.minStock)}
                        </span>
                      </div>

                      <div className="inventory-info">
                        <div>
                          <span className="info-label">Stock</span>
                          <strong>{item.stock}</strong>
                        </div>
                        <div>
                          <span className="info-label">Minimum</span>
                          <strong>{item.minStock}</strong>
                        </div>
                        <div>
                          <span className="info-label">Unit Cost</span>
                          <strong>${item.price}</strong>
                        </div>
                        <div>
                          <span className="info-label">Last Updated</span>
                          <strong>{item.lastUpdated}</strong>
                        </div>
                      </div>

                      <div className="card-actions">
                        <button
                          className="primary-btn small-btn"
                          onClick={() => increaseStock(item.id)}
                        >
                          + Add Stock
                        </button>
                        <button
                          className="secondary-btn small-btn"
                          onClick={() => decreaseStock(item.id)}
                        >
                          - Reduce
                        </button>
                        <button
                          className="secondary-btn small-btn"
                          onClick={() => restockItem(item.id)}
                        >
                          Restock
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="right-panel">
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">Low Stock Alert List</p>
                      <h2>Restocking Priorities</h2>
                    </div>
                  </div>

                  <ul className="alerts-list">
                    {lowStockItems.length > 0 ? (
                      lowStockItems.map((item) => (
                        <li key={item.id}>
                          {item.name} is below minimum stock level and should be
                          restocked soon.
                        </li>
                      ))
                    ) : (
                      <li>All inventory items are currently at safe stock levels.</li>
                    )}
                  </ul>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">Project Purpose</p>
                      <h2>Social Impact Goal</h2>
                    </div>
                  </div>

                  <p className="impact-text">
                    LocalLift is designed to help one small local business keep track
                    of stock in a simpler and more affordable way. Instead of using
                    expensive business software, owners can quickly see low stock
                    items, update quantities, and make better restocking decisions in
                    a layout that is easier to understand and more accessible.
                  </p>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">Accessibility Features</p>
                      <h2>Usability Focus</h2>
                    </div>
                  </div>

                  <ul className="alerts-list">
                    <li>Clear labels and readable text hierarchy</li>
                    <li>Simple navigation and fewer confusing actions</li>
                    <li>High-contrast layout for easier readability</li>
                    <li>Search and filtering for quicker stock management</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === "inventory" && (
          <>
            <p className="system-message">
              Inventory section: manage stock levels for individual items.
            </p>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-label">Inventory Table</p>
                  <h2>All Items</h2>
                </div>
                <span className="count-pill">{items.length} total items</span>
              </div>

              <div className="inventory-grid">
                {items.map((item) => (
                  <article className="inventory-card" key={item.id}>
                    <div className="inventory-head">
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.category}</p>
                      </div>
                      <span className={getStatusClass(item.stock, item.minStock)}>
                        {getStockStatus(item.stock, item.minStock)}
                      </span>
                    </div>

                    <div className="inventory-info">
                      <div>
                        <span className="info-label">Current Stock</span>
                        <strong>{item.stock}</strong>
                      </div>
                      <div>
                        <span className="info-label">Minimum Stock</span>
                        <strong>{item.minStock}</strong>
                      </div>
                      <div>
                        <span className="info-label">Unit Cost</span>
                        <strong>${item.price}</strong>
                      </div>
                      <div>
                        <span className="info-label">Last Updated</span>
                        <strong>{item.lastUpdated}</strong>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button
                        className="primary-btn small-btn"
                        onClick={() => increaseStock(item.id)}
                      >
                        + Add Stock
                      </button>
                      <button
                        className="secondary-btn small-btn"
                        onClick={() => decreaseStock(item.id)}
                      >
                        - Reduce
                      </button>
                      <button
                        className="secondary-btn small-btn"
                        onClick={() => restockItem(item.id)}
                      >
                        Restock
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {activeSection === "reports" && (
          <>
            <p className="system-message">
              Reports section: quick overview of inventory health and value.
            </p>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="panel-label">Inventory Summary</p>
                    <h2>Business Reports</h2>
                  </div>
                </div>

                <div className="stats-grid reports-grid">
                  <div className="stat-card">
                    <span>Total Items</span>
                    <h3>{totalItems}</h3>
                    <p>Inventory products currently being tracked</p>
                  </div>

                  <div className="stat-card">
                    <span>Items Below Minimum</span>
                    <h3>{lowStockItems.length}</h3>
                    <p>Products that need attention soon</p>
                  </div>

                  <div className="stat-card">
                    <span>Total Units</span>
                    <h3>{totalStockUnits}</h3>
                    <p>Combined quantity in stock</p>
                  </div>

                  <div className="stat-card">
                    <span>Inventory Value</span>
                    <h3>${estimatedInventoryValue}</h3>
                    <p>Estimated total supply value</p>
                  </div>
                </div>
              </div>

              <div className="right-panel">
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">Visual Summary</p>
                      <h2>Stock Health</h2>
                    </div>
                  </div>

                  <div className="goal-item">
                    <div className="goal-top">
                      <span>Healthy Stock Level</span>
                      <strong>{100 - lowStockItems.length * 10}%</strong>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar"
                        style={{ width: `${Math.max(40, 100 - lowStockItems.length * 10)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="goal-item">
                    <div className="goal-top">
                      <span>Inventory Value Strength</span>
                      <strong>{salesPercent}%</strong>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar"
                        style={{ width: `${salesPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="goal-item">
                    <div className="goal-top">
                      <span>Restocking Readiness</span>
                      <strong>{lowStockItems.length === 0 ? "100%" : "72%"}</strong>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar"
                        style={{ width: lowStockItems.length === 0 ? "100%" : "72%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === "accessibility" && (
          <>
            <p className="system-message">
              Accessibility section: how the system supports simple and inclusive use.
            </p>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="panel-label">Accessibility</p>
                    <h2>Inclusive Design Features</h2>
                  </div>
                </div>

                <ul className="alerts-list">
                  <li>Clear page sections and readable headings</li>
                  <li>Simple dashboard structure for less technical users</li>
                  <li>Search and filters to reduce time spent finding stock items</li>
                  <li>Buttons with clear action labels like Add Stock and Restock</li>
                  <li>Color contrast support in both light and dark mode</li>
                  <li>Cleaner layout for small business owners who need quick updates</li>
                </ul>
              </div>

              <div className="right-panel">
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">Why It Matters</p>
                      <h2>Social Impact Goal</h2>
                    </div>
                  </div>

                  <p className="impact-text">
                    LocalLift supports small local businesses by offering a basic,
                    understandable stock system that does not require advanced technical
                    skills or expensive enterprise software. The goal is to make day-to-day
                    inventory tracking easier, faster, and more accessible.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;