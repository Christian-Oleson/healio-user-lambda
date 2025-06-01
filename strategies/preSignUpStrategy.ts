import { APP_NAME } from '../config.js';
import { preSignUpEmail } from '../emailTemplates.js';
import { CognitoEvent } from '../interfaces/cognitoEvent.js';
import { TriggerStrategy } from '../interfaces/triggerStrategy.js';

export class PreSignUpStrategy implements TriggerStrategy {
  async handle(event: CognitoEvent): Promise<CognitoEvent> {
    const givenName = event.request.userAttributes?.given_name || 'User';

    // Add required SMS and email messages with code parameter
    event.response.smsMessage = `Welcome to ${APP_NAME}! Your verification code is found inside.`;
    event.response.emailSubject = `Verify your ${APP_NAME} account`;
    event.response.emailMessage = preSignUpEmail(givenName, event.request.codeParameter);

    // Keep the existing customMessage
    event.response.customMessage = preSignUpEmail(givenName);

    return event;
  }
}
