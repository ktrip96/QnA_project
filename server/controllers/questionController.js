const QnA = require("../models/questionModel");
const User = require("../models/userModel");
const Likes = require("../models/likesModel");

module.exports = {
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

      await newQuestion.save();

      res.status(200).json({
        success: 1,
        message: "Question Created",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

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

  deleteQuestionById: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const id = req.params.id;
      const question = await QnA.findById(id);

      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Question id" });

      if (question.creator != req.user)
        return res.status(401).json({
          success: 0,
          message: "You don't have the permissions to delete this question",
        });

      await QnA.findByIdAndDelete(id);

      res.status(200).json({
        success: 1,
        message: "Question deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  updateQuestionById: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const id = req.params.id;
      const question = await QnA.findById(id);

      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Question id" });

      if (question.creator != req.user)
        return res.status(401).json({
          success: 0,
          message: "You don't have the permissions to update this question",
        });

      let { title, keywords, content } = req.body;

      if (!title && !keywords && !content)
        return res.status(401).json({
          success: 0,
          message: "You need to specify at least one field",
        });

      if (!title) title = question.title;
      if (!keywords) keywords = question.keywords;
      if (!content) content = question.content;

      await QnA.findByIdAndUpdate(
        id,
        {
          title: title,
          keywords: keywords,
          content: content,
        },
        { useFindAndModify: false }
      );

      res.status(200).json({
        success: 1,
        message: "Question updated successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  getLikesById: async (req, res) => {
    try {
      const id = req.params.id;
      const question = await QnA.findById(id);
      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Question id" });

      res.status(200).json({
        success: 1,
        likes: question.likes,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },
};
