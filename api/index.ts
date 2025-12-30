// Vercel serverless function entry point
import { VercelRequest, VercelResponse } from '@vercel/node';

// Import the Express app
let app: any;

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (!app) {
    // Dynamically import the Express app
    const serverModule = await import('../server/src/index');
    app = serverModule.default;
  }
  
  return app(req, res);
};

export default handler;