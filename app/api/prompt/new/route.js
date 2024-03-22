import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
    const { prompt, tag, userId } = await req.json();

    try {
        await connectToDB();
        const newPrompt = await Prompt.create({
            creator: userId, tag, prompt
        });

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (e) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}