# Node Slack SDK

[![build-ci](https://github.com/slackapi/node-slack-sdk/actions/workflows/ci-build.yml/badge.svg)](https://github.com/slackapi/node-slack-sdk/actions/workflows/ci-build.yml)
<!-- TODO: npm versions with scoped packages: https://github.com/rvagg/nodei.co/issues/24 -->
___

## Getting Started

Visit the [documentation site](https://docs.slack.dev/tools/node-slack-sdk/) for all the lovely details.

_This SDK is a collection of single-purpose packages. The packages are aimed at making building Slack apps
easy, performant, secure, and scalable. They can help with just about anything in the Slack platform, from dropping
notifications in channels to fully interactive bots._

The Slack platform offers several APIs to build apps. Each Slack API delivers part of the capabilities from the
platform, so that you can pick just those that fit for your needs. This SDK offers a corresponding package for each of
Slack's APIs. They are small and powerful when used independently, and work seamlessly when used together, too.

**Just starting out?** The [Getting Started tutorial](https://docs.slack.dev/tools/node-slack-sdk/getting-started) will
walk you through building your first Slack app using Node.js.

| Slack API    | Use | NPM Package      |
|--------------|--------------|-------------------|
| Web API      | Send data to or query data from Slack using any of [over 270 methods](https://docs.slack.dev/reference/methods). | [`@slack/web-api`](https://docs.slack.dev/tools/node-slack-sdk/web-api) |
| OAuth        | Set up the authentication flow using V2 OAuth for Slack apps as well as V1 OAuth for classic Slack apps. | [`@slack/oauth`](https://docs.slack.dev/tools/node-slack-sdk/oauth) |
| Incoming Webhooks | Send notifications to a single channel which the user picks on installation. | [`@slack/webhook`](https://docs.slack.dev/tools/node-slack-sdk/webhook) |
| Socket Mode  | Listen for incoming messages and a limited set of events happening in Slack, using WebSocket. | [`@slack/socket-mode`](https://docs.slack.dev/tools/node-slack-sdk/socket-mode) |

**Not sure about which APIs are right for your app?** Read our [blog
post](https://medium.com/slack-developer-blog/getting-started-with-slacks-apis-f930c73fc889) that explains the options.
If you're still not sure, [reach out for help](#getting-help) and our community can guide you.

## Installation

Use your favorite package manager to install any of the packages and save to your `package.json`:

```shell
$ npm install @slack/web-api @slack/socket-mode

# Or, if you prefer yarn
$ yarn add @slack/web-api @slack/socket-mode
```

## Usage

The following examples summarize the most common ways to use this package. There's also a [Getting Started
tutorial](https://docs.slack.dev/tools/node-slack-sdk/getting-started) that's perfect for just starting out, and each
package's documentation, linked in the table above.

### Posting a message with Web API

Your app will interact with the Web API through the `WebClient` object, which is an export from `@slack/web-api`. You
typically instantiate a client with a token you received from Slack. The example below shows how to post a message into
a channel, DM, MPDM, or group. The `WebClient` object makes it simple to call any of the [**over 270 Web API
methods**](https://docs.slack.dev/reference/methods).

```javascript
import { WebClient } from '@slack/web-api';

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1232456';

(async () => {
  // See: https://docs.slack.dev/reference/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there' });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();
```

**Note**: To use the example above, the token is required to have either the `bot`, `chat:user:write`, or
`chat:bot:write` scopes.

**Tip**: Use the [Block Kit Builder](https://api.slack.com/tools/block-kit-builder) for a playground
where you can prototype your message's look and feel.

### Listening for an event with the Events API

Refer to [Bolt for JavaScript document pages](https://docs.slack.dev/tools/bolt-js/concepts/event-listening).

### Responding to interactive messages

Refer to [Bolt for JavaScript document pages](https://docs.slack.dev/tools/bolt-js/concepts/actions).

### Using Socket Mode

Refer to [the module document page](https://docs.slack.dev/tools/node-slack-sdk/socket-mode) and [Bolt for JavaScript document page](https://docs.slack.dev/bolt-js/concepts/socket-mode).

## Requirements

This package supports Node v20 and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature requests, bug reports and
    general discussion related to these packages. Try searching before you create a new issue.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`


## 🌐 Web Resources & Interactive Index
- [HUNTER UNDERWATER SPEARFISHING](https://studyquests.github.io/hunter-underwater-spearfishing.html)
- [TILES OF THE UNEXPECTED 2](https://iskillcrafts.pages.dev/tiles-of-the-unexpected-2.html)
- [SHANGHAI CHEF](https://quizverses.github.io/shanghai-chef.html)
- [VICE CITY DRIVER](https://studyquests.pages.dev/vice-city-driver.html)
- [NITRO SPEED CAR RACING](https://quizverses-9d2f2.web.app/nitro-speed-car-racing.html)
- [CATEGORY CONTROLLER59](https://quizverses-9d2f2.web.app/category-controller59.html)
- [TCG CARD CLICKER](https://themindzone.pages.dev/tcg-card-clicker.html)
- [TIE DYE EXPLOSION OF COLOR](https://quizverses.github.io/tie-dye-explosion-of-color.html)
- [TIMEWARRIORS](https://quizverses.github.io/timewarriors.html)
- [CARGO PATH PUZZLE](https://themindzone.pages.dev/cargo-path-puzzle.html)
- [SPACE SHIFT](https://learnquesters.pages.dev/space-shift.html)
- [INDEX14](https://quizverses-9d2f2.web.app/index14.html)
- [OPENGUESSR](https://learnquester.pages.dev/openguessr.html)
- [CATEGORY CARDS](https://quizverses-9d2f2.web.app/category-cards.html)
- [SUPER MX LAST SEASON](https://quizverses.github.io/super-mx-last-season.html)
- [HERO TOWER WARS MERGE PUZZLE](https://learnquesters.pages.dev/hero-tower-wars-merge-puzzle.html)
- [CATEGORY LOVE12](https://learnquesters.pages.dev/category-love12.html)
- [ARROW HIT](https://quizverses.github.io/arrow-hit.html)
- [CIRCUIT MASTER](https://themindzone.pages.dev/circuit-master.html)
- [MOTO TRAFFIC RIDER](https://quizverses.pages.dev/moto-traffic-rider.html)
- [SECRET GALAXY MATCH THREE](https://themindzone.pages.dev/secret-galaxy-match-three.html)
- [CATEGORY PARTY23](https://quizverses-9d2f2.web.app/category-party23.html)
- [OFFLINE FPS ROYALE](https://quizverses.github.io/offline-fps-royale.html)
- [DIAMOND SOLITAIRE MAHJONG](https://themindplay.pages.dev/diamond-solitaire-mahjong.html)
- [CATEGORY DRESS UP 2](https://quizverses-9d2f2.web.app/category-dress-up-2.html)
- [ITALIAN BRAINROT FIND THE STARS](https://themindzone.pages.dev/italian-brainrot-find-the-stars.html)
- [PURRFECT SCOOPS](https://iskillquest.pages.dev/purrfect-scoops.html)
- [MERGE TIKTOK GRAVITY KNIFE](https://learnquester.pages.dev/merge-tiktok-gravity-knife.html)
- [CATEGORY SIMULATION 3](https://learnquesters.pages.dev/category-simulation-3.html)
- [FRUIT MERGE JUICY DROP GAME](https://quizverses-9d2f2.web.app/fruit-merge-juicy-drop-game.html)
- [HYPER SURVIVE](https://quizverses.github.io/hyper-survive.html)
- [BLOONS SURVIVALIO](https://quizverses-9d2f2.web.app/bloons-survivalio.html)
- [CATEGORY SIMULATION](https://learnquesters.pages.dev/category-simulation.html)
- [CATEGORY 3D1 371](https://quizverses-9d2f2.web.app/category-3d1-371.html)
- [CATEGORY MAGIC46](https://quizverses.pages.dev/category-magic46.html)
- [CATEGORY FREE](https://quizverses-9d2f2.web.app/category-free.html)
- [PIXEL JOURNEY](https://quizverses-9d2f2.web.app/pixel-journey.html)
- [KOMPOTS KITCHEN](https://theskillquest.pages.dev/kompots-kitchen.html)
- [MOLANG MATCHN MUNCH](https://quizverses-9d2f2.web.app/molang-matchn-munch.html)
- [CATEGORY GOGUARDIAN](https://quizverses.pages.dev/category-goguardian.html)
- [WORM HUNT](https://learnquester.pages.dev/worm-hunt.html)
- [MERGE SMITH](https://learnquesters.pages.dev/merge-smith.html)
- [SQUIRREL WITH A GUN](https://studyquesthub.web.app/squirrel-with-a-gun.html)
- [CATEGORY PLATFORM260](https://learnquesters.pages.dev/category-platform260.html)
- [BRICK BREAKER](https://learnquester.pages.dev/brick-breaker.html)
- [SITEMAP](https://studyquesthub.web.app/sitemap.html)
- [SINGLE STROKE LINE DRAW](https://learnquesters.pages.dev/single-stroke-line-draw.html)
- [CATEGORY BATTLE ROYALE25](https://quizverses-9d2f2.web.app/category-battle-royale25.html)
- [ROYAL GARDEN MATCH](https://quizverses-9d2f2.web.app/royal-garden-match.html)
- [STRAWBERRY SHORTCAKE](https://iskillquest.pages.dev/strawberry-shortcake.html)
- [STEAM SORTER](https://studyquesthub.web.app/steam-sorter.html)
- [BUSY BEE HIVE](https://iskillquest.pages.dev/busy-bee-hive.html)
- [STACK N SORT](https://studyquests.github.io/stack-n-sort.html)
- [CHICKEN BLAST](https://studyquesthub.web.app/chicken-blast.html)
- [PRINCESSES AT HORROR SCHOOL](https://iskillquest.pages.dev/princesses-at-horror-school.html)
- [TIC TAC TOE MERGE](https://studyquesthub.web.app/tic-tac-toe-merge.html)
- [CONTACT](https://learnquesters.pages.dev/contact.html)
- [WITCH FAIRY BFF](https://theskillquest.pages.dev/witch-fairy-bff.html)
- [COLOR NONOGRAM PUZZLE 2](https://learnquester.pages.dev/color-nonogram-puzzle-2.html)
- [CATEGORY TOP DOWN251](https://iskillquest.pages.dev/category-top-down251.html)
- [CATEGORY THINKY](https://quizverses-9d2f2.web.app/category-thinky.html)
- [INDEX10](https://theskillquest.pages.dev/index10.html)
- [CATEGORY ADVENTURE 2](https://learnquesters.pages.dev/category-adventure-2.html)
- [TANK BATTLE WAR COMMANDER](https://learnquester.pages.dev/tank-battle-war-commander.html)
- [MERGE MASTER](https://studyquesthub.web.app/merge-master.html)
- [DUSTY MAZE HUNTER](https://studyquesthub.web.app/dusty-maze-hunter.html)
- [TOWER OF FALL](https://learnquester.pages.dev/tower-of-fall.html)
- [ANTISTRESS SIMULATOR OF SEQUINS DIY](https://studyquests.github.io/antistress-simulator-of-sequins-diy.html)
- [WORLD FLAGS TRIVIA](https://studyquesthub.web.app/world-flags-trivia.html)
- [FASHION MAKEOVER DASH](https://studyquesthub.web.app/fashion-makeover-dash.html)
- [MINITOSS](https://learnquesters.pages.dev/minitoss.html)
- [SIEGE BREAK](https://iskillquest.pages.dev/siege-break.html)
- [SPACE CRAFT SHIP WAR](https://learnquester.pages.dev/space-craft-ship-war.html)
- [TRICKY ARROW](https://learnquester.pages.dev/tricky-arrow.html)
- [BLOCK UP](https://themindzone.pages.dev/block-up.html)
- [100 DOORS PUZZLE BOX](https://learnquester.pages.dev/100-doors-puzzle-box.html)
- [EATING SIMULATOR](https://studyquesthub.web.app/eating-simulator.html)
- [POPCORN STACK](https://themindzone.pages.dev/popcorn-stack.html)
- [MERGE FRUIT](https://studyquesthub.web.app/merge-fruit.html)
- [ECO BLOCK PUZZLE](https://quizverses-9d2f2.web.app/eco-block-puzzle.html)
- [CATEGORY BATTLE524](https://quizverses-9d2f2.web.app/category-battle524.html)
- [MATCH ARENA](https://quizverses.pages.dev/match-arena.html)
- [CATEGORY BUBBLE SHOOTER27](https://studyquesthub.web.app/category-bubble-shooter27.html)
- [WOOD NUTS MASTER SCREW PUZZLE](https://learnquester.pages.dev/wood-nuts-master-screw-puzzle.html)
- [CATEGORY INCREMENTAL388](https://thelearnquesters.pages.dev/category-incremental388.html)
- [CATEGORY MANAGEMENT GAME](https://studyquesthub.web.app/category-management-game.html)
- [PRINCESS VALENTINES CRUSH](https://studyquesthub.web.app/princess-valentines-crush.html)
- [CATEGORY SOLITAIRE27](https://thelearnquesters.pages.dev/category-solitaire27.html)
- [WORDS WITH OWL](https://studyquests.github.io/words-with-owl.html)
- [INDEX21](https://quizverses-9d2f2.web.app/index21.html)
- [CATEGORY MMO24](https://thelearnquesters.pages.dev/category-mmo24.html)
- [TRALALA CONNECT](https://quizverses.github.io/tralala-connect.html)
- [SWORD AND JEWEL](https://thelearnquesters.pages.dev/sword-and-jewel.html)
- [SAFE MERGE](https://learnquester.pages.dev/safe-merge.html)
- [CATEGORY PARTY23](https://thelearnquesters.pages.dev/category-party23.html)
- [CATEGORY SPACE](https://quizverses-9d2f2.web.app/category-space.html)
- [DELICIOUS EMILYS NEW BEGINNING VALENTINES EDITION](https://quizverses.github.io/delicious-emilys-new-beginning-valentines-edition.html)
- [PLANET HOPPER](https://thelearnquesters.pages.dev/planet-hopper.html)
- [CATEGORY RUNNING107](https://quizverses-9d2f2.web.app/category-running107.html)
- [CATEGORY CASUAL 12](https://theskillquest.pages.dev/category-casual-12.html)
- [UNLOCK THE BOLTS](https://studyquesthub.web.app/unlock-the-bolts.html)
- [CATEGORY MAHJONG 2](https://learnquesters.pages.dev/category-mahjong-2.html)
- [TANK WARS IAW](https://theskillquest.pages.dev/tank-wars-iaw.html)
- [GUN RUSH](https://learnquester.pages.dev/gun-rush.html)
- [MERGE HERO SURVIVAL TOWER DEFENSE](https://studyquests.github.io/merge-hero-survival-tower-defense.html)
- [CYBERPUNK AGENT](https://iskillquest.pages.dev/cyberpunk-agent.html)
- [MEDIEVAL ESCAPE](https://quizverses-9d2f2.web.app/medieval-escape.html)
- [PICKLE BALL CLASH](https://learnquester.pages.dev/pickle-ball-clash.html)
- [CATEGORY CASUAL 9](https://studyquests.github.io/category-casual-9.html)
- [CATEGORY HERO72](https://quizverses.pages.dev/category-hero72.html)
- [CATEGORY MAHJONG](https://learnquesters.pages.dev/category-mahjong.html)
- [APOCALYPSE SHELTER](https://quizverses.pages.dev/apocalypse-shelter.html)
- [VALENTINES DAY COUPLE DATE](https://studyquesthub.web.app/valentines-day-couple-date.html)
- [TCG CARD CLICKER](https://quizverses.pages.dev/tcg-card-clicker.html)
- [DUNGEON MASTER CULT CRAFT](https://thelearnquesters.pages.dev/dungeon-master-cult-craft.html)
- [DRAW BRIDGE CHALLENGE](https://quizverses.pages.dev/draw-bridge-challenge.html)
- [MAGIC BUBBLES](https://studyquesthub.web.app/magic-bubbles.html)
- [PLANET EVOLUTION IDLE CLICKER](https://studyquests.github.io/planet-evolution-idle-clicker.html)
- [UNCLE HIT PUNCH THE DUMMY](https://iskillquest.pages.dev/uncle-hit-punch-the-dummy.html)
- [CATEGORY BATTLE](https://quizverses-9d2f2.web.app/category-battle.html)
- [CATEGORY PUZZLE 4](https://quizverses-9d2f2.web.app/category-puzzle-4.html)
- [BLOCKAPOLYPSE ZOMBIE SHOOTER](https://themindzone.pages.dev/blockapolypse-zombie-shooter.html)
- [NINJA DASH COZY TACTIC PUZZLE](https://quizverses.github.io/ninja-dash-cozy-tactic-puzzle.html)
- [CATEGORY CASUAL 3](https://quizverses.pages.dev/category-casual-3.html)
- [DRAW A PATH TO THE FINISH LINE](https://studyquesthub.web.app/draw-a-path-to-the-finish-line.html)
- [CATEGORY FASHION](https://theskillquest.pages.dev/category-fashion.html)
- [ANTS EMPIRE EVOLVE SIM](https://studyquests.github.io/ants-empire-evolve-sim.html)
- [PARKING FURY 3D NIGHT CITY](https://studyquesthub.web.app/parking-fury-3d-night-city.html)
- [TOWER DEFENSE](https://themindzone.pages.dev/tower-defense.html)
- [CLOAK MASTER SHOOTER RUN](https://quizverses-9d2f2.web.app/cloak-master-shooter-run.html)
