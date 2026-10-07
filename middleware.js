import { next } from '@vercel/functions';

// This checks declared client identity; a client can spoof a browser User-Agent.
const automatedClient = /bot\b|crawler|spider|slurp|headlesschrome|phantomjs|selenium|playwright|puppeteer|httrack|wget|curl|python-requests|python-urllib|scrapy|aiohttp|httpx|go-http-client|libwww-perl|save[- ]?to[- ]?zip|chatgpt-user|claude-user|anthropic-ai|cohere-ai|google-extended|bytespider/i;

export const config = {
  matcher: ['/', '/index', '/index.html'],
};

export default function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  if (automatedClient.test(userAgent)) {
    return new Response('Acesso automatizado não autorizado.', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }
  return next();
}
