import React from "react";

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px", lineHeight: 1.6 }}>
      <h1>MailForge Privacy Policy</h1>
      <p><em>Last updated: July 2026</em></p>

      <p>
        MailForge ("we", "our", "the app") is a tool that helps users write and send
        personalised cold outreach emails. This page explains what information we
        collect, how we use it, and how you can control it.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li><strong>Account information:</strong> your name and email address when you sign up.</li>
        <li>
          <strong>Google account information:</strong> if you choose to connect your Gmail
          account, we receive your Google email address and a secure authorization token
          (via Google OAuth) that allows MailForge to send emails on your behalf.
        </li>
        <li>
          <strong>Prospect data you provide:</strong> names, startup/company names, and
          email addresses you enter into MailForge to generate outreach emails.
        </li>
        <li>
          <strong>Campaign data:</strong> the subject lines and bodies of emails you generate
          and send, along with delivery status, stored so you can view your sending history.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To authenticate you and maintain your MailForge account.</li>
        <li>
          To send emails <strong>on your behalf, from your own Gmail account</strong>, using
          the Gmail API's <code>gmail.send</code> scope — MailForge only sends messages you
          explicitly generate and approve. We do not read, modify, or access your existing
          inbox, contacts, or any other Gmail data.
        </li>
        <li>To generate personalised email content using AI, based on the prospect details you provide.</li>
        <li>To show you your campaign history within the app.</li>
      </ul>

      <h2>3. What We Don't Do</h2>
      <ul>
        <li>We do not sell, rent, or share your personal data or Gmail data with third parties.</li>
        <li>We do not read or access your existing Gmail inbox, threads, or contacts.</li>
        <li>We do not use your data to train AI models.</li>
      </ul>

      <h2>4. Data Storage &amp; Security</h2>
      <p>
        Your account information and Google authorization tokens are stored securely and
        used only to perform the actions you initiate within MailForge. Passwords are
        hashed and never stored in plain text.
      </p>

      <h2>5. Revoking Access</h2>
      <p>
        You can disconnect your Gmail account from MailForge at any time from{" "}
        <strong>Settings → Gmail</strong> within the app, or by visiting your{" "}
        <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer">
          Google Account permissions page
        </a>{" "}
        and removing MailForge's access directly.
      </p>

      <h2>6. Third-Party Services</h2>
      <p>
        MailForge uses Google's Gmail API to send emails on your behalf, in accordance with
        the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">
          Google API Services User Data Policy
        </a>
        , including its Limited Use requirements.
      </p>

      <h2>7. Contact</h2>
      <p>
        If you have questions about this policy or your data, contact us at{" "}
        <a href="mailto:shriyamantha09@gmail.com">shriyamantha09@gmail.com</a>.
      </p>
    </div>
  );
}
