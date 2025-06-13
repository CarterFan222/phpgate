import Unblocker from 'unblocker';

const unblocker = Unblocker({
  // Allow CORS for your frontend domain, or use '*' for dev
  prependProxyUrl: false,
  // Optional - rewrite URLs etc can be customized here
});

export default function handler(req, res) {
  // Vercel does not support long-lived connections, so
  // limit large uploads or streaming.
  unblocker(req, res).catch((err) => {
    console.error('Proxy error:', err);
    if (!res.headersSent) {
      res.status(500).send('Proxy error');
    }
  });
}
