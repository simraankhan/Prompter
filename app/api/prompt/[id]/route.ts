import { conntectToDB } from "../../../../utils/database";
import { Prompt } from "../../../../models/prompt";

export const GET = async (req: any, { params }: any) => {
  try {
    await conntectToDB();
    const prompt = await Prompt.findById(params["id"]).populate("creator");
    if (!prompt) {
      return new Response("Record not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to get the prompt", { status: 500 });
  }
};

export const PUT = async (req: any, { params }: any) => {
  try {
    const { prompt, tag } = await req.json();

    await conntectToDB();

    const existingPrompt = await Prompt.findById(params["id"]).populate(
      "creator"
    );

    if (!existingPrompt) {
      return new Response("Record not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

export const DELETE = async (req: any, { params }: any) => {
  try {
    await conntectToDB();
    await Prompt.findByIdAndDelete(params["id"]);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
