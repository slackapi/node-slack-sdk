# slack.dev

This website is built using [Docusaurus](https://docusaurus.io/). 'Tis cool.

Each Bolt/SDK has its own Docusaurus website, with matching CSS and nav/footer. There is also be a Docusaurus website of just the homepage and community tools. 

```
docs/
├── content/ (the good stuff. md and mdx files supported)
│   ├── getting-started.md
│   ├── packages/ (written .md files)
│   │   └── oauth.md
│   └── reference/
│       └── logger/ (generated reference files)
├── static/
│   ├── css/
│   │   └── custom.css (the css for everything!)
│   └── img/ (the pictures for the site)
│       ├── rory.png 
│       └── oslo.svg 
├── src/
│   └── theme (only contains the 404 page)
├── docusaurus.config.js (main config file. also where to set navbar/footer)
├── sidebar.js (manually set where the content docs are in the sidebar.)
└── typedoc.json (typedoc parameters for generating reference from src)
```

A cheat-sheet:
* _I want to edit a doc._ `content/*/*.md`
* _I want to make the reference up-to-date_. It should be! But if it isn't, run the **Deploy to Github Pages** workflow.
* _I want to change the docs sidebar._ `sidebar.js`
* _I want to change the css._ Don't use this repo, use the home repo and the changes will propagate here.
* _I want to change anything else._ `docusaurus.config.js`

----

## Adding a doc

1. Make a markdown file. Add a `# Title` or use [front matter](https://docusaurus.io/docs/next/create-doc) with `title:`. 
2. Save it in `content/folder/title.md` or `content/title.md`, depending on if it's in a sidebar category. The nuance is just for internal organization. 
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
```

Edits to pages are reflected live — no restarting the server or reloading the page. (I'd say... 95% of the time, and 100% time if you're just editing a markdown file)

Remember — you're only viewing the Node Slack SDK docs right now.

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

## Generating reference docs

The reference docs are autogenerated using the [`docusaurus-plugin-typedoc`](https://typedoc-plugin-markdown.org/plugins/docusaurus) plugin. It "integrates TypeDoc into the Docusaurus lifecycle and generates static TypeDoc pages in Markdown."

In the `docusaurus.config.js` file, there's a plugin entry for each package you want to generate a reference for. On any `npm run` or `npm run build` command, it creates reference pages in the specified locations (`/docs/content/reference/{package-name}`). It also creates a custom sidebar nav for that reference, which is then loaded in `sidebars.js`. 

You can add additional generation parameters in `typedoc.json`. 

The reference docs are generated on every site build, pulling from this repo's files. The site is built automatically on every release via `docs-deploy.yml`. 

---

## Something's broken

Luke goofed. Open an issue please! `:bufo-appreciates-the-insight:`