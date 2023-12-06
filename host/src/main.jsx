import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.jsx";

function dsnFromFeature({ getEvent }) {
  const event = getEvent();
  const feature = event?.tags?.feature;

  switch (feature) {
    case "products":
      return [
        {
          dsn: "https://08647f79b7cc02290f23f1fc906480d6@o4506314544644096.ingest.sentry.io/4506347469275136",
          release: "products@1.0.0",
        },
      ];
  }

  return [];
}

Sentry.init({
  dsn: "https://47590303850dd5e7c2b8832bce432bad@o4506314544644096.ingest.sentry.io/4506347195990016",
  transport: Sentry.makeMultiplexedTransport(
    Sentry.makeFetchTransport,
    dsnFromFeature
  ),
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost"],
    }),
  ],
  tracesSampleRate: 1.0, // Capture 100% of the transactions
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
