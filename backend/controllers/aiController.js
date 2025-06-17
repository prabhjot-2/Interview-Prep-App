const {GoogleGenAI}=require("@google/genai");
const {conceptExplainPrompt, questionAnswerPrompt}=require("../utils/prompts");

const ai=new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// desc: generate interview question and answes using gemini
// route :  POST /api/ai/generate-questions
// access Private
const generateInterviewQuestions=async(req,res)=>{
    try{
        const{role,experience,topicsToFocus,numberOfQuestions}=req.body;

        if(!role || !experience|| !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message:"Missing required fields"});
        }
        const prompt=questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions);

        const response=await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            contents:prompt,
        })

        let rawText=response.text;
    // clean it : remove '''json and ''' free beginning and end
    const cleanedText=rawText.replace(/^```json\s*/, "")//remove starting '''json
                             .replace(/```$/, "") //emove ending ```
                             .trim();//remove extra spaces

    // now safe to parse
    const data=JSON.parse(cleanedText);

    res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:"Failed to generate questions",error:error.message});
    }
};
// @desc generate explains a interview question
// @route POST /api/ai/generate-explanation
// access private

const generateConceptExplanation=async(req,res)=>{
    try {
        const{question}=req.body;

        if(!question){
            return res.status(400).json({message:"missing required fields"});
        }

        const prompt=conceptExplainPrompt(question);

        const response=await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            contents:prompt,
        })

        let rawText=response.text;
        // clean it: remove ```json and ``` from beginning and ending
        const cleanedText=rawText.replace(/^```json\s*/,"")//remove starting ```json
                                  .replace(/```$/,"")//remove ending ```
                                  .trim(); //remove extra spaces
        
        // now safe to parse
        const data=JSON.parse(cleanedText);

        res.status(200).json(data);
    
    } catch (error) {
        res.status(500).json({message:"Failed to generate questions",error:error.message});
    }
};

module.exports={generateConceptExplanation, generateInterviewQuestions};