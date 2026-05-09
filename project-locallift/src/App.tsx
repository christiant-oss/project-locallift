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
  const [language, setLanguage] = useState<"en" | "es">("en");
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

  const translations = {
    en: {
      appSubtitle: "Stock Tracker",
      dashboard: "Dashboard",
      inventory: "Inventory",
      reports: "Reports",
      accessibility: "Accessibility",
      lightMode: "Switch to Light Mode",
      darkMode: "Switch to Dark Mode",
      languageButton: "Español",
      eyebrow: "Capstone Project Draft",
      title: "Brooklyn Bites Pizzeria Inventory Dashboard",
      intro:
        "A simple stock tracking system for one local business to monitor inventory levels, restocking needs, and supply value without using expensive or complicated software.",
      searchPlaceholder: "Search inventory...",
      export: "Export Inventory",
      welcome: "Welcome to LocalLift Inventory Manager.",
      stockUpdated: "Stock updated successfully.",
      restocked: "Item marked as restocked.",
      exportMessage: "Prototype export completed.",
      totalInventoryItems: "Total Inventory Items",
      totalInventoryDesc: "Tracked products and supplies for this business",
      lowStockAlerts: "Low Stock Alerts",
      lowStockDesc: "Items currently below minimum stock level",
      totalUnits: "Total Units in Stock",
      totalUnitsDesc: "Total quantity across all inventory items",
      inventoryValue: "Estimated Inventory Value",
      inventoryValueDesc: "Approximate value of current inventory on hand",
      inventoryRecords: "Inventory Records",
      currentStock: "Current Stock",
      lowStockAlertList: "Low Stock Alert List",
      restockingPriorities: "Restocking Priorities",
      projectPurpose: "Project Purpose",
      socialImpactGoal: "Social Impact Goal",
      impactText:
        "LocalLift is designed to help one small local business keep track of stock in a simpler and more affordable way. Instead of using expensive business software, owners can quickly see low stock items, update quantities, and make better restocking decisions in a layout that is easier to understand and more accessible.",
      accessibilityFeatures: "Accessibility Features",
      usabilityFocus: "Usability Focus",
      accessibilityList: [
        "Clear labels and readable text hierarchy",
        "Simple navigation and fewer confusing actions",
        "High-contrast layout for easier readability",
        "Search and filtering for quicker stock management",
        "English and Spanish language support for bilingual business owners",
      ],
      belowMinimum: "is below minimum stock level and should be restocked soon.",
      noLowStock: "All inventory items are currently at safe stock levels.",
      stock: "Stock",
      minimum: "Minimum",
      currentStockLabel: "Current Stock",
      minimumStock: "Minimum Stock",
      unitCost: "Unit Cost",
      lastUpdated: "Last Updated",
      addStock: "+ Add Stock",
      reduce: "- Reduce",
      restock: "Restock",
      lowStock: "Low Stock",
      medium: "Medium",
      good: "Good",
      allItemsMessage: "Inventory section: manage stock levels for individual items.",
      inventoryTable: "Inventory Table",
      allItems: "All Items",
      totalItemsLabel: "total items",
      reportsMessage: "Reports section: quick overview of inventory health and value.",
      inventorySummary: "Inventory Summary",
      businessReports: "Business Reports",
      visualSummary: "Visual Summary",
      stockHealth: "Stock Health",
      healthyStock: "Healthy Stock Level",
      inventoryValueStrength: "Inventory Value Strength",
      restockingReadiness: "Restocking Readiness",
      accessibilityMessage:
        "Accessibility section: how the system supports simple and inclusive use.",
      inclusiveDesignFeatures: "Inclusive Design Features",
      whyItMatters: "Why It Matters",
      languageSupport: "Language Support",
      bilingualAccess: "Bilingual Access",
      bilingualText:
        "LocalLift includes an English and Spanish option so business owners who feel more comfortable in Spanish can still understand inventory alerts, buttons, and dashboard information clearly.",
      accessibilityFullList: [
        "Clear page sections and readable headings",
        "Simple dashboard structure for less technical users",
        "Search and filters to reduce time spent finding stock items",
        "Buttons with clear action labels like Add Stock and Restock",
        "Color contrast support in both light and dark mode",
        "English and Spanish support for bilingual business owners",
        "Cleaner layout for small business owners who need quick updates",
      ],
    },
    es: {
      appSubtitle: "Control de Inventario",
      dashboard: "Panel",
      inventory: "Inventario",
      reports: "Reportes",
      accessibility: "Accesibilidad",
      lightMode: "Cambiar a modo claro",
      darkMode: "Cambiar a modo oscuro",
      languageButton: "English",
      eyebrow: "Borrador del Proyecto Final",
      title: "Panel de Inventario de Brooklyn Bites Pizzería",
      intro:
        "Un sistema simple para que un negocio local pueda monitorear inventario, necesidades de reabastecimiento y valor de suministros sin usar software costoso o complicado.",
      searchPlaceholder: "Buscar inventario...",
      export: "Exportar inventario",
      welcome: "Bienvenido al administrador de inventario LocalLift.",
      stockUpdated: "Inventario actualizado correctamente.",
      restocked: "Artículo marcado como reabastecido.",
      exportMessage: "Exportación del prototipo completada.",
      totalInventoryItems: "Total de artículos",
      totalInventoryDesc: "Productos y suministros registrados para este negocio",
      lowStockAlerts: "Alertas de bajo inventario",
      lowStockDesc: "Artículos por debajo del nivel mínimo",
      totalUnits: "Unidades en inventario",
      totalUnitsDesc: "Cantidad total de todos los artículos",
      inventoryValue: "Valor estimado del inventario",
      inventoryValueDesc: "Valor aproximado del inventario actual",
      inventoryRecords: "Registros de inventario",
      currentStock: "Inventario actual",
      lowStockAlertList: "Lista de bajo inventario",
      restockingPriorities: "Prioridades de reabastecimiento",
      projectPurpose: "Propósito del proyecto",
      socialImpactGoal: "Meta de impacto social",
      impactText:
        "LocalLift está diseñado para ayudar a un pequeño negocio local a controlar su inventario de una manera más simple y económica. En vez de usar software empresarial costoso, los dueños pueden ver artículos bajos, actualizar cantidades y tomar mejores decisiones de reabastecimiento en un diseño más claro y accesible.",
      accessibilityFeatures: "Funciones de accesibilidad",
      usabilityFocus: "Enfoque de usabilidad",
      accessibilityList: [
        "Etiquetas claras y texto fácil de leer",
        "Navegación simple con menos acciones confusas",
        "Diseño de alto contraste para mejor lectura",
        "Búsqueda y filtros para manejar inventario más rápido",
        "Soporte en inglés y español para dueños bilingües",
      ],
      belowMinimum: "está por debajo del nivel mínimo y debe reabastecerse pronto.",
      noLowStock: "Todos los artículos están en niveles seguros.",
      stock: "Cantidad",
      minimum: "Mínimo",
      currentStockLabel: "Inventario actual",
      minimumStock: "Inventario mínimo",
      unitCost: "Costo unitario",
      lastUpdated: "Actualizado",
      addStock: "+ Agregar",
      reduce: "- Reducir",
      restock: "Reabastecer",
      lowStock: "Bajo",
      medium: "Medio",
      good: "Bien",
      allItemsMessage: "Sección de inventario: maneja los niveles de cada artículo.",
      inventoryTable: "Tabla de inventario",
      allItems: "Todos los artículos",
      totalItemsLabel: "artículos en total",
      reportsMessage: "Sección de reportes: resumen rápido de inventario y valor.",
      inventorySummary: "Resumen de inventario",
      businessReports: "Reportes del negocio",
      visualSummary: "Resumen visual",
      stockHealth: "Estado del inventario",
      healthyStock: "Nivel saludable de inventario",
      inventoryValueStrength: "Fortaleza del valor de inventario",
      restockingReadiness: "Preparación para reabastecer",
      accessibilityMessage:
        "Sección de accesibilidad: cómo el sistema apoya un uso simple e inclusivo.",
      inclusiveDesignFeatures: "Funciones de diseño inclusivo",
      whyItMatters: "Por qué importa",
      languageSupport: "Soporte de idioma",
      bilingualAccess: "Acceso bilingüe",
      bilingualText:
        "LocalLift incluye una opción en inglés y español para que los dueños que se sienten más cómodos en español puedan entender claramente las alertas de inventario, los botones y la información del panel.",
      accessibilityFullList: [
        "Secciones claras y encabezados fáciles de leer",
        "Estructura simple para usuarios con menos experiencia técnica",
        "Búsqueda y filtros para encontrar artículos más rápido",
        "Botones con acciones claras como Agregar inventario y Reabastecer",
        "Contraste de color en modo claro y oscuro",
        "Soporte en inglés y español para dueños bilingües",
        "Diseño más limpio para dueños que necesitan información rápida",
      ],
    },
  };

  const t = translations[language];

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
    setMessage(t.stockUpdated);
  };

  const decreaseStock = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.stock > 0
          ? { ...item, stock: item.stock - 1, lastUpdated: "Just now" }
          : item
      )
    );
    setMessage(t.stockUpdated);
  };

  const restockItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: item.minStock + 5, lastUpdated: "Just now" }
          : item
      )
    );
    setMessage(t.restocked);
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock < minStock) return t.lowStock;
    if (stock <= minStock + 3) return t.medium;
    return t.good;
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

  const toggleLanguage = () => {
    const nextLanguage = language === "en" ? "es" : "en";
    setLanguage(nextLanguage);
    setMessage(translations[nextLanguage].welcome);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-icon">L</div>
            <div>
              <h2>LocalLift</h2>
              <p>{t.appSubtitle}</p>
            </div>
          </div>

          <nav className="nav-links">
            <button
              className={`nav-btn ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveSection("dashboard")}
            >
              {t.dashboard}
            </button>

            <button
              className={`nav-btn ${activeSection === "inventory" ? "active" : ""}`}
              onClick={() => setActiveSection("inventory")}
            >
              {t.inventory}
            </button>

            <button
              className={`nav-btn ${activeSection === "reports" ? "active" : ""}`}
              onClick={() => setActiveSection("reports")}
            >
              {t.reports}
            </button>

            <button
              className={`nav-btn ${
                activeSection === "accessibility" ? "active" : ""
              }`}
              onClick={() => setActiveSection("accessibility")}
            >
              {t.accessibility}
            </button>
          </nav>
        </div>

        <div className="sidebar-actions">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? t.lightMode : t.darkMode}
          </button>

          <button className="language-toggle" onClick={toggleLanguage}>
            {t.languageButton}
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="subtext">{t.intro}</p>
          </div>
        </header>

        {activeSection === "dashboard" && (
          <>
            <section className="toolbar">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
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
                onClick={() => setMessage(t.exportMessage)}
              >
                {t.export}
              </button>
            </section>

            <p className="system-message">{message}</p>

            <section className="stats-grid">
              <div className="stat-card">
                <span>{t.totalInventoryItems}</span>
                <h3>{totalItems}</h3>
                <p>{t.totalInventoryDesc}</p>
              </div>

              <div className="stat-card">
                <span>{t.lowStockAlerts}</span>
                <h3>{lowStockItems.length}</h3>
                <p>{t.lowStockDesc}</p>
              </div>

              <div className="stat-card">
                <span>{t.totalUnits}</span>
                <h3>{totalStockUnits}</h3>
                <p>{t.totalUnitsDesc}</p>
              </div>

              <div className="stat-card">
                <span>{t.inventoryValue}</span>
                <h3>${estimatedInventoryValue}</h3>
                <p>{t.inventoryValueDesc}</p>
              </div>
            </section>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="panel-label">{t.inventoryRecords}</p>
                    <h2>{t.currentStock}</h2>
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
                          <span className="info-label">{t.stock}</span>
                          <strong>{item.stock}</strong>
                        </div>
                        <div>
                          <span className="info-label">{t.minimum}</span>
                          <strong>{item.minStock}</strong>
                        </div>
                        <div>
                          <span className="info-label">{t.unitCost}</span>
                          <strong>${item.price}</strong>
                        </div>
                        <div>
                          <span className="info-label">{t.lastUpdated}</span>
                          <strong>{item.lastUpdated}</strong>
                        </div>
                      </div>

                      <div className="card-actions">
                        <button
                          className="primary-btn small-btn"
                          onClick={() => increaseStock(item.id)}
                        >
                          {t.addStock}
                        </button>
                        <button
                          className="secondary-btn small-btn"
                          onClick={() => decreaseStock(item.id)}
                        >
                          {t.reduce}
                        </button>
                        <button
                          className="secondary-btn small-btn"
                          onClick={() => restockItem(item.id)}
                        >
                          {t.restock}
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
                      <p className="panel-label">{t.lowStockAlertList}</p>
                      <h2>{t.restockingPriorities}</h2>
                    </div>
                  </div>

                  <ul className="alerts-list">
                    {lowStockItems.length > 0 ? (
                      lowStockItems.map((item) => (
                        <li key={item.id}>
                          {item.name} {t.belowMinimum}
                        </li>
                      ))
                    ) : (
                      <li>{t.noLowStock}</li>
                    )}
                  </ul>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">{t.projectPurpose}</p>
                      <h2>{t.socialImpactGoal}</h2>
                    </div>
                  </div>

                  <p className="impact-text">{t.impactText}</p>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">{t.accessibilityFeatures}</p>
                      <h2>{t.usabilityFocus}</h2>
                    </div>
                  </div>

                  <ul className="alerts-list">
                    {t.accessibilityList.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === "inventory" && (
          <>
            <p className="system-message">{t.allItemsMessage}</p>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <p className="panel-label">{t.inventoryTable}</p>
                  <h2>{t.allItems}</h2>
                </div>
                <span className="count-pill">
                  {items.length} {t.totalItemsLabel}
                </span>
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
                        <span className="info-label">{t.currentStockLabel}</span>
                        <strong>{item.stock}</strong>
                      </div>
                      <div>
                        <span className="info-label">{t.minimumStock}</span>
                        <strong>{item.minStock}</strong>
                      </div>
                      <div>
                        <span className="info-label">{t.unitCost}</span>
                        <strong>${item.price}</strong>
                      </div>
                      <div>
                        <span className="info-label">{t.lastUpdated}</span>
                        <strong>{item.lastUpdated}</strong>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button
                        className="primary-btn small-btn"
                        onClick={() => increaseStock(item.id)}
                      >
                        {t.addStock}
                      </button>
                      <button
                        className="secondary-btn small-btn"
                        onClick={() => decreaseStock(item.id)}
                      >
                        {t.reduce}
                      </button>
                      <button
                        className="secondary-btn small-btn"
                        onClick={() => restockItem(item.id)}
                      >
                        {t.restock}
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
            <p className="system-message">{t.reportsMessage}</p>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="panel-label">{t.inventorySummary}</p>
                    <h2>{t.businessReports}</h2>
                  </div>
                </div>

                <div className="stats-grid reports-grid">
                  <div className="stat-card">
                    <span>{t.totalInventoryItems}</span>
                    <h3>{totalItems}</h3>
                    <p>{t.totalInventoryDesc}</p>
                  </div>

                  <div className="stat-card">
                    <span>{t.lowStockAlerts}</span>
                    <h3>{lowStockItems.length}</h3>
                    <p>{t.lowStockDesc}</p>
                  </div>

                  <div className="stat-card">
                    <span>{t.totalUnits}</span>
                    <h3>{totalStockUnits}</h3>
                    <p>{t.totalUnitsDesc}</p>
                  </div>

                  <div className="stat-card">
                    <span>{t.inventoryValue}</span>
                    <h3>${estimatedInventoryValue}</h3>
                    <p>{t.inventoryValueDesc}</p>
                  </div>
                </div>
              </div>

              <div className="right-panel">
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">{t.visualSummary}</p>
                      <h2>{t.stockHealth}</h2>
                    </div>
                  </div>

                  <div className="goal-item">
                    <div className="goal-top">
                      <span>{t.healthyStock}</span>
                      <strong>{100 - lowStockItems.length * 10}%</strong>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${Math.max(
                            40,
                            100 - lowStockItems.length * 10
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="goal-item">
                    <div className="goal-top">
                      <span>{t.inventoryValueStrength}</span>
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
                      <span>{t.restockingReadiness}</span>
                      <strong>{lowStockItems.length === 0 ? "100%" : "72%"}</strong>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar"
                        style={{
                          width: lowStockItems.length === 0 ? "100%" : "72%",
                        }}
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
            <p className="system-message">{t.accessibilityMessage}</p>

            <section className="content-grid">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="panel-label">{t.accessibility}</p>
                    <h2>{t.inclusiveDesignFeatures}</h2>
                  </div>
                </div>

                <ul className="alerts-list">
                  {t.accessibilityFullList.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="right-panel">
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">{t.whyItMatters}</p>
                      <h2>{t.socialImpactGoal}</h2>
                    </div>
                  </div>

                  <p className="impact-text">{t.impactText}</p>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <p className="panel-label">{t.languageSupport}</p>
                      <h2>{t.bilingualAccess}</h2>
                    </div>
                  </div>

                  <p className="impact-text">{t.bilingualText}</p>
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