import dotenv from "dotenv";
dotenv.config();
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// const openai = new OpenAIApi(configuration);

export const summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const data = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Summarize this \n${text}` }],
      // prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].message) {
        return res.status(200).json(data.choices[0].message.content);
      }
    }
    console.log(data.choices[0].message.content);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
export const paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const data = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `write a detail paragraph about \n${text}` },
      ],
      // prompt: `write a detail paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].message) {
        return res.status(200).json(data.choices[0].message.content);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
export const chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${text}` }],
      prompt: `Answer question similar to how yoda from star war would.
      Me: 'what is your name?'
      yoda: 'yoda is my name'
      Me: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

//test api
export const getResponceController = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const data = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${text}` }],
      max_tokens: 300,
      temperature: 0.7,
    });
    if (data) {
      if (data?.choices[0].message) {
        return res.status(200).json(data.choices[0].message.content);
      }
    }
    console.log(data?.choices[0].message);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
// export const jsconverterController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       prompt: `/* convert these instruction into javascript code \n${text}`,
//       max_tokens: 400,
//       temperature: 0.25,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
export const jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const data = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `/* convert these instruction into javascript code \n${text}`,
        },
      ],
      // prompt: `/* convert these instruction into javascript code \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });
    if (data) {
      if (data.choices[0].message.content) {
        return res.status(200).json(data.choices[0].message.content);
      }
    }
    console.log(data?.choices[0].message.content);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

export const scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const data = await openai.images.generate({
      // model: "gpt-3.5-turbo",
      // messages: [
      //   { role: "user", content: `generate a scifi image of ${text}` },
      // ],
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
    console.log(data.data[0].url);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
