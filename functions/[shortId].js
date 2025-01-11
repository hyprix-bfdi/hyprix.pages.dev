export const onRequestGet = async ({ params, env }) => {
    const { shortId } = params;
  
    // Retrieve the long URL from KV Storage
    const longUrl = await env.URLS.get(shortId);
  
    if (longUrl) {
      return Response.redirect(longUrl, 301);
    } else {
      return new Response('Short URL not found.', { status: 404 });
    }
  };
  