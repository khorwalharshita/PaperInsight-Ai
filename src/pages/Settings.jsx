
import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [settings, setSettings] = useState({
    name: "Researcher",
    email: "researcher@example.com",
    citationStyle: "APA",
    language: "English",
    emailNotifications: true,
    analysisAlerts: true,
    recommendations: false,
    theme: "Light",
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  const handleReset = () => {
    setSettings({
      name: "Researcher",
      email: "researcher@example.com",
      citationStyle: "APA",
      language: "English",
      emailNotifications: true,
      analysisAlerts: true,
      recommendations: false,
      theme: "Light",
    });
    setSaved(false);
  };

  const Toggle = ({ label, description, checked, onChange }) => (
    <div className="setting-toggle-row">
      <div className="setting-toggle-info">
        <h4>{label}</h4>
        <p>{description}</p>
      </div>

      <button
        className={`toggle-switch ${checked ? "active" : ""}`}
        onClick={() => onChange(!checked)}
        type="button"
        aria-label={label}
      >
        <span></span>
      </button>
    </div>
  );

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <div>
          <h1>Settings</h1>
          <p>Manage your account and research workspace preferences.</p>
        </div>
      </div>

      {/* Profile Settings */}
      <section className="settings-card">
        <div className="settings-section-heading">
          <div className="settings-icon purple">
            <i className="fa-solid fa-user"></i>
          </div>
          <div>
            <h2>Profile Information</h2>
            <p>Update your personal account details.</p>
          </div>
        </div>

        <div className="settings-form-grid">
          <div className="settings-field">
            <label>Full Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => updateSetting("name", e.target.value)}
            />
          </div>

          <div className="settings-field">
            <label>Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => updateSetting("email", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Research Preferences */}
      <section className="settings-card">
        <div className="settings-section-heading">
          <div className="settings-icon blue">
            <i className="fa-solid fa-book"></i>
          </div>
          <div>
            <h2>Research Preferences</h2>
            <p>Customize how your research content is organized.</p>
          </div>
        </div>

        <div className="settings-form-grid">
          <div className="settings-field">
            <label>Default Citation Style</label>
            <select
              value={settings.citationStyle}
              onChange={(e) =>
                updateSetting("citationStyle", e.target.value)
              }
            >
              <option value="APA">APA</option>
              <option value="IEEE">IEEE</option>
              <option value="MLA">MLA</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>

          <div className="settings-field">
            <label>Language</label>
            <select
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="settings-card">
        <div className="settings-section-heading">
          <div className="settings-icon orange">
            <i className="fa-solid fa-bell"></i>
          </div>
          <div>
            <h2>Notifications</h2>
            <p>Choose which notifications you want to receive.</p>
          </div>
        </div>

        <Toggle
          label="Email Notifications"
          description="Receive important updates and workspace notifications."
          checked={settings.emailNotifications}
          onChange={(value) => updateSetting("emailNotifications", value)}
        />

        <Toggle
          label="Analysis Completion Alerts"
          description="Get notified when your paper analysis is completed."
          checked={settings.analysisAlerts}
          onChange={(value) => updateSetting("analysisAlerts", value)}
        />

        <Toggle
          label="Research Recommendations"
          description="Receive suggestions for related papers and research topics."
          checked={settings.recommendations}
          onChange={(value) => updateSetting("recommendations", value)}
        />
      </section>

      {/* Appearance */}
      <section className="settings-card">
        <div className="settings-section-heading">
          <div className="settings-icon pink">
            <i className="fa-solid fa-palette"></i>
          </div>
          <div>
            <h2>Appearance</h2>
            <p>Customize the look of your research workspace.</p>
          </div>
        </div>

        <div className="settings-field theme-field">
          <label>Workspace Theme</label>
          <div className="theme-options">
            {["Light", "Dark", "System"].map((theme) => (
              <button
                key={theme}
                className={`theme-option ${
                  settings.theme === theme ? "selected" : ""
                }`}
                onClick={() => updateSetting("theme", theme)}
                type="button"
              >
                <i
                  className={`fa-solid ${
                    theme === "Light"
                      ? "fa-sun"
                      : theme === "Dark"
                      ? "fa-moon"
                      : "fa-desktop"
                  }`}
                ></i>
                {theme}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="settings-actions">
        <button className="reset-settings-btn" onClick={handleReset}>
          Reset
        </button>

        <button className="save-settings-btn" onClick={handleSave}>
          <i className="fa-solid fa-check"></i>
          Save Changes
        </button>
      </div>

      {saved && (
        <div className="settings-success">
          <i className="fa-solid fa-circle-check"></i>
          Settings saved successfully!
        </div>
      )}
    </div>
  );
}

export default Settings;
