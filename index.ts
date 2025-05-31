import { APP_NAME } from './config.js';
import { signUpEmail, forgotPasswordEmail, adminCreateUserEmail, preSignUpEmail } from './emailTemplates.js';

export interface CognitoEvent {
  triggerSource: string;
  request: { 
    codeParameter: string;
    linkParameter?: string;
    usernameParameter?: string;
    userAttributes?: {
      email: string;
      family_name?: string;
      given_name?: string | null;
      [key: string]: string | undefined | null;
    }
  };
  response: { [key: string]: any };
}

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
    event.response.emailMessage = forgotPasswordEmail(event.request.codeParameter);
  } else if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
    const username = event.request.usernameParameter || '';
    const email = event.request.userAttributes?.email || '';

    event.response.smsMessage = `Your ${APP_NAME} account has been created. Temporary password: ${event.request.codeParameter}`;
    event.response.emailSubject = `Welcome to ${APP_NAME} - Your Account is Ready`;
    event.response.emailMessage = adminCreateUserEmail(event.request.codeParameter, username);
  } else if (event.triggerSource === 'PreSignUp_SignUp ERRORING') {
    const givenName = event.request.userAttributes?.given_name || 'User';
    event.response.smsMessage = `Welcome to ${APP_NAME}! Your verification code is ${event.request.codeParameter}`;
    event.response.emailSubject = `Verify your ${APP_NAME} account`;
    event.response.emailMessage = preSignUpEmail(givenName, event.request.codeParameter);
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

