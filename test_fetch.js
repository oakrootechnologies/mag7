const https = require('https');

function fetchUrl(url, depth = 0) {
  if (depth > 5) {
    console.log("Too many redirects");
    return;
  }
  console.log(`Fetching: ${url}`);
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  }, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Headers:', res.headers);

    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      fetchUrl(res.headers.location, depth + 1);
      return;
    }

    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('Body length:', data.length);
      console.log('Body preview:', data.substring(0, 2000));
    });
  }).on('error', (err) => {
    console.error('Error:', err);
  });
}

fetchUrl('https://share.google/8189NLgK2SIlgFj7y');
