import { conntectToDB } from "../../../utils/database";
import { Prompt } from "../../../models/prompt";

const handler = async (req: any, res: any) => {
  try {
    await conntectToDB();
    const prompts = await Prompt.find().populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompts", { status: 500 });
  }
};

export { handler as GET };
