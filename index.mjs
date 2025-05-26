import { APP_NAME } from './config.mjs';
import { signUpEmail, forgotPasswordEmail, adminCreateUserEmail } from './emailTemplates.mjs';

export const handler = async (event) => {
    console.log('Event:', JSON.stringify(event, null, 2));

    if (event.triggerSource === 'CustomMessage_SignUp') {
        event.response.smsMessage = `Welcome to ${APP_NAME}! Your verification code is ${event.request.codeParameter}`;
        event.response.emailSubject = `Welcome to ${APP_NAME}!`;
        event.response.emailMessage = signUpEmail(event.request.codeParameter);
    } else if (event.triggerSource === 'CustomMessage_ForgotPassword') {
        event.response.smsMessage = `Reset your ${APP_NAME} password using this code: ${event.request.codeParameter}`;
        event.response.emailSubject = `Reset Your ${APP_NAME} Password`;
        event.response.emailMessage = forgotPasswordEmail(event.request.codeParameter);
    } else if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
        event.response.smsMessage = `Your ${APP_NAME} account has been created. Temporary password: ${event.request.codeParameter}`;
        event.response.emailSubject = `Your ${APP_NAME} Account Has Been Created`;
        event.response.emailMessage = adminCreateUserEmail(event.request.codeParameter);
    } else {
        console.warn(`Unhandled trigger source: ${event.triggerSource}`);
        event.response.smsMessage = `Your ${APP_NAME} account has been created. Temporary password: ${event.request.codeParameter}`;
        event.response.emailSubject = `Your ${APP_NAME} Account Has Been Created`;
        event.response.emailMessage = adminCreateUserEmail(event.request.codeParameter);
    }

    return event;
};

