# healio-user-lambda

A TypeScript AWS Lambda function for handling AWS Cognito user events. This lambda processes different types of Cognito triggers and generates custom email and SMS messages for user authentication flows.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Testing](#testing)
- [Build & Deploy](#build--deploy)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Contributing](#contributing)

## Prerequisites

Before setting up this project, ensure you have the following installed:

- **Node.js**: Version 22.x or later
- **npm**: Comes with Node.js
- **Git**: For cloning the repository
- **AWS CLI**: For deployment (optional, handled by GitHub Actions)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Christian-Oleson/healio-user-lambda.git
   cd healio-user-lambda
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Project Structure

```
healio-user-lambda/
├── interfaces/           # TypeScript interfaces
│   ├── cognitoEvent.ts  # Cognito event type definitions
│   └── triggerStrategy.ts # Strategy interface
├── strategies/          # Event handling strategies
│   ├── adminCreateUserStrategy.ts
│   ├── forgotPasswordStrategy.ts
│   ├── preSignUpStrategy.ts
│   └── signUpStrategy.ts
├── __snapshots__/       # Test snapshots
├── scripts/             # Build and utility scripts
├── .github/workflows/   # GitHub Actions CI/CD
├── *.html              # Email templates
├── index.ts            # Main Lambda handler
├── config.ts           # Configuration settings
├── emailTemplates.ts   # Email template functions
├── test.ts             # Local testing script
└── package.json        # Project dependencies and scripts
```

## Local Development

### Running the Lambda Locally

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Run the test script:**
   ```bash
   npm start
   ```
   This will compile TypeScript and run the local test script with sample Cognito events.

3. **Run specific tests:**
   You can modify the `testToRun` variable in `test.ts` to test different trigger types:
   - `'signUp'` - CustomMessage_SignUp events
   - `'forgotPassword'` - CustomMessage_ForgotPassword events  
   - `'adminCreateUser'` - CustomMessage_AdminCreateUser events
   - `'preSignUp'` - PreSignUp_SignUp events

### Development Workflow

1. Make changes to TypeScript files
2. Run `npm run build` to compile
3. Run `npm start` to test locally
4. Run `npm test` to execute the test suite
5. Commit and push changes (GitHub Actions will handle deployment)

## Testing

### Run All Tests
```bash
npm test
```

This will run the Vitest test suite with coverage reporting.

### Test Types
- **Unit tests**: Located in `*.test.ts` files
- **Integration tests**: The `test.ts` file provides integration testing with sample events
- **Coverage**: Automatically generated with each test run

### Available Test Commands
- `npm test` - Run tests with coverage
- `npm run build` - Compile TypeScript
- `npm start` - Build and run local test script

## Build & Deploy

### Local Build
```bash
npm run build
```

### Automated Deployment

The project uses GitHub Actions for automated deployment:

1. **Triggers**: Pushes to `main` branch and pull requests
2. **Process**:
   - Install dependencies with `npm ci`
   - Build TypeScript with `npm run build`
   - Create deployment package with production dependencies
   - Create zip file: `Healiospace.UserLambda.zip`
   - Upload to AWS S3
   - Update Lambda function code

3. **Requirements for deployment**:
   - AWS credentials configured in GitHub Secrets
   - Access to the specified S3 bucket and Lambda function

### Manual Deployment
To build and deploy manually:

```bash
# Build the project
npm run build

# Create deployment structure
mkdir -p deployment
cp -r dist/* deployment/
cp package.json deployment/
cd deployment && npm install --omit=dev && cd ..

# Create deployment package
cd deployment && zip -r ../Healiospace.UserLambda.zip .

# Upload to AWS (requires AWS CLI configured)
aws s3 cp "./Healiospace.UserLambda.zip" "s3://your-bucket/lambda/"
aws lambda update-function-code --function-name "your-function-name" --s3-bucket "your-bucket" --s3-key "lambda/Healiospace.UserLambda.zip"
```

## Configuration

### Environment Variables
The lambda uses the following configuration:

- **Sentry DSN**: Configured in `index.ts` for error tracking
- **AWS Region**: `us-east-2` (configured in deployment workflow)

### AWS Resources
- **S3 Bucket**: `infrastack-hsapibucketb0ffce48-q7fxihjt4x6e`
- **Lambda Function**: `InfraStack-hsuserlambda7402A172-AQlkiNzXUDR2`
- **Region**: `us-east-2`

## Architecture

### Strategy Pattern
The lambda uses the Strategy pattern to handle different Cognito trigger types:

1. **TriggerStrategyFactory**: Routes events to appropriate strategies
2. **Strategy Classes**: Each handles a specific trigger type
3. **Event Processing**: Generates custom messages based on event type

### Supported Triggers
- `CustomMessage_SignUp`: Welcome messages for new user registration
- `CustomMessage_ForgotPassword`: Password reset messages  
- `CustomMessage_AdminCreateUser`: Admin-created user welcome messages
- `PreSignUp_SignUp`: Pre-signup processing (validation, auto-confirmation)

### Email Templates
- HTML templates with responsive design
- Branded with Healiospace styling
- Dynamic content based on user attributes and codes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Run the test suite: `npm test`
5. Build and test locally: `npm start`
6. Submit a pull request

### Code Style
- TypeScript with strict type checking
- ES modules (type: "module")
- Prettier for code formatting
- Husky for git hooks