import { APP_NAME } from "./config.js";
import { CognitoEvent } from "./interfaces/cognitoEvent.js";

const rootURL = "https://main.d2yakdlwmmo9ua.amplifyapp.com";
const baseStyles = `
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
`;

function baseEmailTemplate({
  title,
  heading,
  message,
  codeLabel,
  code,
  buttonText,
  buttonUrl,
  secondaryText,
  showButton = true,
}: {
  title: string;
  heading: string;
  message: string;
  codeLabel?: string;
  code?: string;
  buttonText?: string;
  buttonUrl?: string;
  secondaryText?: string;
  showButton?: boolean;
}): string {
  const currentYear = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>${baseStyles}</style>
</head>
<body>
<div class="container">
    <div class="header">
        <div class="brand">${APP_NAME}</div>
    </div>
    <h2>${heading}</h2>
    <p>${message}</p>
    ${
      code
        ? `<div class="code-container">
        ${codeLabel ? `<p><strong>${codeLabel}</strong></p>` : ""}
        <div class="code">${code}</div>
    </div>`
        : ""
    }
    ${showButton && buttonText && buttonUrl ? `<p style="text-align: center;"><a href="${buttonUrl}" class="button">${buttonText}</a></p>` : ""}
    ${secondaryText ? `<p class="secondary-text">${secondaryText}</p>` : ""}
    <div class="divider"></div>
    <div class="footer">
        <p>© ${currentYear} ${APP_NAME}. All rights reserved.</p>
        <p>Powered by HealioSpace - Transform Your Health Journey</p>
    </div>
</div>
</body>
</html>`;
}

export function signUpEmail(code: string, showButton: boolean = false): string {
  return baseEmailTemplate({
    title: `Welcome to ${APP_NAME}`,
    heading: `Welcome to ${APP_NAME}!`,
    message: `Thank you for joining <b>${APP_NAME}</b>. To complete your registration, please use the verification code below:`,
    codeLabel: "Your Verification Code:",
    code,
    buttonText: "Sign In Now",
    buttonUrl: `${rootURL}/login`,
    secondaryText:
      "If you did not request this, you can safely ignore this email.",
    showButton,
  });
}

export function forgotPasswordEmail(cognitoEvent: CognitoEvent): string {
  return baseEmailTemplate({
    title: `Reset Your ${APP_NAME} Password`,
    heading: "Password Reset Request",
    message: `We received a request to reset your <b>${APP_NAME}</b> password. Use the code below to proceed:`,
    codeLabel: "Your Password Reset Code:",
    code: cognitoEvent.request.codeParameter,
    buttonText: "Reset Password",
    buttonUrl: `${rootURL}/login`,
    secondaryText:
      "If you did not request this, you can safely ignore this email.",
    showButton: false,
  });
}

export function adminCreateUserEmail(
  code: string,
  username: string = "",
  showButton: boolean = true,
): string {
  return baseEmailTemplate({
    title: `Welcome to ${APP_NAME}`,
    heading: `Welcome to ${APP_NAME}!`,
    message: `You have been invited to join the ${APP_NAME} platform. We're excited to have you on board!<br><br><strong>Getting Started:</strong><ol><li>Use the temporary password below to sign in</li><li>You'll be prompted to create your own password</li><li>Complete your profile to get the most out of ${APP_NAME}</li></ol>`,
    codeLabel: "Your Temporary Password:",
    code,
    buttonText: "Sign In Now",
    buttonUrl: `${rootURL}/login`,
    secondaryText:
      'If you have any questions or need assistance, please contact our support team at <a href="mailto:support@dosapes.com">support@dosapes.com</a>.',
    showButton,
  });
}

export function preSignUpEmail(
  givenName: string = "User",
  code?: string,
  showButton: boolean = false,
): string {
  return baseEmailTemplate({
    title: `Welcome to ${APP_NAME}`,
    heading: `Welcome, ${givenName}!`,
    message: `Thank you for signing up for <b>${APP_NAME}</b>. We're excited to have you join our community!<br><br>Your account is being processed${code ? ", and you can use the verification code below to complete your registration." : ", and you will receive a verification code shortly to complete your registration."}`,
    codeLabel: code ? "Your verification code:" : undefined,
    code,
    buttonText: "Learn More",
    buttonUrl: `${rootURL}/about`,
    secondaryText:
      'If you have any questions or need assistance, please contact our support team at <a href="mailto:support@dosapes.com">support@dosapes.com</a>.',
    showButton,
  });
}
