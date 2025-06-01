import { APP_NAME } from '../config.js';
import { signUpEmail } from '../emailTemplates.js';
import { CognitoEvent } from '../interfaces/cognitoEvent.js';
import { TriggerStrategy } from '../interfaces/triggerStrategy.js';

export class SignUpStrategy implements TriggerStrategy {
  async handle(event: CognitoEvent): Promise<CognitoEvent> {
    event.response.smsMessage = `Welcome to ${APP_NAME}! Your verification code is ${event.request.codeParameter}`;
    event.response.emailSubject = `Welcome to ${APP_NAME}!`;
    event.response.emailMessage = signUpEmail(event.request.codeParameter);
    return event;
  }
}
