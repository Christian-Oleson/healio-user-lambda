import { describe, it, expect } from 'vitest';
import { signUpEmail, forgotPasswordEmail, adminCreateUserEmail } from './emailTemplates.mjs';
import { handler } from './index.mjs';
import { APP_NAME } from './config.mjs';

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
    const html = forgotPasswordEmail(code);
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

// Handler tests

describe('Lambda Handler', () => {
  it('handles CustomMessage_SignUp', async () => {
    const event = {
      triggerSource: 'CustomMessage_SignUp',
      request: { codeParameter: '111111' },
      response: {}
    };
    const result = await handler(event);
    expect(result.response.emailMessage).toContain('111111');
    expect(result.response.emailSubject).toContain(APP_NAME);
  });

  it('handles CustomMessage_ForgotPassword', async () => {
    const event = {
      triggerSource: 'CustomMessage_ForgotPassword',
      request: { codeParameter: '222222' },
      response: {}
    };
    const result = await handler(event);
    expect(result.response.emailMessage).toContain('222222');
  });

  it('handles CustomMessage_AdminCreateUser', async () => {
    const event = {
      triggerSource: 'CustomMessage_AdminCreateUser',
      request: { codeParameter: '333333' },
      response: {}
    };
    const result = await handler(event);
    expect(result.response.emailMessage).toContain('333333');
  });
});

