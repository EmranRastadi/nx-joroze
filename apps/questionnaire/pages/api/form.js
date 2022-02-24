// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { FORM_SECTIONS } from "../../lib/constants";

export default function handler(req, res) {
  res.status(200).json(FORM_SECTIONS);
}
