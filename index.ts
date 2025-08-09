import * as Sentry from "@sentry/aws-serverless";

Sentry.init({
  dsn: "https://e5c2b4c7c153d689465a4406a5855b51@o4508237537869824.ingest.us.sentry.io/4509425005494272",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

import { CognitoEvent } from "./interfaces/cognitoEvent.js";
import { TriggerStrategy } from "./interfaces/triggerStrategy.js";
import { AdminCreateUserStrategy } from "./strategies/adminCreateUserStrategy.js";
import { ForgotPasswordStrategy } from "./strategies/forgotPasswordStrategy.js";
import { SignUpStrategy } from "./strategies/signUpStrategy.js";

// Strategy factory to get the appropriate handler for each trigger type
class TriggerStrategyFactory {
  private strategies: Map<string, TriggerStrategy>;

  constructor() {
    this.strategies = new Map<string, TriggerStrategy>();
    this.strategies.set("CustomMessage_SignUp", new SignUpStrategy());
    this.strategies.set(
      "CustomMessage_ForgotPassword",
      new ForgotPasswordStrategy(),
    );
    this.strategies.set(
      "CustomMessage_AdminCreateUser",
      new AdminCreateUserStrategy(),
    );
  }

  getStrategy(triggerSource: string): TriggerStrategy {
    const strategy = this.strategies.get(triggerSource);
    if (!strategy) {
      return this.getDefaultStrategy();
    }
    return strategy;
  }

  private getDefaultStrategy(): TriggerStrategy {
    return {
      handle: async (event: CognitoEvent): Promise<CognitoEvent> => {
        console.warn(`Unhandled trigger source: ${event.triggerSource}`);
        return event;
      },
    };
  }
}

export const handler = async (event: CognitoEvent): Promise<CognitoEvent> => {
  console.log("Event:", JSON.stringify(event, null, 2));

  try {
    const strategyFactory = new TriggerStrategyFactory();
    const strategy = strategyFactory.getStrategy(event.triggerSource);
    event = await strategy.handle(event);
  } catch (error) {
    console.error("Error processing event:", error);
    console.log("Event:", JSON.stringify(event, null, 2));
  }

  console.log("---------------output----------------");
  console.log("Event:", JSON.stringify(event, null, 2));
  return event;
};
