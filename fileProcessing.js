import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(){
    const pdfResp = await fetch('https://cdn.automationdirect.com/static/specs/ss2motors.pdf')
                          .then((response) => response.arrayBuffer())

    const contents = [
        {text: "Give me the important detail from this document. I want to use the motor for simulating rotation of a 10lb handpump 115,000 times."},
        {
            inlineData: {
                mimeType: 'application/pdf',
                data: Buffer.from(pdfResp).toString("base64")
            }
        }
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents
    });
    console.log(response.text);
}

main();