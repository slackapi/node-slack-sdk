---
title: Changelog
permalink: /changelog
order: 10
---

{% for release in site.github.releases %}

<div>
<h2 class="flat_grey" id="{{ release.name | slugify }}">{{ release.name }}</h2>
<p>{{ release.published_at | date: "%b %-d, %Y" }}</p>

<div class="release_notes">
{{ release.body | markdownify }}
</div>

</div>

{% endfor %}

For previous releases, see [the legacy changelog](https://github.com/slackapi/node-slack-sdk/blob/1.x/CHANGELOG.md).

<p class="rss-subscribe">Subscribe <a href="https://github.com/slackapi/node-slack-sdk/releases.atom">via RSS</a></p>
