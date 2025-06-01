import { APP_NAME } from '../config.js';
import { adminCreateUserEmail } from '../emailTemplates.js';
import { CognitoEvent } from '../interfaces/cognitoEvent.js';
import { TriggerStrategy } from '../interfaces/triggerStrategy.js';

export class AdminCreateUserStrategy implements TriggerStrategy {
  async handle(event: CognitoEvent): Promise<CognitoEvent> {
    const username = event.request.usernameParameter || '';
    event.response.smsMessage = `Your ${APP_NAME} account has been created. Temporary password: ${event.request.codeParameter}`;
    event.response.emailSubject = `Welcome to ${APP_NAME} - Your Account is Ready`;
    event.response.emailMessage = adminCreateUserEmail(event.request.codeParameter, username);
    return event;
  }
}
