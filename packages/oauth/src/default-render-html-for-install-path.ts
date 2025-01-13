export default function defaultRenderHtmlForInstallPath(addToSlackUrl: string): string {
  return `<html>
<head>
<link rel="icon" href="data:,">
<style>
body {
  padding: 10px 15px;
  font-family: verdana;
  text-align: center;
}
</style>
</head>
<body>
<h2>Slack App Installation</h2>
<p><a href="${addToSlackUrl}"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a></p>
</body>
</html>`;
}
