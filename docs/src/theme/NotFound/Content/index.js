import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import React from 'react';
export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate id="theme.NotFound.title" description="The title of the 404 page">
              Oh no! There's nothing here.
            </Translate>
          </Heading>
          <p>
            <Translate id="theme.NotFound.p1s1" description="Opening sentence of the first paragraph of the 404 page">
              If we've led you astray,
            </Translate>
            <span> </span>
            <a href="https://github.com/slackapi/node-slack-sdk/issues/new?assignees=&labels=untriaged&projects=&template=document.md&title=%28Set+a+clear+title+describing+your+idea%29">
              <Translate id="theme.NotFound.p1s2" description="Second sentence of the first paragraph of the 404 page">
                please let us know
              </Translate>
            </a>
            <Translate id="theme.NotFound.p1s3" description="Closing sentence of the first paragraph of the 404 page">
              . We'll do our best to get things in order.
            </Translate>
          </p>
          <p>
            <Translate id="theme.NotFound.p2" description="The 2nd paragraph of the 404 page">
              For now, we suggest heading back to the beginning to get your bearings. May your next journey have clear
              skies to guide you true.
            </Translate>
          </p>
        </div>
      </div>
    </main>
  );
}
