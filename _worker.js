export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    console.log(url);
    url.host = "api.openai.com";
    console.log(url);
    // openai is already set all CORS heasders 
    return fetch(url, {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: 'follow'
    });
  }
}
