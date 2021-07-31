const QnA = require("../models/questionModel");
const User = require("../models/userModel");
const Likes = require("../models/likesModel");
const mongoose = require("mongoose");


module.exports = {
  createQuestion: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const { title, content, keywords } = req.body;

      const newQuestion = new QnA({
        title: title,
        content: content,
        keywords: keywords,
        creator: req.user,
      });

      await newQuestion.save();
      user.numberOfQuestions++;
      await user.save();

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

  getAllQuestionsFromUser: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const questions = await QnA.find({
        creator: mongoose.Types.ObjectId(req.user),
      });
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
      user.numberOfQuestions--;
      await user.save();

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

  likeQuestion: async (req, res) => {
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

      if (question.creator == req.user)
        return res.status(401).json({
          success: 0,
          message: "You can't like your own question!",
        });

      const userLikes = await Likes.findOne({ user: req.user });

      if (!userLikes) {
        const newUserLikes = new Likes({
          user: req.user,
          likes: [id],
        });

        await newUserLikes.save();
        question.likes++;
        await question.save();
        user.numberOfLikes++;
        await user.save();

        return res.status(200).json({
          success: 1,
          message: "Question Liked successfully",
        });
      }

      if (userLikes.likes.includes(id))
        return res.status(401).json({
          success: 0,
          message: "You have already liked this question.",
        });

      userLikes.likes.push(id);
      await userLikes.save();
      question.likes++;
      await question.save();
      user.numberOfLikes++;
      await user.save();

      res.status(200).json({
        success: 1,
        message: "Question Liked successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  unLikeQuestion: async (req, res) => {
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

      if (question.creator == req.user)
        return res.status(401).json({
          success: 0,
          message: "You can't un-like your own question!",
        });

      const userLikes = await Likes.findOne({ user: req.user });

      if (!userLikes || !userLikes.likes.includes(id))
        return res.status(401).json({
          success: 0,
          message: "You haven't liked this question.",
        });

      const index = userLikes.likes.indexOf(id);
      if (index > -1) userLikes.likes.splice(index, 1);
      await userLikes.save();
      question.likes--;
      await question.save();
      user.numberOfLikes--;
      await user.save();

      res.status(200).json({
        success: 1,
        message: "Question Un-Liked successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },
};
