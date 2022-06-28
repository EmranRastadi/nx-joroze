import { NextApiRequest, NextApiResponse } from 'next';

export default async function previewDisableHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.clearPreviewData();

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' });
  res.end();
}

export const config = {
  runtime: 'experimental-edge',
};
