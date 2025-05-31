import { APP_NAME } from './config.js';
import { signUpEmail, forgotPasswordEmail, adminCreateUserEmail } from './emailTemplates.js';
import CognitoEvent from "./interfaces/cognitoEvent.js";

export const handler = async (event: CognitoEvent): Promise<CognitoEvent> => {
  console.log('Event:', JSON.stringify(event, null, 2));
try {

  if (event.triggerSource === 'CustomMessage_SignUp') {
    event.response.smsMessage = `Welcome to ${APP_NAME}! Your verification code is ${event.request.codeParameter}`;
    event.response.emailSubject = `Welcome to ${APP_NAME}!`;
    event.response.emailMessage = signUpEmail(event.request.codeParameter);
  } else if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.smsMessage = `Reset your ${APP_NAME} password using this code: ${event.request.codeParameter}`;
    event.response.emailSubject = `Reset Your ${APP_NAME} Password`;
    event.response.emailMessage = forgotPasswordEmail(event);
  } else if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
    const username = event.request.usernameParameter || '';
    event.response.smsMessage = `Your ${APP_NAME} account has been created. Temporary password: ${event.request.codeParameter}`;
    event.response.emailSubject = `Welcome to ${APP_NAME} - Your Account is Ready`;
    event.response.emailMessage = adminCreateUserEmail(event.request.codeParameter, username);
  } else {
    console.warn(`Unhandled trigger source: ${event.triggerSource}`);
    return event;
  }
} catch (error) {
    console.error('Error processing event:', error);
    console.log('Event:', JSON.stringify(event, null, 2));
}
  console.log('---------------output----------------');
  console.log('Event:', JSON.stringify(event, null, 2));
  return event;
};

