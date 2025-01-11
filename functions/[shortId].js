export const onRequestGet = async ({ params, env }) => {
  try {
    const { shortId } = params;

    if (!shortId) {
      return new Response('Short ID is missing.', { status: 400 });
    }

    // Retrieve the long URL from KV Storage
    const longUrl = await env.URLS.get(shortId);

    if (longUrl) {
      return Response.redirect(longUrl, 301);
    } else {
      return new Response('Shortened URL not found.', { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return new Response('Internal Server Error', { status: 500 });
  }
};
