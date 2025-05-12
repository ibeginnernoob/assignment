import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/hello', (req, res, next) => {
    res.json({
        msg: 'Hi!',
    });
});

app.get('/search/:word', async (req, res, next) => {
    try {
        const word = req.params.word;
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `Please provide detailed information about the term "${word}" in the following JSON format:
              {
				"status": "200",
                "title": "The term",
                "phoneticTranscription": "The IPA pronunciation",
                "partOfSpeech": "The grammatical category",
				// don't require a definitons array. Just need definiton and description part of root JSON object 
                "definition": "Definition text",
				// single definition
				"description": "2-3 line Description text"
				// single description
                "synonyms": ["synonym1", "synonym2", "synonym3"]
				// can have more than 3 synonyms
              }
              
              Ensure the response is valid, parseable JSON. Include multiple definitions if applicable, each with its own examples.
			  
			  if the term is not a real world / Does not exist return a JSON object of the following  format -
			  {
				"status": "500"
			    "error": "Word does not exist"
			  }	 
			  `,
        });

        //@ts-ignore
        const textResponse = response.candidates[0].content.parts[0].text;
        const jsonMatch = textResponse!.match(/```json\n([\s\S]*?)\n```/);

        let parsedData: any = null;

        if (jsonMatch && jsonMatch[1]) {
            parsedData = JSON.parse(jsonMatch[1]);
        } else {
            throw new Error("Couldn't extract structured data from response");
        }

		if (parsedData.status == 500) {
			throw new Error('Term not found')
		}

        res.status(200).json({
			type: 'Data',
            searchData: parsedData,
        });
    } catch (e: any) {
        res.status(500).json({
			type: 'Error',
            msg: e.message			
        });
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
