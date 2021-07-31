const QnA = require("../models/questionModel");
const User = require("../models/userModel");

module.exports = {
  getAll: async (req, res) => {
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
            answers: a.answers,
          };
        }),
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  getQnAById: async (req, res) => {
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
          answers: question.answers,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  search: async (req, res) => {
    try {
      const term = req.params.term;
      // const questions = await QnA.find();
      const questions = await QnA.aggregate([
        { $match: { $text: { $search: term } } },
        { $project: { __v: 0 } },
      ]);
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
            answers: a.answers,
          };
        }),
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },
};
