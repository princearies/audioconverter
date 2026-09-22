/**
 * Cloudflare Worker - Online Audio Converter
 * 
 * This worker serves the static frontend and provides API endpoints.
 * Static files are served from ./dist via wrangler.toml [assets] config.
 * 
 * Deploy: npx wrangler deploy
 * Dev: npx wrangler dev
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // API Routes
    if (pathname.startsWith('/api/')) {
      return handleAPI(request, pathname, env);
    }

    // For all other routes, let the static assets handler take over
    // (configured via [assets] in wrangler.toml)
    return env.ASSETS.fetch(request);
  },
};

/**
 * Handle API requests
 */
async function handleAPI(request, pathname, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Health check
    if (pathname === '/api/health') {
      return Response.json({
        status: 'ok',
        service: 'online-audio-converter',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      }, { headers: corsHeaders });
    }

    // Supported formats info
    if (pathname === '/api/formats') {
      return Response.json({
        formats: [
          { id: 'mp3', label: 'MP3', mime: 'audio/mpeg', description: 'Most compatible format', lossy: true },
          { id: 'wav', label: 'WAV', mime: 'audio/wav', description: 'Lossless, uncompressed', lossy: false },
          { id: 'ogg', label: 'OGG', mime: 'audio/ogg', description: 'Open source format', lossy: true },
          { id: 'flac', label: 'FLAC', mime: 'audio/flac', description: 'Lossless compression', lossy: false },
          { id: 'm4a', label: 'M4A', mime: 'audio/mp4', description: 'Apple format', lossy: true },
          { id: 'aac', label: 'AAC', mime: 'audio/aac', description: 'Advanced Audio Coding', lossy: true },
        ],
        bitrates: [64, 96, 128, 192, 256, 320],
        sampleRates: [22050, 44100, 48000, 96000],
      }, { headers: corsHeaders });
    }

    // Conversion stats endpoint
    if (pathname === '/api/stats') {
      return Response.json({
        totalConversions: 0, // Would use KV in production
        supportedFormats: 6,
        maxFileSize: '100MB',
        processingLocation: 'client-side',
      }, { headers: corsHeaders });
    }

    // 404 for unknown API routes
    return Response.json({ error: 'Not found' }, { 
      status: 404, 
      headers: corsHeaders 
    });

  } catch (error) {
    return Response.json({ 
      error: 'Internal server error',
      message: error.message 
    }, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
}
