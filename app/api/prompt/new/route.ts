import { NextApiRequest, NextApiResponse } from "next";
import { conntectToDB } from "../../../../utils/database";
import { Prompt } from "../../../../models/prompt";

type ResponseType = {
  message: string;
};

const handler = async (req: any, res: any) => {
  try {
    const { prompt, tag, userId } = await req.json();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create the prompt", { status: 500 });
  }
};

export { handler as POST };
