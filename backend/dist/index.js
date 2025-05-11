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
        msg: 'Hi!'
    });
});
app.get('/search', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const word = req.body.word;
        const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
        const response = yield ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: 'Explain how AI works in a few words',
        });
        res.status(200).json({
            data: response
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Something went wrong!'
        });
    }
}));
app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
