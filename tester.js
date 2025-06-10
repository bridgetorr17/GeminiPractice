import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});
const trip = [ 'Valdosta', 'Blue Ridge Parkway', 'DC', 'Philly', 'Conneticut' ];
async function main(){
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Add one location somewhere along the route in this trip: ${trip}. Return the full trip, with the original plus the added location in the correct order.
        Include the reason why this would be a good addition in the 'reason' property. You should only include the reason for your addition, not the already exisiting locations.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: 'object',
                properties: {
                    tripStops: {
                        type: 'array',
                        items: { type: 'string'}
                    },
                    reason: {type: 'string'}
                },
                required: ['tripStops', 'reason']
            }
        }
    });
    console.log(response.text);
}

main();

