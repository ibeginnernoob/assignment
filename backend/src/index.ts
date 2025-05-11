import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/hello', (req, res, next) => {
	res.json({
		msg: 'Hi!'
	})
})

app.get('/search', async (req, res, next) => {
    try {
        // const word = req.body.word;

		const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: 'Explain how AI works in a few words',
        });

		res.status(200).json({
			data: response
		})
    } catch (e: any) {
        console.log(e);
		res.status(500).json({
			msg: 'Something went wrong!'
		})
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
