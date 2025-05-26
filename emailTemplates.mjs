import { APP_NAME } from './config.mjs';

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

export function signUpEmail(code) {
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

export function forgotPasswordEmail(code) {
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

export function adminCreateUserEmail(code) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your ${APP_NAME} Account</title>
    <style>${baseStyles}</style>
  </head>
  <body>
    <div class="container">
      <div class="brand">${APP_NAME}</div>
      <h2>Your Account Has Been Created</h2>
      <p>An administrator has created an account for you on <b>${APP_NAME}</b>. Use the temporary password below to sign in and set your own password:</p>
      <div class="code">${code}</div>
      <p>Please sign in and change your password as soon as possible.</p>
      <div class="footer">&copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</div>
    </div>
  </body>
</html>`;
}

