import { NextApiRequest, NextApiResponse } from 'next';

export default async function previewHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret } = req.query;

  try {
    if (
      typeof secret !== 'string' ||
      secret !== process.env.CONTENTFUL_PREVIEW_SECRET
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const route = '/';

    if (!route) {
      return res.status(400).json({ message: 'Bad request' });
    }

    res.setPreviewData({});

    res.redirect(route);
  } catch (error) {
    const responseMessage =
      error instanceof Error ? error.message : 'Something went wrong.';

    res.status(500).json({ message: responseMessage });
  }
}
