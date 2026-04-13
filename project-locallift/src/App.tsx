function App() {
  const businesses = [
    {
      id: 1,
      name: "Brooklyn Bites Cafe",
      category: "Restaurant",
      owner: "Maria Santos",
      inventoryStatus: "Low Stock",
      weeklySales: 1240,
      accessibility: "Needs alt text updates",
      accessibilityStatus: "Needs Review",
      lastUpdated: "Today",
      location: "Brooklyn, NY",
    },
    {
      id: 2,
      name: "Flatbush Fashion",
      category: "Retail",
      owner: "Jamal Reed",
      inventoryStatus: "In Stock",
      weeklySales: 2980,
      accessibility: "WCAG check passed",
      accessibilityStatus: "Passed",
      lastUpdated: "Yesterday",
      location: "Flatbush, NY",
    },
    {
      id: 3,
      name: "Crown Heights Prints",
      category: "Print Shop",
      owner: "Alicia Brown",
      inventoryStatus: "Medium Stock",
      weeklySales: 1875,
      accessibility: "Missing button labels",
      accessibilityStatus: "Needs Review",
      lastUpdated: "2 days ago",
      location: "Crown Heights, NY",
    },
    {
      id: 4,
      name: "Sunrise Grocers",
      category: "Grocery",
      owner: "David Chen",
      inventoryStatus: "Low Stock",
      weeklySales: 3425,
      accessibility: "Color contrast needs improvement",
      accessibilityStatus: "Needs Review",
      lastUpdated: "Today",
      location: "Bed-Stuy, NY",
    },
  ];

  const totalBusinesses = businesses.length;
  const lowStockCount = businesses.filter(
    (business) => business.inventoryStatus === "Low Stock"
  ).length;
  const accessibilityIssues = businesses.filter(
    (business) => business.accessibilityStatus === "Needs Review"
  ).length;
  const totalWeeklySales = businesses.reduce(
    (sum, business) => sum + business.weeklySales,
    0
  );

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };

  const getInventoryBadgeStyle = (status: string) => {
    const baseStyle = {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: "600",
    };

    if (status === "Low Stock") {
      return {
        ...baseStyle,
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
      };
    }

    if (status === "Medium Stock") {
      return {
        ...baseStyle,
        backgroundColor: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      ...baseStyle,
      backgroundColor: "#dcfce7",
      color: "#166534",
    };
  };

  const getAccessibilityBadgeStyle = (status: string) => {
    const baseStyle = {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: "600",
    };

    if (status === "Passed") {
      return {
        ...baseStyle,
        backgroundColor: "#dcfce7",
        color: "#166534",
      };
    }

    return {
      ...baseStyle,
      backgroundColor: "#ede9fe",
      color: "#6d28d9",
    };
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e2e8f0",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #f8fafc 0%, #eef2ff 100%)",
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
        <header
          style={{
            ...cardStyle,
            marginBottom: "24px",
            padding: "32px",
            background:
              "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 10px 0",
                  color: "#4f46e5",
                  fontWeight: "700",
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                LocalLift Dashboard
              </p>
              <h1
                style={{
                  margin: 0,
                  fontSize: "40px",
                  lineHeight: "1.1",
                }}
              >
                Project LocalLift
              </h1>
              <p
                style={{
                  marginTop: "12px",
                  color: "#475569",
                  fontSize: "17px",
                  maxWidth: "700px",
                  lineHeight: "1.6",
                }}
              >
                A small business digital toolkit prototype focused on inventory
                visibility, accessibility awareness, and simple business insights
                for local communities.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#eef2ff",
                color: "#312e81",
                padding: "14px 18px",
                borderRadius: "16px",
                fontWeight: "600",
                minWidth: "220px",
              }}
            >
              <div style={{ fontSize: "13px", opacity: 0.8, marginBottom: "6px" }}>
                Weekly Platform Snapshot
              </div>
              <div style={{ fontSize: "22px", fontWeight: "700" }}>
                {formatCurrency(totalWeeklySales)}
              </div>
            </div>
          </div>
        </header>

        <section
          aria-label="Summary metrics"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "18px",
            marginBottom: "24px",
          }}
        >
          <div style={cardStyle}>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Businesses Tracked
            </p>
            <h2 style={{ margin: "14px 0 8px 0", fontSize: "34px" }}>
              {totalBusinesses}
            </h2>
            <p style={{ margin: 0, color: "#475569", fontSize: "14px" }}>
              Active businesses monitored this week
            </p>
          </div>

          <div style={cardStyle}>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Low Stock Alerts
            </p>
            <h2 style={{ margin: "14px 0 8px 0", fontSize: "34px" }}>
              {lowStockCount}
            </h2>
            <p style={{ margin: 0, color: "#475569", fontSize: "14px" }}>
              Businesses needing inventory attention
            </p>
          </div>

          <div style={cardStyle}>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Accessibility Issues
            </p>
            <h2 style={{ margin: "14px 0 8px 0", fontSize: "34px" }}>
              {accessibilityIssues}
            </h2>
            <p style={{ margin: 0, color: "#475569", fontSize: "14px" }}>
              Items flagged for inclusive design review
            </p>
          </div>

          <div style={cardStyle}>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Weekly Sales Total
            </p>
            <h2 style={{ margin: "14px 0 8px 0", fontSize: "34px" }}>
              {formatCurrency(totalWeeklySales)}
            </h2>
            <p style={{ margin: 0, color: "#475569", fontSize: "14px" }}>
              Combined estimated sales across businesses
            </p>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                marginBottom: "18px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: "30px" }}>
                  Business Dashboard Overview
                </h2>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    color: "#64748b",
                    fontSize: "15px",
                  }}
                >
                  Monitor sales, inventory, and accessibility progress in one place.
                </p>
              </div>

              <input
                type="text"
                placeholder="Search business name..."
                aria-label="Search business name"
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  minWidth: "240px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "14px",
                        fontSize: "14px",
                        color: "#475569",
                        borderBottom: "1px solid #e2e8f0",
                        borderTopLeftRadius: "14px",
                      }}
                    >
                      Business
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "14px",
                        fontSize: "14px",
                        color: "#475569",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      Category
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "14px",
                        fontSize: "14px",
                        color: "#475569",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      Inventory
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "14px",
                        fontSize: "14px",
                        color: "#475569",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      Weekly Sales
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "14px",
                        fontSize: "14px",
                        color: "#475569",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      Accessibility
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "14px",
                        fontSize: "14px",
                        color: "#475569",
                        borderBottom: "1px solid #e2e8f0",
                        borderTopRightRadius: "14px",
                      }}
                    >
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.map((business) => (
                    <tr key={business.id}>
                      <td
                        style={{
                          padding: "16px 14px",
                          borderBottom: "1px solid #e2e8f0",
                          verticalAlign: "top",
                        }}
                      >
                        <div style={{ fontWeight: "700", marginBottom: "4px" }}>
                          {business.name}
                        </div>
                        <div style={{ color: "#64748b", fontSize: "13px" }}>
                          Owner: {business.owner}
                        </div>
                        <div style={{ color: "#64748b", fontSize: "13px", marginTop: "3px" }}>
                          {business.location}
                        </div>
                      </td>

                      <td
                        style={{
                          padding: "16px 14px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#334155",
                        }}
                      >
                        {business.category}
                      </td>

                      <td
                        style={{
                          padding: "16px 14px",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        <span style={getInventoryBadgeStyle(business.inventoryStatus)}>
                          {business.inventoryStatus}
                        </span>
                      </td>

                      <td
                        style={{
                          padding: "16px 14px",
                          borderBottom: "1px solid #e2e8f0",
                          fontWeight: "600",
                        }}
                      >
                        {formatCurrency(business.weeklySales)}
                      </td>

                      <td
                        style={{
                          padding: "16px 14px",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        <div
                          style={{
                            marginBottom: "8px",
                          }}
                        >
                          <span
                            style={getAccessibilityBadgeStyle(
                              business.accessibilityStatus
                            )}
                          >
                            {business.accessibilityStatus}
                          </span>
                        </div>
                        <div style={{ color: "#475569", fontSize: "13px" }}>
                          {business.accessibility}
                        </div>
                      </td>

                      <td
                        style={{
                          padding: "16px 14px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#475569",
                        }}
                      >
                        {business.lastUpdated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: "grid", gap: "24px" }}>
            <aside style={cardStyle}>
              <h3 style={{ marginTop: 0, marginBottom: "14px", fontSize: "22px" }}>
                Priority Actions
              </h3>

              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "14px",
                  padding: "14px",
                  marginBottom: "12px",
                }}
              >
                <strong style={{ display: "block", marginBottom: "6px" }}>
                  Restock Alert
                </strong>
                <span style={{ color: "#7f1d1d", fontSize: "14px" }}>
                  Brooklyn Bites Cafe and Sunrise Grocers need inventory updates.
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "#faf5ff",
                  border: "1px solid #e9d5ff",
                  borderRadius: "14px",
                  padding: "14px",
                  marginBottom: "12px",
                }}
              >
                <strong style={{ display: "block", marginBottom: "6px" }}>
                  Accessibility Review
                </strong>
                <span style={{ color: "#581c87", fontSize: "14px" }}>
                  Add alt text, improve contrast, and label buttons for usability.
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "14px",
                  padding: "14px",
                }}
              >
                <strong style={{ display: "block", marginBottom: "6px" }}>
                  Community Impact
                </strong>
                <span style={{ color: "#1e3a8a", fontSize: "14px" }}>
                  LocalLift supports small businesses with simpler and more inclusive
                  digital tools.
                </span>
              </div>
            </aside>

            <aside style={cardStyle}>
              <h3 style={{ marginTop: 0, marginBottom: "14px", fontSize: "22px" }}>
                Recent Activity
              </h3>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: "14px",
                }}
              >
                <li
                  style={{
                    paddingBottom: "12px",
                    borderBottom: "1px solid #e2e8f0",
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  Accessibility scan completed for Flatbush Fashion
                </li>
                <li
                  style={{
                    paddingBottom: "12px",
                    borderBottom: "1px solid #e2e8f0",
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  Inventory warning triggered for Brooklyn Bites Cafe
                </li>
                <li
                  style={{
                    paddingBottom: "12px",
                    borderBottom: "1px solid #e2e8f0",
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  Weekly sales updated for Crown Heights Prints
                </li>
                <li
                  style={{
                    fontSize: "14px",
                    color: "#334155",
                  }}
                >
                  New business profile added to LocalLift dashboard
                </li>
              </ul>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;