import { APP_NAME } from './config.js';

const baseStyles = `
  body {
    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    background: #f7f8fa;
    color: #222;
    margin: 0;
    padding: 0;
  }
  .container {
    background: #fff;
    max-width: 480px;
    margin: 40px auto;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    padding: 32px 28px 24px 28px;
  }
  .brand {
    color: #4f46e5;
    font-weight: 700;
    font-size: 1.5em;
    margin-bottom: 8px;
    letter-spacing: 1px;
  }
  .code {
    display: inline-block;
    background: #f1f5f9;
    color: #1e293b;
    font-size: 1.2em;
    font-weight: bold;
    padding: 8px 18px;
    border-radius: 6px;
    margin: 16px 0;
    letter-spacing: 2px;
  }
  .footer {
    margin-top: 32px;
    font-size: 0.95em;
    color: #64748b;
    text-align: center;
  }
`;

export function signUpEmail(code: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${APP_NAME}</title>
    <style>${baseStyles}</style>
  </head>
  <body>
    <div class="container">
      <div class="brand">${APP_NAME}</div>
      <h2>Welcome!</h2>
      <p>Thank you for joining <b>${APP_NAME}</b>. To complete your registration, please use the verification code below:</p>
      <div class="code">${code}</div>
      <p>If you did not request this, you can safely ignore this email.</p>
      <div class="footer">&copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</div>
    </div>
  </body>
</html>`;
}

export function forgotPasswordEmail(code: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your ${APP_NAME} Password</title>
    <style>${baseStyles}</style>
  </head>
  <body>
    <div class="container">
      <div class="brand">${APP_NAME}</div>
      <h2>Password Reset Request</h2>
      <p>We received a request to reset your <b>${APP_NAME}</b> password. Use the code below to proceed:</p>
      <div class="code">${code}</div>
      <p>If you did not request this, you can safely ignore this email.</p>
      <div class="footer">&copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</div>
    </div>
  </body>
</html>`;
}

export function adminCreateUserEmail(code: string, username: string = ''): string {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${APP_NAME}</title>
    <style>
      body {
        font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
        background: #f7f8fa;
        color: #222;
        margin: 0;
        padding: 0;
        line-height: 1.5;
      }
      .container {
        background: #fff;
        max-width: 580px;
        margin: 40px auto;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        padding: 40px 32px;
      }
      .header {
        text-align: center;
        margin-bottom: 25px;
      }
      .brand {
        color: #4f46e5;
        font-weight: 700;
        font-size: 2em;
        margin-bottom: 8px;
        letter-spacing: 1px;
      }
      h2 {
        color: #1e293b;
        font-weight: 600;
        font-size: 1.5rem;
        margin-top: 0;
        margin-bottom: 20px;
      }
      .code-container {
        text-align: center;
        margin: 30px 0;
      }
      .code {
        display: inline-block;
        background: #f1f5f9;
        color: #1e293b;
        font-size: 1.4em;
        font-weight: bold;
        padding: 12px 24px;
        border-radius: 6px;
        letter-spacing: 2px;
        text-align: center;
      }
      .button {
        display: inline-block;
        background-color: #4f46e5;
        color: white !important;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-weight: 600;
        margin: 24px 0;
        text-align: center;
      }
      .secondary-text {
        color: #64748b;
        font-size: 0.95em;
        margin-top: 16px;
      }
      .divider {
        border-top: 1px solid #e2e8f0;
        margin: 32px 0;
      }
      .footer {
        margin-top: 32px;
        font-size: 0.9em;
        color: #64748b;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="brand">${APP_NAME}</div>
      </div>
      
      <h2>Welcome to ${APP_NAME}!</h2>
      
      <p>
        You have been invited to join the ${APP_NAME} platform. We're excited to have you on board!
      </p>
      
      <p><strong>Getting Started:</strong></p>
      <ol>
        <li>Use the temporary password below to sign in</li>
        <li>You'll be prompted to create your own password</li>
        <li>Complete your profile to get the most out of ${APP_NAME}</li>
      </ol>
      
      <div class="code-container">
        <p><strong>Your Temporary Password:</strong></p>
        <div class="code">${code}</div>
      </div>
      
      <p style="text-align: center;">
        <a href="https://app.healio.space/login" class="button">Sign In Now</a>
      </p>
      
      <p class="secondary-text">
        If you have any questions or need assistance, please contact our support team at <a href="mailto:support@dosapes.com">support@dosapes.com</a>.
      </p>
      
      <div class="divider"></div>
      
      <div class="footer">
        <p>© ${currentYear} ${APP_NAME}. All rights reserved.</p>
        <p>Powered by HealioSpace - Transform Your Health Journey</p>
      </div>
    </div>
  </body>
</html>`;
}

