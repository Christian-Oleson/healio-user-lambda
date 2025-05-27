import { handler, CognitoEvent } from './index.js';

// Example Cognito event for signup
const event: CognitoEvent = {
    triggerSource: 'CustomMessage_SignUp',
    request: { codeParameter: '123456' },
    response: {}
};

handler(event)
    .then((result: any) => {
        console.log('Lambda result:', JSON.stringify(result, null, 2));
    })
    .catch((err: any) => {
        console.error('Error:', err);
    });
