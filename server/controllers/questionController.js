const QnA = require("../models/questionModel");

module.exports = {
  getAllQuestions: async (req, res) => {
    try {
      const questions = await QnA.find();
      res.status(200).json({
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

  getQuestionById: async (req, res) => {
    try {
      const id = req.params.id;
      const question = await QnA.findById(id);
      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Question id" });

      res.status(200).json({
        success: 1,
        data: {
          _id: question._id,
          title: question.title,
          keywords: question.keywords,
          content: question.content,
          creator: question.creator,
          date: question.date,
          likes: question.likes,
        },
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
