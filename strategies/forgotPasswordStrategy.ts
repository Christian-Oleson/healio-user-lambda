import { APP_NAME } from '../config.js';
import { forgotPasswordEmail } from '../emailTemplates.js';
import { CognitoEvent } from '../interfaces/cognitoEvent.js';
import { TriggerStrategy } from '../interfaces/triggerStrategy.js';

export class ForgotPasswordStrategy implements TriggerStrategy {
  async handle(event: CognitoEvent): Promise<CognitoEvent> {
    event.response.smsMessage = `Reset your ${APP_NAME} password using this code: ${event.request.codeParameter}`;
    event.response.emailSubject = `Reset Your ${APP_NAME} Password`;
    event.response.emailMessage = forgotPasswordEmail(event);
    return event;
  }
}
