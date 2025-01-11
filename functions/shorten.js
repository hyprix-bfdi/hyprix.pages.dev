export const onRequestPost = async ({ request, env }) => {
  try {
    const { longUrl } = await request.json();

    if (!longUrl || !isValidUrl(longUrl)) {
      return new Response('Invalid URL provided.', { status: 400 });
    }

    // Generate a short ID
    const shortId = generateShortId();

    // Save to KV Storage
    await env.URLS.put(shortId, longUrl);

    const shortenedUrl = `https://${request.headers.get('host')}/${shortId}`;
    return new Response(JSON.stringify({ shortenedUrl }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response('Internal Server Error', { status: 500 });
  }
};

// Helper: Generate a unique short ID
function generateShortId() {
  return Math.random().toString(36).substr(2, 6); // e.g., "abc123"
}

// Helper: Validate URL format
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
