// filepath: c:\Projects\healio-user-lambda\test.ts
import { handler } from './index.js';
import CognitoEvent from "./interfaces/cognitoEvent.js";

// Define different test events
const testEvents = {
  // Example Cognito event for signup
  signUp: {
    triggerSource: 'CustomMessage_SignUp',
    request: {
      codeParameter: '123456',
      userAttributes: {
        email: 'test@example.com',
        given_name: 'Test',
        family_name: 'User'
      }
    },
    response: {}
  },

  // Example Cognito event for forgot password
  forgotPassword: {
    triggerSource: 'CustomMessage_ForgotPassword',
    request: {
      codeParameter: '654321',
      userAttributes: {
        email: 'test@example.com'
      }
    },
    response: {}
  },

  // Example Cognito event for admin create user
  adminCreateUser: {
    triggerSource: 'CustomMessage_AdminCreateUser',
    request: {
      codeParameter: '789012',
      usernameParameter: 'newuser',
      userAttributes: {
        email: 'newuser@example.com',
        given_name: 'New',
        family_name: 'User'
      }
    },
    response: {}
  },

  // PreSignUp example from the provided JSON
  preSignUp: {
    version: "1",
    region: "us-east-2",
    userPoolId: "us-east-2_ELujVJ6Rc",
    userName: "e13b75e0-0061-709b-32b9-de7b9c17fa51",
    callerContext: {
      awsSdkVersion: "aws-sdk-js-3.817.0",
      clientId: "4lnvv61cqqbdg89k60hh1imrn8"
    },
    triggerSource: "PreSignUp_SignUp",
    request: {
      userAttributes: {
        birthdate: "1992-04-14",
        phone_number: "+7205300012",
        "custom:practice_name": "DosApes#info@dosapes.com",
        given_name: "Info",
        "custom:role": "practiceAdmin",
        family_name: "Email",
        email: "info@dosapes.com"
      },
      validationData: null,
      codeParameter: '123456' // Adding this as it might be required by some code paths
    },
    response: {
      autoConfirmUser: false,
      autoVerifyEmail: false,
      autoVerifyPhone: false
    }
  }
};

// Run all tests
console.log('Running all tests...');

// Process each test event one after another using async/await
async function runAllTests() {
  for (const [testName, testEvent] of Object.entries(testEvents)) {
    console.log(`---------- Running test: ${testName} ----------`);
    createNewLin();
    try {
      const result = await handler(testEvent as CognitoEvent);
      console.log('Result:', JSON.stringify(result, null, 2));
      createNewLin();
    } catch (err) {
      console.error(`Error in test ${testName}:`, err);
      createNewLin();
    }
  }
}

runAllTests().catch(err => {
  console.error('Unexpected error running tests:', err);
});

// Choose which test to run
const testToRun = 'preSignUp'; // Change this to run different tests: 'signUp', 'forgotPassword', 'adminCreateUser', or 'preSignUp'

// Run the selected test
console.log(`Running test: ${testToRun}`);
handler(testEvents[testToRun] as CognitoEvent)
    .then((result: any) => {
      console.log('Lambda result:', JSON.stringify(result, null, 2));
    })
    .catch((err: any) => {
      console.error('Error:', err);
    });

function createNewLin() {
  console.log("\r\n");
}