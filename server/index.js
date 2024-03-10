import { PdfReader } from "pdfreader";
import { config } from "dotenv";
import { writeFileSync } from "fs";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
config();

import express from "express";
const app = express();
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/test", (req, res) => {
  console.log(req.files.pdfFile);
  req.files.pdfFile
    .mv("handout.pdf")
    .then(() => {
      return getData()
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});
app.listen(5000, () => console.log("port 5000 open..."));
const genAI = new GoogleGenerativeAI(process.env.SECRET);

async function run(txt) {
  return new Promise(async (res, rej) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `From this information give me a quiz\n
    IMPORTANT REQUIREMENTS:
    \nCreate an answers array
    \nMake SURE that the correct answer is in the "answers" array
    \nformat your response as an array of object where an object has a question, correct answer and all the answers including wrong ones
    \ngive me 5 questions with corresponding answer
    \nThe answers should be short so its easy to remember
    \nRemove things that would make your response an invalid array
    \nFormat the array like this: 
    [
      {
        "question": "foo?", 
        "correctAnswer": "bar", 
        "answers": ["baz", "foobarbaz", "bazbarfoo", "bar"]
      }, 
      ...
    ]\n
    Here is the material\n ${txt}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res(text);
  });
}
function getParsedText() {
  return new Promise((res, rej) => {
    let txt = "";
    new PdfReader().parseFileItems("handout.pdf", (err, item) => {
      if (err) console.log(`Error: ${err}`);
      else if (!item) res(txt);
      else if (item.text) {
        for (let i = 0; i < item.text.length; i++) {
          txt += item.text[i];
          if (item.text[i] == ".") txt += "\n";
        }
      }
    });
  });
}
async function getData() {
  const txt = await getParsedText();
  const data = await run(txt);
  return new Promise((res, rej) => {
    const formatedData = data.replaceAll("```", "").replaceAll("json", "");
    console.log("done");
    writeFileSync("reviewer.json", formatedData);
    res(formatedData);
  });
}
