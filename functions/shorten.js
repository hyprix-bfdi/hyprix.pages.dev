export const onRequestPost = async ({ request, env }) => {
    const { longUrl } = await request.json();
  
    if (!longUrl) {
      return new Response('Missing "longUrl" in request body.', { status: 400 });
    }
  
    // Generate a unique short ID
    const shortId = crypto.randomUUID().slice(0, 6);
  
    // Store the mapping in KV Storage
    await env.URLS.put(shortId, longUrl);
  
    // Return the shortened URL
    const shortenedUrl = `https://${request.headers.get('host')}/${shortId}`;
    return new Response(JSON.stringify({ shortenedUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  