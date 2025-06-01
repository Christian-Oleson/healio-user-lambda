export interface CognitoEvent {
  triggerSource: string;
  request: {
    codeParameter: string;
    linkParameter?: string;
    usernameParameter?: string;
    userAttributes?: {
      email: string;
      family_name?: string;
      given_name?: string | null;
      [key: string]: string | undefined | null;
    }
  };
  response: { [key: string]: any };
}
