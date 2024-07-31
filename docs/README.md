# slack.dev

This website is built using [Docusaurus](https://docusaurus.io/). 'Tis cool.

Each Bolt/SDK has its own Docusaurus website, with matching CSS and nav/footer. There is also be a Docusaurus website of just the homepage and community tools. 

```
docs/
├── content/ (the good stuff. md and mdx files supported)
│   ├── getting-started.md
│   └── packages
│       └── oauth.md
├── static/
│   ├── css/
│   │   └── custom.css (the css for everything!)
│   └── img/ (the pictures for the site)
│       ├── rory.png 
│       └── oslo.svg 
├── src/
│   └── theme (only contains the 404 page)
├── docusaurus.config.js (main config file. also where to set navbar/footer)
└── sidebar.js (manually set where the content docs are in the sidebar.)
```

A cheat-sheet:
* _I want to edit a doc._ `content/*/*.md`
* _I want to edit a Japanese doc._ `i18n/ja-jp/docusaurus-plugin-content-docs/current/*/*.md`
* _I want to change the docs sidebar._ `sidebar.js`
* _I want to change the css._ Don't use this repo, use the home repo and the changes will propagate here.
* _I want to change anything else._ `docusaurus.config.js`

----

## Adding a doc

1. Make a markdown file. Add a `# Title` or use [front matter](https://docusaurus.io/docs/next/create-doc) with `title:`. 
2. Save it in `content/folder/title.md` or `content/title.md`, depending on if it's in a sidebar category. The nuance is just for internal organization.
3. There needs to be 1:1 docs content for the sidebar. Copy the folder/file and put it in the Japanese docs: `i18n/ja/docusaurus-plugin-content-docs/current/*`. Just leave it in English if you don't speak Japanese. 
4. Add the doc's path to the sidebar within `docusaurus.config.js`. Where ever makes most sense for you.
5. Test the changes ↓

---

## Running locally

You'll want to be using at least Node 20. You can update Node however you want. `nvm` is one way. 

Install `nvm` if you don't have it:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Then grab the latest version of Node.

```
nvm install node
```


If you are running this project locally for the first time, you'll need to install the packages with the following command:

```
npm install
```

The following command starts a local development server and opens up a browser window. 

```
npm run start
open http://localhost:3000/bolt-python/getting-started # visit a page
```

Edits to pages are reflected live — no restarting the server or reloading the page. (I'd say... 95% of the time, and 100% time if you're just editing a markdown file)

Remember — you're only viewing the Bolt-JS docs right now.

#### Running locally in Japanese

For local runs, Docusaurus treats each language as a different instance of the website. You'll want to specify the language to run the japanese site locally:

```
npm run start -- --locale ja-jp
```

Don't worry - both languages will be built/served on deployment. 

---

## Deploying

The following command generates static content into the `build` directory. 

```
$ npm run build
```

Then you can test out with the following command: 

```
npm run serve
```

If it looks good, make a PR request!

### Deployment to GitHub pages

There is a GitHub action workflow set up in each repo. 

* On PR, it tests a site build.
* On Merge, it builds the site and deploys it. Site should update in a minute or two.

---

## Something's broken

Luke goofed. Open an issue please! `:bufo-appreciates-the-insight:`