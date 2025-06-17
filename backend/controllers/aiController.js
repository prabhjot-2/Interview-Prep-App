const {GoogleGenAI}=require("@google/genai");
const {conceptExplainPrompt, questionAnswerPrompt}=require("../utils/prompts");

const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

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
    
    }catch(error){
        res.status(500).json({message:"Failed to generate questions",error:error.message});
    }
};
// @desc generate explains a interview question
// @route POST /api/ai/generate-explanation
// access private

const generateConceptExplanation=async(req,res)=>{};

module.exports={generateConceptExplanation, generateInterviewQuestions};