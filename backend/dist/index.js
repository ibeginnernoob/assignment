"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const genai_1 = require("@google/genai");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/hello', (req, res, next) => {
    res.json({
        msg: 'Hi!',
    });
});
app.get('/search/:word', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const word = req.params.word;
        const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
        const response = yield ai.models.generateContent({
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
        const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/);
        let parsedData = null;
        if (jsonMatch && jsonMatch[1]) {
            parsedData = JSON.parse(jsonMatch[1]);
        }
        else {
            throw new Error("Couldn't extract structured data from response");
        }
        if (parsedData.status == 500) {
            throw new Error('Term not found');
        }
        res.status(200).json({
            type: 'Data',
            searchData: parsedData,
        });
    }
    catch (e) {
        res.status(500).json({
            type: 'Error',
            msg: e.message
        });
    }
}));
app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
