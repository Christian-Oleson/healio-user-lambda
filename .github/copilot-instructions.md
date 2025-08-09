# Healio User Lambda

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the information here.**

Healio User Lambda is a TypeScript AWS Lambda function that handles AWS Cognito custom message triggers for user authentication events (signup, forgot password, admin create user). It generates customized HTML email templates and SMS messages using Sentry for error monitoring.

## Working Effectively

### Bootstrap and Setup

- Install dependencies: `npm install` -- takes ~30 seconds. NEVER CANCEL.
- Build TypeScript: `npm run build` -- takes ~2 seconds. Creates compiled JS files in `dist/` directory.

### Development Commands (NEVER CANCEL - Always wait for completion)

- `npm install` -- installs all dependencies (~30 seconds)
- `npm run build` -- compiles TypeScript to JavaScript (~2 seconds)
- `npm run test` -- runs Vitest tests with coverage (~2 seconds). NEVER CANCEL. Set timeout to 60+ seconds.
- `npm start` -- compiles and runs test scenarios (~2-3 seconds). NEVER CANCEL. Executes `tsc && node dist/test.js`

### Manual Testing and Validation

- ALWAYS run complete functional validation after making changes using: `npm start`
- Test individual Lambda handlers by running: `node -e "const { handler } = require('./dist/index.js'); handler(testEvent).then(console.log);"`
- CRITICAL: Test all three trigger types: `CustomMessage_SignUp`, `CustomMessage_ForgotPassword`, `CustomMessage_AdminCreateUser`

## Validation Scenarios

### End-to-End Testing Requirements

ALWAYS test complete user scenarios after making changes:

1. **SignUp Flow**: Test CustomMessage_SignUp with codeParameter and userAttributes
2. **Forgot Password Flow**: Test CustomMessage_ForgotPassword with codeParameter
3. **Admin Create User Flow**: Test CustomMessage_AdminCreateUser with codeParameter
4. **Verify Email Templates**: Ensure HTML email contains verification code and proper styling
5. **Verify SMS Messages**: Ensure SMS messages contain verification codes

### Manual Validation Script

Always run this validation after changes:

```bash
npm run build && node -e "
const { handler } = require('./dist/index.js');
const testEvent = {
  triggerSource: 'CustomMessage_SignUp',
  request: { codeParameter: '123456', userAttributes: { email: 'test@example.com' } },
  response: {}
};
handler(testEvent).then(result => {
  console.log('✅ Validation successful:', result.response.emailSubject);
}).catch(err => console.log('❌ Validation failed:', err.message));"
```

## Code Quality and CI

### Formatting (CRITICAL - Required for CI)

- Run `npx prettier --write . --ignore-path .gitignore --ignore-unknown` to format code before committing
- NOTE: AdminCreateUser.html has known HTML syntax issue that cannot be auto-fixed by Prettier
- CI will fail without proper formatting

### Testing Requirements

- All tests must pass: `npm run test`
- Coverage report generated in `coverage/` directory
- 11 tests total across email templates and Lambda handlers
- Test files: `emailTemplates.test.ts` and `strategies/preSignUpStrategy.test.ts`

## Project Structure

### Key Files and Directories

```
├── index.ts                    # Main Lambda handler with strategy pattern
├── config.ts                   # App configuration (APP_NAME)
├── emailTemplates.ts          # HTML email template functions
├── test.ts                    # Manual test scenarios runner
├── interfaces/
│   ├── cognitoEvent.ts        # TypeScript interfaces for Cognito events
│   └── triggerStrategy.ts     # Strategy interface definition
├── strategies/                # Handler strategies for each trigger type
│   ├── signUpStrategy.ts      # CustomMessage_SignUp handler
│   ├── forgotPasswordStrategy.ts  # CustomMessage_ForgotPassword handler
│   ├── adminCreateUserStrategy.ts # CustomMessage_AdminCreateUser handler
│   └── preSignUpStrategy.ts   # PreSignUp_SignUp handler
├── *.html                     # Static HTML email templates
└── scripts/
    └── check-commit-msg.js    # Husky commit message checker
```

### Build Output

- Compiled JavaScript files in `dist/` directory
- Coverage reports in `coverage/` directory
- Both directories are gitignored

## Common Development Tasks

### Making Code Changes

1. Make your changes to TypeScript files
2. Build: `npm run build`
3. Test: `npm run test`
4. Manual validation: `npm start`
5. Format code: `npx prettier --write . --ignore-path .gitignore --ignore-unknown`
6. Commit changes (Husky will add "HS User Lambda" prefix)

### Adding New Trigger Types

1. Create new strategy in `strategies/` directory implementing `TriggerStrategy`
2. Add strategy to factory in `index.ts`
3. Create email template function in `emailTemplates.ts`
4. Add tests in appropriate test files
5. Update test scenarios in `test.ts`

### Email Template Development

- All email templates use consistent CSS styling defined in `emailTemplates.ts`
- Templates include verification codes, proper branding, and responsive design
- Test templates by running scenarios and checking generated HTML

## Deployment and CI/CD

### GitHub Actions Workflow

- Triggers on push to main and PR events
- Installs Node.js 22.x
- Runs `npm ci` for clean install
- Builds with `npm run build`
- Creates deployment structure and installs production dependencies
- Zips Lambda for deployment
- Uploads to AWS S3 and updates Lambda function

### AWS Configuration

- Function name: `InfraStack-hsuserlambda7402A172-AQlkiNzXUDR2`
- S3 bucket: `infrastack-hsapibucketb0ffce48-q7fxihjt4x6e`
- Region: us-east-2

## Troubleshooting

### Common Issues

- **Prettier errors**: AdminCreateUser.html has known HTML syntax issue - this is expected
- **Build failures**: Always run `npm run build` after TypeScript changes
- **Test failures**: Check that all email templates contain required elements (codes, subjects, etc.)
- **Import errors**: Use `.js` extensions in TypeScript imports for ES modules

### Debug Tips

- Check `dist/` directory after build to verify compilation
- Use `npm start` to see full event processing logs
- Coverage reports show exactly which lines are tested
- All console.log output shows event processing in detail

## Performance Notes

- npm install: ~30 seconds (normal for 238 packages)
- Build time: ~2 seconds (very fast TypeScript compilation)
- Test execution: ~2 seconds with coverage
- Manual test runner: ~2-3 seconds for all scenarios

NEVER CANCEL any of these operations - they complete quickly and reliably.
