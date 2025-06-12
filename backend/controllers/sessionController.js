const Session=require("../models/Session");
const Question=require("../models/Question");

// @desc create a new session and l;inked questions
// @route POST /api/sessions/create
// @access PRIVATE
exports.createSession=async(req,res)=>{
    try{
        const {role,experience,topicsToFocus, description , questions}=req.body;
        const userId=req.user._id// assuming u have middleware to setting req.user

        const session =await Session.create({
            user:userId,
            role,
            experience,
            topicsToFocus,
            description,
        });
        const questionDocs=await Promise.all(
            questions.map(async(q)=>{
                const question=await Question.create({
                    session:session._id,
                    question:q.question,
                    answer:q.answer,
                })
                return question._id;
            })
        )
        session.questions=questionDocs;
        await session.save();
        res.status(201).json({success:true,session})
    }catch(error){
        res.status(500).json({success:false,message:"SERVER Error"});
    }
}

// get all sessions for the logged-in user
// @route GET/api/sessions/my-sessions
// @access PRIVATE

exports.getMySessions=async(req,res)=>{
    try{
        const sessions=await Session.find({user:req.user.id}).sort({createdAt:-1}).populate("questions");
        res.status(200).json(sessions)
    }catch(error){
        res.status(500).json({success:false,message:"SERVER Error"});
    }
};

// / @desc get a session id with populated questions
// @route POST /api/sessions/:id
// @access PRIVATE
exports.getSessionById=async(req,res)=>{
    try{
        const session=await Session.findById(req.params.id).populate({
            path:"questions",
            options:{sort:{isPinned:-1,createdAt:1}},
        }).exec();

        if(!session){
            return res.status(404).json({success:false,message:"Session not found"})
        }

        res.status(200).json({success:true,session});
    }catch(error){
        res.status(500).json({success:false,message:"SERVER Error"});
    }
};

// / @desc delete a sessions and its questions
// @route delete /api/sessions/:id
// @access PRIVATE

exports.deleteSession=async(req,res)=>{
    try{
        const session=await Session.findById(req.params.id);

        if(!session){
            return res.status(404).json({message:"Session not found"});
        }
        // check if the logged-in user owns this session;
        if(session.user.toString()!==req.user.id){
            return res.status(401).json({message:"not aurhorized to delete this session"});
        }
        // first , delte all questions linked to this sessions
        await Question.deleteMany({session:session._id});
        // then delete the session
        await session.deleteOne();

        res.status(200).json({message:"Session deleted Successfuly"})
    }catch(error){
        res.status(500).json({success:false,message:"SERVER Error"});
    }
};

