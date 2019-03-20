const axios = require('axios');

// Create a Promise that resolves after a full turn of the event loop
// Used since Promise.resolve() will resolve too early
function resolveLater(value, ms = 0) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// A fake users model that resembles what you might have for a database-backed application
exports.users = {
  staticUser: {
    agreedToPolicy: false,
    setPolicyAgreementAndSave(isAgreed) {
      this.agreedToPolicy = isAgreed;
      return resolveLater(this);
    },
    kudosCount: 0,
    incrementKudosAndSave(reason) {
      this.kudosCount += 1;
      return resolveLater(this);
    }
  },
  findBySlackId() {
    return resolveLater(this.staticUser, 50);
  }
}

exports.neighborhoods = {
  apiUrl: 'https://data.sfgov.org/resource/6ia5-2f8k.json',
  fuzzyFind(text) {
    return axios({
      url: this.apiUrl,
      params: {
        '$query': `SELECT name WHERE lower(name) LIKE '%${text.toLowerCase()}%'`,
      },
    }).then(response => response.data);
  },
  find(name) {
    return axios({
      url: this.apiUrl,
      params: {
        'name': name,
      },
    })
    .then((response) => {
      const result = response.data[0];
      if (!result.link) {
        result.link = `http://www.google.com/search?q=${encodeURIComponent(result.name)}`;
      }
      return result;
    });
  }
}
