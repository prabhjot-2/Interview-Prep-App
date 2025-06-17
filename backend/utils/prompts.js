const questionAnswerPrompt=(role,exxperience,topicsToFocus,numberOfQuestions)=>(`
    You are an Ai trained to generate technical interview questions and answers.

    Task:
    -Role:${role}
    -Candidate Experience:${experience} years
    -Focus Topics:${topicsToFocus}
    -Write ${numberOfQuestions} interview questions
    -For each question, generate a detailed but beginner-friendly answer.
    -If the answer needs the coding example add a samll code block inside.
    -keep formatting very clean
    -return a pure JSON array list
    [
        {
            "question":"Question here?",
            "answer":"Answer here"
        },
        ...
    ]
        Important: DO NOT add any extra text. Only return valid JSON.
    `)

    const conceptExplainPrompt=(question)=>(`
    You are an Ai trained to generate explanations for a given interview questions.

    Task:
    -Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    -Questions:${question}
    -After the explanation provuide a short and clear title that summarizes the concept for the article or page header
    -If the explanation includes the coding example provide a samll code block inside.
    -keep formatting very clean
    -Return the result as a valid JSON object in the following format
    [
        {
            "title":"Short title here?",
            "explanation":"Explanation here"
        },
        ...
    ]
        Important: DO NOT add any extra text. Only return valid JSON.        
`)

module.exports={questionAnswerPrompt, conceptExplainPrompt}