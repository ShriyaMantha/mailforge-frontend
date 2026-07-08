import { useState, useEffect } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const API = "https://mailforge-backend-production.up.railway.app";

function getToken() { return localStorage.getItem("mf_token"); }
function saveToken(t) { localStorage.setItem("mf_token", t); }
function clearToken() { localStorage.removeItem("mf_token"); }
function saveUser(u) { localStorage.setItem("mf_user", JSON.stringify(u)); }
function getUser() { try { return JSON.parse(localStorage.getItem("mf_user") || "null"); } catch { return null; } }
function clearUser() { localStorage.removeItem("mf_user"); }
function authHeaders() { return { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` }; }

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Something went wrong.");
  return data;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }
  .app { min-height: 100vh; background: #f7f6f3; }
  .auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f7f6f3; }
  .auth-card { background: #fff; border: 1px solid #e5e3de; border-radius: 16px; padding: 2.5rem; width: 100%; max-width: 400px; }
  .auth-logo { font-family: 'DM Serif Display', serif; font-size: 22px; color: #1a1916; margin-bottom: 0.25rem; }
  .auth-sub { font-size: 13px; color: #888; margin-bottom: 2rem; }
  .auth-tabs { display: flex; border-bottom: 1px solid #e5e3de; margin-bottom: 1.75rem; }
  .auth-tab { flex: 1; padding: 0.6rem; font-size: 14px; font-weight: 500; border: none; background: none; cursor: pointer; color: #aaa; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s; }
  .auth-tab.active { color: #1a1916; border-bottom-color: #1a1916; }
  .field { margin-bottom: 1rem; }
  .field label { display: block; font-size: 12px; font-weight: 500; color: #555; margin-bottom: 0.4rem; letter-spacing: 0.03em; text-transform: uppercase; }
  .field input { width: 100%; padding: 0.625rem 0.875rem; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border 0.15s; background: #fafaf8; color: #1a1916; }
  .field input:focus { border-color: #1a1916; background: #fff; }
  .btn-primary { width: 100%; padding: 0.7rem; background: #1a1916; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.15s; margin-top: 0.5rem; }
  .btn-primary:hover { opacity: 0.85; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .err { font-size: 13px; color: #c0392b; margin-top: 0.75rem; text-align: center; }
  .ok { font-size: 13px; color: #27ae60; margin-top: 0.75rem; text-align: center; }
  .forgot-link-row { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
  .link-btn { background: none; border: none; padding: 0; font-size: 12.5px; color: #888; cursor: pointer; font-family: 'DM Sans', sans-serif; text-decoration: underline; }
  .link-btn:hover { color: #1a1916; }
  .link-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .dash { display: flex; min-height: 100vh; }
  .sidebar { width: 220px; background: #fff; border-right: 1px solid #e5e3de; padding: 1.5rem 1.25rem; display: flex; flex-direction: column; position: fixed; height: 100vh; }
  .sidebar-logo { font-family: 'DM Serif Display', serif; font-size: 18px; color: #1a1916; margin-bottom: 2rem; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 0.55rem 0.75rem; border-radius: 8px; font-size: 13.5px; color: #555; cursor: pointer; transition: all 0.15s; margin-bottom: 2px; border: none; background: none; width: 100%; text-align: left; font-family: 'DM Sans', sans-serif; }
  .nav-item:hover { background: #f5f4f0; color: #1a1916; }
  .nav-item.active { background: #f0ede8; color: #1a1916; font-weight: 500; }
  .nav-icon { font-size: 16px; }
  .sidebar-footer { margin-top: auto; }
  .user-pill { display: flex; align-items: center; gap: 8px; padding: 0.5rem 0.75rem; border-radius: 8px; background: #f5f4f0; }
  .avatar { width: 28px; height: 28px; border-radius: 50%; background: #1a1916; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0; }
  .user-name { font-size: 13px; font-weight: 500; color: #1a1916; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .logout-btn { background: none; border: none; font-size: 12px; color: #aaa; cursor: pointer; font-family: 'DM Sans', sans-serif; flex-shrink: 0; }
  .logout-btn:hover { color: #c0392b; }
  .main { margin-left: 220px; padding: 2rem 2.5rem; flex: 1; }
  .page-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: #1a1916; margin-bottom: 0.25rem; }
  .page-sub { font-size: 14px; color: #888; margin-bottom: 2rem; }
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
  .stat-card { background: #fff; border: 1px solid #e5e3de; border-radius: 12px; padding: 1.25rem 1.5rem; }
  .stat-label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.5rem; }
  .stat-val { font-size: 28px; font-weight: 300; color: #1a1916; }
  .stat-val span { font-size: 14px; color: #aaa; margin-left: 6px; }
  .section-card { background: #fff; border: 1px solid #e5e3de; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .section-head { font-size: 15px; font-weight: 600; color: #1a1916; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; }
  .form-field { display: flex; flex-direction: column; gap: 0.4rem; }
  .form-field label { font-size: 12px; font-weight: 500; color: #555; letter-spacing: 0.03em; text-transform: uppercase; }
  .form-field input, .form-field textarea { padding: 0.6rem 0.875rem; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border 0.15s; background: #fafaf8; color: #1a1916; }
  .form-field input:focus, .form-field textarea:focus { border-color: #1a1916; background: #fff; }
  .form-field textarea { resize: vertical; min-height: 80px; }
  .prospect-row { display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 0.75rem; align-items: end; margin-bottom: 0.75rem; }
  .add-row-btn { background: none; border: 1px dashed #ccc; border-radius: 8px; padding: 0.5rem 1rem; font-size: 13px; color: #888; cursor: pointer; font-family: 'DM Sans', sans-serif; width: 100%; margin-top: 0.5rem; transition: all 0.15s; }
  .add-row-btn:hover { border-color: #1a1916; color: #1a1916; }
  .remove-btn { background: none; border: 1px solid #e5e3de; border-radius: 8px; padding: 0.5rem 0.6rem; cursor: pointer; color: #aaa; font-size: 16px; transition: all 0.15s; line-height: 1; }
  .remove-btn:hover { border-color: #e74c3c; color: #e74c3c; }
  .action-row { display: flex; gap: 0.75rem; margin-top: 1.25rem; flex-wrap: wrap; }
  .btn-gen { padding: 0.65rem 1.5rem; background: #fff; border: 1px solid #1a1916; border-radius: 8px; font-size: 14px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; color: #1a1916; }
  .btn-gen:hover { background: #f5f4f0; }
  .btn-gen:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-send { padding: 0.65rem 1.5rem; background: #1a1916; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.15s; color: #fff; }
  .btn-send:hover { opacity: 0.85; }
  .btn-send:disabled { opacity: 0.4; cursor: not-allowed; }
  .preview-list { display: flex; flex-direction: column; gap: 1rem; }
  .preview-item { border: 1px solid #e5e3de; border-radius: 10px; overflow: hidden; }
  .preview-header { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: #f7f6f3; cursor: pointer; }
  .preview-name { font-size: 14px; font-weight: 500; color: #1a1916; }
  .preview-email-addr { font-size: 12px; color: #888; }
  .preview-chevron { font-size: 14px; color: #aaa; transition: transform 0.2s; }
  .preview-chevron.open { transform: rotate(180deg); }
  .preview-body { padding: 1rem; border-top: 1px solid #e5e3de; }
  .preview-subject { font-size: 13px; font-weight: 600; color: #1a1916; margin-bottom: 0.75rem; }
  .preview-text { font-size: 13px; color: #444; line-height: 1.7; white-space: pre-wrap; }
  .preview-edit-label { font-size: 11px; font-weight: 500; color: #888; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 0.35rem; display: block; }
  .preview-edit-subject { width: 100%; padding: 0.55rem 0.75rem; border: 1px solid #ddd; border-radius: 7px; font-size: 13.5px; font-weight: 600; font-family: 'DM Sans', sans-serif; background: #fafaf8; color: #1a1916; outline: none; transition: border 0.15s; margin-bottom: 1rem; }
  .preview-edit-subject:focus { border-color: #1a1916; background: #fff; }
  .preview-edit-subject:disabled, .preview-edit-body:disabled { opacity: 0.6; cursor: not-allowed; }
  .preview-edit-body { width: 100%; min-height: 160px; padding: 0.75rem; border: 1px solid #ddd; border-radius: 7px; font-size: 13px; line-height: 1.7; font-family: 'DM Sans', sans-serif; color: #1a1916; background: #fafaf8; outline: none; resize: vertical; transition: border 0.15s; }
  .preview-edit-body:focus { border-color: #1a1916; background: #fff; }
  .preview-edit-hint { font-size: 11.5px; color: #aaa; margin-top: 0.5rem; }
  .status-badge { font-size: 11px; padding: 2px 8px; border-radius: 20px; font-weight: 500; }
  .badge-pending { background: #fef3cd; color: #856404; }
  .badge-sent { background: #d1f0e0; color: #155724; }
  .badge-error { background: #fde8e8; color: #721c24; }
  .campaigns-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  .campaigns-table th { text-align: left; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: #888; padding: 0 0.75rem 0.75rem; border-bottom: 1px solid #e5e3de; }
  .campaigns-table td { padding: 0.875rem 0.75rem; border-bottom: 1px solid #f0ede8; color: #333; vertical-align: middle; }
  .campaigns-table tr:last-child td { border-bottom: none; }
  .campaigns-table tr:hover td { background: #fafaf8; }
  .empty-state { text-align: center; padding: 3rem; color: #aaa; font-size: 14px; }
  .gmail-banner { display: flex; align-items: center; justify-content: space-between; background: #fef3cd; border: 1px solid #fde68a; border-radius: 10px; padding: 0.875rem 1.25rem; margin-bottom: 1.5rem; }
  .gmail-banner-text { font-size: 13.5px; color: #92400e; }
  .gmail-banner-text strong { font-weight: 600; }
  .btn-connect { padding: 0.5rem 1.1rem; background: #1a1916; color: #fff; border: none; border-radius: 7px; font-size: 13px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; }
  .btn-connect:hover { opacity: 0.85; }
  .connected-pill { display: inline-flex; align-items: center; gap: 6px; background: #d1f0e0; color: #155724; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 500; }
  .toast { position: fixed; bottom: 2rem; right: 2rem; background: #1a1916; color: #fff; padding: 0.75rem 1.25rem; border-radius: 10px; font-size: 14px; z-index: 999; animation: slideUp 0.3s ease; max-width: 320px; }
  .toast.success { background: #155724; }
  .toast.error { background: #7f1d1d; }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; margin-right: 8px; vertical-align: middle; }
  .spinner.dark { border-color: rgba(0,0,0,0.15); border-top-color: #1a1916; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

function Toast({ msg, type = "default", onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  return <div className={`toast ${type}`}>{msg}</div>;
}

function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("login"); // "login" | "register" | "forgot"
  const [forgotStep, setForgotStep] = useState(1); // 1 = request code, 2 = enter code + new password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);
  const reset = () => { setErr(""); setOk(""); };

  const goToTab = (t) => { setTab(t); setForgotStep(1); reset(); };

  const handleLogin = async () => {
    reset();
    if (!email || !pass) { setErr("Please enter your email and password."); return; }
    setLoading(true);
    try {
      const data = await apiFetch("/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password: pass }) });
      saveToken(data.token); saveUser(data.user); onLogin(data.user);
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  const handleRegister = async () => {
    reset();
    if (!name || !email || !pass) { setErr("All fields are required."); return; }
    if (pass.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const data = await apiFetch("/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password: pass }) });
      saveToken(data.token); saveUser(data.user); onLogin(data.user);
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  const handleForgotRequest = async () => {
    reset();
    if (!email) { setErr("Enter the email on your account."); return; }
    setLoading(true);
    try {
      await apiFetch("/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      setOk("If that email has an account, a 6-digit code is on its way. Check your inbox.");
      setForgotStep(2);
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  const handleResetPassword = async () => {
    reset();
    if (!resetCode || !newPass) { setErr("Enter the code and a new password."); return; }
    if (newPass.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const data = await apiFetch("/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, code: resetCode, new_password: newPass }) });
      saveToken(data.token); saveUser(data.user); onLogin(data.user);
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">MailForge</div>
        <div className="auth-sub">AI-powered cold outreach, personalised.</div>
        {tab !== "forgot" && (
          <div className="auth-tabs">
            <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => goToTab("login")}>Sign in</button>
            <button className={`auth-tab ${tab === "register" ? "active" : ""}`} onClick={() => goToTab("register")}>Create account</button>
          </div>
        )}

        {tab === "login" && (
          <>
            <div className="field"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" onKeyDown={e => e.key === "Enter" && handleLogin()} /></div>
            <div className="field"><label>Password</label><input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleLogin()} /></div>
            <div style={{ textAlign: "right", marginTop: "-0.5rem" }}><button className="link-btn" onClick={() => goToTab("forgot")}>Forgot password?</button></div>
            <button className="btn-primary" onClick={handleLogin} disabled={loading}>{loading ? <><span className="spinner"></span>Signing in…</> : "Sign in"}</button>
          </>
        )}

        {tab === "register" && (
          <>
            <div className="field"><label>Full name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Alex Johnson" /></div>
            <div className="field"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
            <div className="field"><label>Password</label><input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="At least 6 characters" /></div>
            <button className="btn-primary" onClick={handleRegister} disabled={loading}>{loading ? <><span className="spinner"></span>Creating account…</> : "Create account"}</button>
          </>
        )}

        {tab === "forgot" && forgotStep === 1 && (
          <>
            <div className="auth-sub" style={{ marginBottom: "1.5rem" }}>Enter your account email and we'll send a 6-digit reset code.</div>
            <div className="field"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" onKeyDown={e => e.key === "Enter" && handleForgotRequest()} /></div>
            <button className="btn-primary" onClick={handleForgotRequest} disabled={loading}>{loading ? <><span className="spinner"></span>Sending code…</> : "Send reset code"}</button>
            <div className="forgot-link-row" style={{ justifyContent: "center" }}><button className="link-btn" onClick={() => goToTab("login")}>Back to sign in</button></div>
          </>
        )}

        {tab === "forgot" && forgotStep === 2 && (
          <>
            <div className="auth-sub" style={{ marginBottom: "1.5rem" }}>Enter the code sent to {email} and choose a new password.</div>
            <div className="field"><label>Reset code</label><input type="text" inputMode="numeric" maxLength={6} value={resetCode} onChange={e => setResetCode(e.target.value.replace(/\D/g, ""))} placeholder="123456" /></div>
            <div className="field"><label>New password</label><input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="At least 6 characters" onKeyDown={e => e.key === "Enter" && handleResetPassword()} /></div>
            <button className="btn-primary" onClick={handleResetPassword} disabled={loading}>{loading ? <><span className="spinner"></span>Resetting…</> : "Reset password and sign in"}</button>
            <div className="forgot-link-row">
              <button className="link-btn" onClick={handleForgotRequest} disabled={loading}>Resend code</button>
              <button className="link-btn" onClick={() => goToTab("login")}>Back to sign in</button>
            </div>
          </>
        )}

        {err && <div className="err">{err}</div>}
        {ok && <div className="ok">{ok}</div>}
      </div>
    </div>
  );
}

function Sidebar({ active, setActive, user, onLogout }) {
  const initials = user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="sidebar">
      <div className="sidebar-logo">MailForge</div>
      {[{ id: "compose", label: "Compose", icon: "✦" }, { id: "campaigns", label: "Campaigns", icon: "◈" }, { id: "settings", label: "Settings", icon: "⚙" }].map(n => (
        <button key={n.id} className={`nav-item ${active === n.id ? "active" : ""}`} onClick={() => setActive(n.id)}>
          <span className="nav-icon">{n.icon}</span>{n.label}
        </button>
      ))}
      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="avatar">{initials}</div>
          <div className="user-name">{user.name}</div>
          <button className="logout-btn" onClick={onLogout}>Out</button>
        </div>
      </div>
    </div>
  );
}

function GmailBanner({ user }) {
  const [loading, setLoading] = useState(false);
  const connectGmail = async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/gmail/connect", { headers: authHeaders() });
      window.location.href = data.auth_url;
    } catch (e) { alert(e.message); setLoading(false); }
  };
  if (user.gmail_connected) {
    return (
      <div className="gmail-banner" style={{ background: "#d1f0e0", border: "1px solid #a7e3c0" }}>
        <span className="gmail-banner-text" style={{ color: "#155724" }}><strong>Gmail connected</strong> — emails will be sent from your account.</span>
        <span className="connected-pill">✓ Connected</span>
      </div>
    );
  }
  return (
    <div className="gmail-banner">
      <span className="gmail-banner-text"><strong>Connect Gmail</strong> to send emails directly from your account.</span>
      <button className="btn-connect" onClick={connectGmail} disabled={loading}>{loading ? "Redirecting…" : "Connect Gmail"}</button>
    </div>
  );
}

const emptyProspect = () => ({ id: Date.now() + Math.random(), founder: "", startup: "", email: "" });

function ComposePage({ user, onSent }) {
  const [goal, setGoal] = useState("");
  const [prospects, setProspects] = useState([emptyProspect()]);
  const [previews, setPreviews] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);
  const [toast, setToast] = useState(null);

  const addRow = () => setProspects(p => [...p, emptyProspect()]);
  const removeRow = id => setProspects(p => p.filter(r => r.id !== id));
  const updateRow = (id, field, val) => setProspects(p => p.map(r => r.id === id ? { ...r, [field]: val } : r));
  const updatePreview = (i, field, val) => setPreviews(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));

  const handleGenerate = async () => {
    if (!goal.trim()) { setToast({ msg: "Please enter an outreach goal.", type: "error" }); return; }
    const valid = prospects.filter(p => p.founder.trim() && p.startup.trim() && p.email.trim());
    if (!valid.length) { setToast({ msg: "Add at least one complete prospect row.", type: "error" }); return; }
    setGenerating(true); setPreviews([]);
    try {
      const data = await apiFetch("/campaigns/generate", { method: "POST", headers: authHeaders(), body: JSON.stringify({ prospects: valid.map(({ founder, startup, email }) => ({ founder, startup, email })), goal, sender_name: user.name }) });
      setPreviews(data.map((e, i) => ({ ...e, id: i, status: "pending" }))); setOpenIdx(0);
    } catch (e) { setToast({ msg: `Generation failed: ${e.message}`, type: "error" }); }
    finally { setGenerating(false); }
  };

  const handleSend = async () => {
    if (!user.gmail_connected) { setToast({ msg: "Connect your Gmail first.", type: "error" }); return; }
    setSending(true);
    try {
      const data = await apiFetch("/campaigns/send", { method: "POST", headers: authHeaders(), body: JSON.stringify({ emails: previews.map(({ founder, startup, email, subject, body }) => ({ founder, startup, email, subject, body })), goal }) });
      setPreviews(prev => prev.map((p, i) => ({ ...p, status: data.results[i]?.status || "error" })));
      setToast({ msg: `${data.sent} of ${data.total} emails sent!`, type: "success" }); onSent();
    } catch (e) { setToast({ msg: `Send failed: ${e.message}`, type: "error" }); }
    finally { setSending(false); }
  };

  const statusLabel = s => ({ pending: "Ready to send", sent: "Sent", error: "Error" }[s] || s);
  const statusClass = s => ({ pending: "badge-pending", sent: "badge-sent", error: "badge-error" }[s] || "badge-pending");

  return (
    <div>
      <div className="page-title">Compose campaign</div>
      <div className="page-sub">Generate and send personalised cold emails to multiple founders.</div>
      <GmailBanner user={user} />
      <div className="section-card">
        <div className="section-head">Outreach goal</div>
        <div className="form-field">
          <label>What do you want to achieve?</label>
          <textarea value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g. Book a 15-minute demo call to show how we reduce customer churn by 30%" />
        </div>
      </div>
      <div className="section-card">
        <div className="section-head">Prospects</div>
        {prospects.map((p, i) => (
          <div key={p.id} className="prospect-row">
            <div className="form-field"><label>{i === 0 ? "Founder name" : ""}</label><input value={p.founder} onChange={e => updateRow(p.id, "founder", e.target.value)} placeholder="Jane Smith" /></div>
            <div className="form-field"><label>{i === 0 ? "Startup name" : ""}</label><input value={p.startup} onChange={e => updateRow(p.id, "startup", e.target.value)} placeholder="Acme Inc." /></div>
            <div className="form-field"><label>{i === 0 ? "Email address" : ""}</label><input type="email" value={p.email} onChange={e => updateRow(p.id, "email", e.target.value)} placeholder="jane@acme.com" /></div>
            <div className="form-field"><label>{i === 0 ? "\u00a0" : ""}</label><button className="remove-btn" onClick={() => removeRow(p.id)}>×</button></div>
          </div>
        ))}
        <button className="add-row-btn" onClick={addRow}>+ Add prospect</button>
        <div className="action-row">
          <button className="btn-gen" onClick={handleGenerate} disabled={generating || sending}>
            {generating ? <><span className="spinner dark"></span>Generating…</> : "Generate emails"}
          </button>
          {previews.some(p => p.status === "pending") && (
            <button className="btn-send" onClick={handleSend} disabled={sending || !user.gmail_connected}>
              {sending ? <><span className="spinner"></span>Sending…</> : `Send ${previews.filter(p => p.status === "pending").length} emails via Gmail`}
            </button>
          )}
        </div>
      </div>
      {previews.length > 0 && (
        <div className="section-card">
          <div className="section-head">Email previews</div>
          <div className="preview-list">
            {previews.map((p, i) => (
              <div key={p.id} className="preview-item">
                <div className="preview-header" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                  <div>
                    <div className="preview-name">{p.founder} · {p.startup}</div>
                    <div className="preview-email-addr">{p.email}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className={`status-badge ${statusClass(p.status)}`}>{statusLabel(p.status)}</span>
                    <span className={`preview-chevron ${openIdx === i ? "open" : ""}`}>▾</span>
                  </div>
                </div>
                {openIdx === i && (
                  <div className="preview-body">
                    <label className="preview-edit-label">Subject</label>
                    <input
                      className="preview-edit-subject"
                      value={p.subject}
                      disabled={p.status === "sent"}
                      onChange={e => updatePreview(i, "subject", e.target.value)}
                    />
                    <label className="preview-edit-label">Body</label>
                    <textarea
                      className="preview-edit-body"
                      value={p.body}
                      disabled={p.status === "sent"}
                      onChange={e => updatePreview(i, "body", e.target.value)}
                    />
                    {p.status !== "sent" && <div className="preview-edit-hint">Edits are saved automatically and used when you send.</div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/campaigns/", { headers: authHeaders() }).then(data => setCampaigns(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const total = campaigns.length;
  const startups = new Set(campaigns.map(c => c.startup)).size;
  const sent = campaigns.filter(c => c.status === "sent").length;

  return (
    <div>
      <div className="page-title">Campaigns</div>
      <div className="page-sub">All your sent outreach campaigns.</div>
      <div className="stats-row">
        <div className="stat-card"><div className="stat-label">Emails sent</div><div className="stat-val">{sent}<span>total</span></div></div>
        <div className="stat-card"><div className="stat-label">Startups reached</div><div className="stat-val">{startups}<span>unique</span></div></div>
        <div className="stat-card"><div className="stat-label">Total records</div><div className="stat-val">{total}<span>entries</span></div></div>
      </div>
      <div className="section-card">
        {loading ? <div className="empty-state"><span className="spinner dark"></span> Loading…</div>
          : campaigns.length === 0 ? <div className="empty-state">No campaigns yet. Go to Compose to send your first batch.</div>
          : (
            <table className="campaigns-table">
              <thead><tr><th>Founder</th><th>Startup</th><th>Email</th><th>Subject</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {campaigns.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 500 }}>{c.founder}</td>
                    <td>{c.startup}</td>
                    <td style={{ color: "#888" }}>{c.email}</td>
                    <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.subject}</td>
                    <td><span className={`status-badge badge-${c.status}`}>{c.status}</span></td>
                    <td style={{ color: "#888", fontSize: 12 }}>{c.sent_at ? new Date(c.sent_at).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}

function SettingsPage({ user, onUserUpdate }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const connectGmail = async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/gmail/connect", { headers: authHeaders() });
      window.location.href = data.auth_url;
    } catch (e) { setToast({ msg: e.message, type: "error" }); setLoading(false); }
  };

  const disconnectGmail = async () => {
    try {
      await apiFetch("/gmail/disconnect", { method: "DELETE", headers: authHeaders() });
      onUserUpdate({ ...user, gmail_connected: false });
      setToast({ msg: "Gmail disconnected.", type: "default" });
    } catch (e) { setToast({ msg: e.message, type: "error" }); }
  };

  return (
    <div>
      <div className="page-title">Settings</div>
      <div className="page-sub">Manage your account and integrations.</div>
      <div className="section-card">
        <div className="section-head">Account</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div><div style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Name</div><div style={{ fontSize: 15, color: "#1a1916" }}>{user.name}</div></div>
          <div><div style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Email</div><div style={{ fontSize: 15, color: "#1a1916" }}>{user.email}</div></div>
        </div>
      </div>
      <div className="section-card">
        <div className="section-head">Gmail integration</div>
        {user.gmail_connected ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="connected-pill">✓ Gmail connected</span>
            <button onClick={disconnectGmail} style={{ background: "none", border: "1px solid #e5e3de", borderRadius: 7, padding: "0.4rem 0.9rem", fontSize: 13, color: "#888", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Disconnect</button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: "1rem" }}>Connect your Gmail to send cold emails directly from your account.</p>
            <button className="btn-connect" onClick={connectGmail} disabled={loading} style={{ padding: "0.65rem 1.5rem", fontSize: 14 }}>{loading ? "Redirecting to Google…" : "Connect Gmail"}</button>
          </>
        )}
      </div>
      <div className="section-card">
        <div className="section-head">Backend API</div>
        <div style={{ background: "#f7f6f3", border: "1px solid #e5e3de", borderRadius: 8, padding: "1rem", fontFamily: "monospace", fontSize: 13, color: "#1a1916" }}>
          Connected to: <strong>{API}</strong>
        </div>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

function Dashboard({ user: initialUser, onLogout }) {
  const [page, setPage] = useState("compose");
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    apiFetch("/auth/me", { headers: authHeaders() }).then(data => { setUser(data); saveUser(data); }).catch(() => {});
  }, []);

  const handleSent = () => {
    apiFetch("/auth/me", { headers: authHeaders() }).then(data => { setUser(data); saveUser(data); }).catch(() => {});
    setPage("campaigns");
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    saveUser(updatedUser);
  };

  return (
    <div className="dash">
      <Sidebar active={page} setActive={setPage} user={user} onLogout={onLogout} />
      <div className="main">
        {page === "compose" && <ComposePage user={user} onSent={handleSent} />}
        {page === "campaigns" && <CampaignsPage />}
        {page === "settings" && <SettingsPage user={user} onUserUpdate={handleUserUpdate} />}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const token = getToken();
    const u = getUser();
    return token && u ? u : null;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("gmail") === "connected" && getToken()) {
      apiFetch("/auth/me", { headers: authHeaders() })
        .then(data => {
          setUser(data);
          saveUser(data);
          window.history.replaceState({}, "", window.location.pathname);
        })
        .catch(() => {});
    }
  }, []);

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => { clearToken(); clearUser(); setUser(null); };

  // Public route — must work without login, for Google's OAuth verification review
  if (window.location.pathname === "/privacy") {
    return (
      <>
        <style>{styles}</style>
        <div className="app">
          <PrivacyPolicy />
        </div>
      </>
    );
  }
  if (window.location.pathname === "/terms") {
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <TermsOfService />
      </div>
    </>
  );
}

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {user ? <Dashboard user={user} onLogout={handleLogout} /> : <AuthPage onLogin={handleLogin} />}
      </div>
    </>
  );
}
