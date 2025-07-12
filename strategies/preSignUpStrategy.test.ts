import { describe, it, expect } from 'vitest';
import {PreSignUpStrategy} from "./preSignUpStrategy.js";
import {CognitoEvent} from "../interfaces/cognitoEvent.js";
import { APP_NAME } from '../config.js';

describe('PreSignUpStrategy', () => {
  const strategy = new PreSignUpStrategy();

  it('sets messages with given_name', async () => {
    const event: CognitoEvent = {
      triggerSource: 'PreSignUp_SignUp',
      request: {
        codeParameter: '123456',
        userAttributes: {
          email: 'test@example.com',
          given_name: 'Alice',
        },
      },
      response: {},
    };
    const result = await strategy.handle(event);
    expect(result.response.smsMessage).toContain(`Welcome to ${APP_NAME}`);
    expect(result.response.emailSubject).toContain(`Verify your ${APP_NAME}`);
    expect(result.response.emailMessage).toContain('Alice');
    expect(result.response.emailMessage).toContain('123456');
    expect(result.response.customMessage).toContain('Alice');
  });

  it('sets messages with default given_name', async () => {
    const event: CognitoEvent = {
      triggerSource: 'PreSignUp_SignUp',
      request: {
        codeParameter: '654321',
        userAttributes: {
          email: 'test2@example.com',
        },
      },
      response: {},
    };
    const result = await strategy.handle(event);
    expect(result.response.smsMessage).toContain(`Welcome to ${APP_NAME}`);
    expect(result.response.emailSubject).toContain(`Verify your ${APP_NAME}`);
    expect(result.response.emailMessage).toContain('User');
    expect(result.response.emailMessage).toContain('654321');
    expect(result.response.customMessage).toContain('User');
  });
});
