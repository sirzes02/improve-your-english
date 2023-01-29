import translate from "@iamtraction/google-translate";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  original: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const jsonFormat = JSON.parse(req.body);
  const original = jsonFormat.original;

  const responseOriginal = await translate(original, { from: "es", to: "en" });

  res.status(200).json({ original: responseOriginal.text });
}
