import { IncomingMessage, ServerResponse } from 'http';
import { CodedError, ErrorCode } from './errors';
import { InstallURLOptions } from './install-url-options';
import { Installation, OrgInstallation } from './installation';

export interface CallbackOptions {
  // success is given control after handleCallback() has stored the
  // installation. when provided, this function must complete the
  // callbackRes.
  success?: (
    installation: Installation | OrgInstallation,
    options: InstallURLOptions,
    callbackReq: IncomingMessage,
    callbackRes: ServerResponse,
  ) => void;

  // failure is given control when handleCallback() fails at any point.
  // when provided, this function must complete the callbackRes.
  // default:
  // serve a generic "Error" web page (show detailed cause in development)
  failure?: (
    error: CodedError,
    options: InstallURLOptions,
    callbackReq: IncomingMessage,
    callbackRes: ServerResponse,
  ) => void;
}

// Default function to call when OAuth flow is successful
export function defaultCallbackSuccess(
  installation: Installation,
  _options: InstallURLOptions | undefined,
  _req: IncomingMessage,
  res: ServerResponse,
): void {
  let redirectUrl: string;

  if (isNotOrgInstall(installation) && installation.appId !== undefined) {
    // redirect back to Slack native app
    // Changes to the workspace app was installed to, to the app home
    redirectUrl = `slack://app?team=${installation.team.id}&id=${installation.appId}`;
  } else if (isOrgInstall(installation)) {
    // redirect to Slack app management dashboard
    redirectUrl = `${installation.enterpriseUrl}manage/organization/apps/profile/${installation.appId}/workspaces/add`;
  } else {
    // redirect back to Slack native app
    // does not change the workspace the slack client was last in
    redirectUrl = 'slack://open';
  }
  let browserUrl = redirectUrl;
  if (isNotOrgInstall(installation)) {
    browserUrl = `https://app.slack.com/client/${installation.team.id}`;
  }
  const htmlResponse = `<html>
  <head>
  <meta http-equiv="refresh" content="0; URL=${redirectUrl}">
  <style>
  body {
    padding: 10px 15px;
    font-family: verdana;
    text-align: center;
  }
  </style>
  </head>
  <body>
  <h2>Thank you!</h2>
  <p>Redirecting to the Slack App... click <a href="${redirectUrl}">here</a>. If you use the browser version of Slack, click <a href="${browserUrl}" target="_blank">this link</a> instead.</p>
  </body>
  </html>`;
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(htmlResponse);
}

// Default function to call when OAuth flow is unsuccessful
export function defaultCallbackFailure(
  error: CodedError,
  _options: InstallURLOptions,
  _req: IncomingMessage,
  res: ServerResponse,
): void {
  let httpStatus: number;
  switch (error.code) {
    case ErrorCode.MissingStateError:
    case ErrorCode.InvalidStateError:
    case ErrorCode.MissingCodeError:
      httpStatus = 400;
      break;
    default:
      httpStatus = 500;
  }
  res.writeHead(httpStatus, { 'Content-Type': 'text/html; charset=utf-8' });
  const html = `<html>
  <head>
  <style>
  body {
    padding: 10px 15px;
    font-family: verdana;
    text-align: center;
  }
  </style>
  </head>
  <body>
  <h2>Oops, Something Went Wrong!</h2>
  <p>Please try again or contact the app owner (reason: ${error.code})</p>
  </body>
  </html>`;
  res.end(html);
}

// ------------------------------------------
// Internals
// ------------------------------------------

// Type guard to narrow Installation type to OrgInstallation
function isOrgInstall(installation: Installation): installation is OrgInstallation {
  return installation.isEnterpriseInstall || false;
}

function isNotOrgInstall(installation: Installation): installation is Installation<'v1' | 'v2', false> {
  return !(isOrgInstall(installation));
}
