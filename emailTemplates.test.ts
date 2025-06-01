import { describe, it, expect } from 'vitest';
import { signUpEmail, forgotPasswordEmail, adminCreateUserEmail } from './emailTemplates.js';
import { handler } from './index.js';
import { APP_NAME } from './config.js';
import { CognitoEvent } from "./interfaces/cognitoEvent.js";

// Email template tests

describe('Email Templates', () => {
  it('signUpEmail includes code, app name, and lang attribute', () => {
    const code = '123456';
    const html = signUpEmail(code);
    expect(html).toContain(code);
    expect(html).toContain(APP_NAME);
    expect(html).toContain('<html lang="en">');
  });

  it('forgotPasswordEmail includes code and app name', () => {
    const code = '654321';
    const cognitoEvent: CognitoEvent = {
        triggerSource: 'CustomMessage_ForgotPassword',
        request: { codeParameter: code },
        response: {}
    }
    const html = forgotPasswordEmail(cognitoEvent);
    expect(html).toContain(code);
    expect(html).toContain(APP_NAME);
  });

  it('adminCreateUserEmail includes code and app name', () => {
    const code = 'abcdef';
    const html = adminCreateUserEmail(code);
    expect(html).toContain(code);
    expect(html).toContain(APP_NAME);
  });
});

describe('Email Templates HTML', () => {
  it('signUpEmail HTML structure and content', () => {
    const code = 'abc123';
    const html = signUpEmail(code);

    // Expect
    expect(html).toMatchSnapshot();
  });

  it('forgotPasswordEmail HTML structure and content', () => {
    const code = 'reset321';
    const cognitoEvent: CognitoEvent = {
      triggerSource: 'CustomMessage_ForgotPassword',
      request: { codeParameter: code },
      response: {}
    }
    const html = forgotPasswordEmail(cognitoEvent);

    // Expect
    expect(html).toMatchSnapshot();
  });

  it('adminCreateUserEmail HTML structure and content', () => {
    const code = 'tempPass!';
    const html = adminCreateUserEmail(code);

    // Expect
    expect(html).toMatchSnapshot();
  });
});

// Handler tests

describe('Lambda Handler', () => {
  it('handles CustomMessage_SignUp', async () => {
    const event: CognitoEvent = {
      triggerSource: 'CustomMessage_SignUp',
      request: { codeParameter: '111111' },
      response: {}
    };
    const result = await handler(event);
    expect(result.response.emailMessage).toContain('111111');
    expect(result.response.emailSubject).toContain(APP_NAME);
  });

  it('handles CustomMessage_ForgotPassword', async () => {
    const event: CognitoEvent = {
      triggerSource: 'CustomMessage_ForgotPassword',
      request: { codeParameter: '222222' },
      response: {}
    };
    const result = await handler(event);
    expect(result.response.emailMessage).toContain('222222');
  });

  it('handles CustomMessage_AdminCreateUser', async () => {
    const event: CognitoEvent = {
      triggerSource: 'CustomMessage_AdminCreateUser',
      request: { codeParameter: '333333' },
      response: {}
    };
    const result = await handler(event);
    expect(result.response.emailMessage).toContain('333333');
  });
});
