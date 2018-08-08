import { WebClient } from '../../../dist';

const web = new WebClient('TOKEN');

// calling a method with a callback function instead of returning a promise
web.chat.postMessage({ channel: 'CHANNEL', text: 'TEXT' }, (error, result) => {
  // TODO: type assertion checks (when the library supports this feature)
  if (error) {
    console.log(error.code);
  }

  console.log(result.ok);
});
