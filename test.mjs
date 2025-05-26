import { handler } from './index.mjs';

// Example Cognito event for signup
const event = {
    triggerSource: 'CustomMessage_SignUp',
    request: { codeParameter: '123456' },
    response: {}
};

handler(event)
    .then(result => {
        console.log('Lambda result:', JSON.stringify(result, null, 2));
    })
    .catch(err => {
        console.error('Error:', err);
    });

