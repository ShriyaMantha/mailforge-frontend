import React from "react";

export default function TermsOfService() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px", lineHeight: 1.6 }}>
      <h1>MailForge Terms of Service</h1>
      <p><em>Last updated: July 2026</em></p>

      <p>
        These Terms of Service ("Terms") govern your use of MailForge (the "app", "service"),
        a tool that helps users write and send personalised cold outreach emails via their own
        Gmail account. By creating an account or using MailForge, you agree to these Terms.
      </p>

      <h2>1. What MailForge Does</h2>
      <p>
        MailForge lets you generate AI-personalised cold outreach emails for prospects you
        provide, and send them from your own connected Gmail account using Google's Gmail API.
        You review and approve every email before it is sent.
      </p>

      <h2>2. Your Responsibilities</h2>
      <ul>
        <li>You must have the legal right to contact everyone you add as a prospect.</li>
        <li>
          You are solely responsible for the content of emails you generate, edit, and send,
          and for complying with applicable anti-spam and email marketing laws (such as
          CAN-SPAM, CASL, or GDPR, where relevant to your use).
        </li>
        <li>You will not use MailForge to send unsolicited bulk email, spam, phishing content, or anything unlawful, harassing, or deceptive.</li>
        <li>You are responsible for keeping your account credentials secure.</li>
      </ul>

      <h2>3. Gmail Access</h2>
      <p>
        When you connect your Gmail account, MailForge uses the <code>gmail.send</code> scope
        to send messages on your behalf, only when you explicitly click send. MailForge does
        not read, modify, or access your existing inbox, threads, or contacts. You can
        disconnect Gmail access at any time from Settings, or directly from your{" "}
        <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer">
          Google Account permissions page
        </a>.
      </p>

      <h2>4. AI-Generated Content</h2>
      <p>
        Email subject lines and bodies are generated using an AI model based on the prospect
        details and outreach goal you provide. You are responsible for reviewing and editing
        generated content before sending — MailForge does not guarantee the accuracy,
        tone, or suitability of AI-generated text for your specific use case.
      </p>

      <h2>5. Service Availability</h2>
      <p>
        MailForge is provided "as is." We do not guarantee uninterrupted availability, and
        features may change, be added, or be removed as the product evolves.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, MailForge and its creator are not liable for
        any indirect, incidental, or consequential damages arising from your use of the
        service, including but not limited to issues arising from emails you choose to send.
      </p>

      <h2>7. Account Termination</h2>
      <p>
        We may suspend or terminate accounts that violate these Terms, including misuse of
        Gmail sending access for spam or abusive outreach.
      </p>

      <h2>8. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of MailForge after changes
        are posted constitutes acceptance of the updated Terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href="mailto:shriyamantha09@gmail.com">shriyamantha09@gmail.com</a>.
      </p>
    </div>
  );
}
