import { CognitoEvent } from "./cognitoEvent.js";

export interface TriggerStrategy {
  handle(event: CognitoEvent): Promise<CognitoEvent>;
}
