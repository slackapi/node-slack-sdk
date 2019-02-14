/**
 * Example for using an Incoming Webhook with custom agent
 */

const { IncomingWebhook } = require('../dist');

// Get a URL by creating an app at <https://api.slack.com/apps?new_app=1>, and configuring an Incoming Webhook
// It's always a good idea to keep sensitive data like the url outside your source code. Prefer environment variables.
const url = process.env.SLACK_WEBHOOK_URL || '';

if (!url) { console.log('You must specify a webhook url to use this example'); process.exitCode = 1; return; }

const proxyUrl = process.env.SLACK_PROXY_URL || '';
const proxyPort = process.env.SLACK_PROXY_PORT || '';
const proxyScheme = process.env.SLACK_PROXY_SCHEME || 'http';
const proxyEndpoint = `${proxyScheme}://${proxyUrl}:${proxyPort}`;

// Initialize a custom agent for an HTTP proxy
const tunnel = require('tunnel');
const tunnelAgent = tunnel.httpsOverHttp({
  proxy: {
    host: proxyUrl,
    port: proxyPort
  }
});

// Initialize the IncomingWebhook using the custom agent
const webhookTunnelAgent = new IncomingWebhook(url, { agent: tunnelAgent } );

// Send IncomingWebhook Message over tunnel
sendWebhookMessage(webhookTunnelAgent, 'Hello World, over tunnel agent!');

// Initialize a custom agent again, but this time using a different package
const HttpsProxyAgent = require('https-proxy-agent');
const httpsProxyAgent = new HttpsProxyAgent(proxyEndpoint);

// Initialize the IncomingWebhook using the new custom agent
const webhookHttpsProxyAgent = new IncomingWebhook(url, { agent: httpsProxyAgent });

// Send IncomingWebhook Message over Proxy Agent
sendWebhookMessage(webhookHttpsProxyAgent, 'Hello World, over https-proxy-agent!');

function sendWebhookMessage(webhookInstance, message) {
  webhookInstance.send({
    text: message
  }, (error, response) => {
    if (error) {
      return console.error(error);
    }
    console.log(response);
  });
}
