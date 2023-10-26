let LOGFLARE_API_KEY = 'OX9_n1kPX8_p';
let LOGFLARE_SOURCE_ID = 'fd15aaf1-8dec-4c6a-bd44-56e57b0c93e2';
// let headersStr = '';

async function sendLogToLogflare(logData) {
    const url = new URL('https://api.logflare.app/logs');
    url.searchParams.append('source', LOGFLARE_SOURCE_ID);

    let init = {
      method: 'POST',
      headers: {
        'X-API-KEY': LOGFLARE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metadata: {'gateway': 'cloudflare', 'app': 'openai'},
        message: logData
      }),
    };
  
    await fetch(url, init);
};

export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      sendLogToLogflare('old: ' + url);
      url.host = "api.openai.com";
      sendLogToLogflare('new: ' + url);


      // openai is already set all CORS heasders 
      return fetch(url, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: 'follow'
      });
    }
}
