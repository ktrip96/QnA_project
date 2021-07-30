const QnA = require("../models/questionModel");

module.exports = {
  getAllQuestions: async (req, res) => {
    try {
      const questions = await QnA.find();
      res.json({
        success: 1,
        data: questions.map((a) => {
          return {
            _id: a._id,
            title: a.title,
            keywords: a.keywords,
            content: a.content,
            creator: a.creator,
            date: a.date,
            likes: a.likes,
          };
        }),
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  createQuestion: async (req, res) => {
    try {
      const { title, content, keywords } = req.body;

      // access to user id that did the request, through req.user

      const newQuestion = new QnA({
        title: title,
        content: content,
        keywords: keywords,
        creator: req.user,
      });

      const savedQuestion = await newQuestion.save();

      res.json({
        success: 1,
        message: "Question Created",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },
};
