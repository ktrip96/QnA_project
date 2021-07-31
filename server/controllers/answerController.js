const QnA = require("../models/questionModel");
const User = require("../models/userModel");
const Likes = require("../models/likesModel");
const mongoose = require("mongoose");

module.exports = {
  createAnswer: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const { content } = req.body;
      if (!content)
        return res
          .status(401)
          .json({ success: 0, message: "Please provide content" });

      const id = req.params.id;
      const question = await QnA.findById(id);
      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Question id" });

      question.answers.push({
        creator: req.user,
        content: content,
      });
      await question.save();
      user.numberOfAnswers++;
      await user.save();

      res.status(200).json({
        success: 1,
        message: "Answer Created",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  getAnswersFromUser: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const answers = await QnA.aggregate([
        { $match: { "answers.creator": mongoose.Types.ObjectId(req.user) } },
        { $project: { _id: 0, answers: 1 } },
        { $unwind: "$answers" },
        {
          $project: {
            _id: "$answers._id",
            likes: "$answers.likes",
            creator: "$answers.creator",
            content: "$answers.content",
            date: "$answers.date",
          },
        },
      ]);

      res.status(200).json({
        success: 1,
        data: answers,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  getAnswerById: async (req, res) => {
    try {
      const id = req.params.id;
      const answer = await QnA.aggregate([
        { $match: { "answers._id": mongoose.Types.ObjectId(id) } },
        { $project: { _id: 0, answers: 1 } },
        { $unwind: "$answers" },
        {
          $project: {
            _id: "$answers._id",
            likes: "$answers.likes",
            creator: "$answers.creator",
            content: "$answers.content",
            date: "$answers.date",
          },
        },
      ]);

      if (answer.length != 1)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Answer id" });

      res.status(200).json({
        success: 1,
        data: {
          _id: answer[0]._id,
          content: answer[0].content,
          creator: answer[0].creator,
          date: answer[0].date,
          likes: answer[0].likes,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  deleteAnswerById: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const id = req.params.id;
      const question = await QnA.findOne({ "answers._id": id });

      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Answer id" });

      const index = question.answers.findIndex((e) => {
        if (e._id == id) {
          return true;
        }
      });

      if (question.answers[index].creator != req.user)
        return res.status(401).json({
          success: 0,
          message: "You don't have the permissions to delete this answer",
        });

      question.answers.splice(index, 1);
      await question.save();
      user.numberOfAnswers--;
      await user.save();

      res.status(200).json({
        success: 1,
        message: "Answer deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  updateAnswerById: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const id = req.params.id;
      const question = await QnA.findOne({ "answers._id": id });

      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Answer id" });

      const index = question.answers.findIndex((e) => {
        if (e._id == id) {
          return true;
        }
      });

      if (question.answers[index].creator != req.user)
        return res.status(401).json({
          success: 0,
          message: "You don't have the permissions to update this answer",
        });

      let { content } = req.body;

      if (!content)
        return res.status(401).json({
          success: 0,
          message: "You need to provide content",
        });

      question.answers[index].content = content;
      await question.save();

      res.status(200).json({
        success: 1,
        message: "Answer updated successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  getLikesById: async (req, res) => {
    try {
      const id = req.params.id;
      const question = await QnA.findOne({ "answers._id": id });

      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Answer id" });

      const index = question.answers.findIndex((e) => {
        if (e._id == id) {
          return true;
        }
      });

      res.status(200).json({
        success: 1,
        likes: question.answers[index].likes,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  likeAnswer: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const id = req.params.id;
      const question = await QnA.findOne({ "answers._id": id });

      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Answer id" });

      const index = question.answers.findIndex((e) => {
        if (e._id == id) {
          return true;
        }
      });

      if (question.answers[index].creator == req.user)
        return res.status(401).json({
          success: 0,
          message: "You can't like your own answer!",
        });

      const userLikes = await Likes.findOne({ user: req.user });

      if (!userLikes) {
        const newUserLikes = new Likes({
          user: req.user,
          likes: [id],
        });

        await newUserLikes.save();
        question.answers[index].likes++;
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
          message: "You have already liked this answer.",
        });

      userLikes.likes.push(id);
      await userLikes.save();
      question.answers[index].likes++;
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

  unLikeAnswer: async (req, res) => {
    try {
      const user = await User.findById(req.user);

      // if not return 401
      if (!user)
        return res.status(401).json({ success: 0, message: "Unknown user" });

      const id = req.params.id;
      const question = await QnA.findOne({ "answers._id": id });

      if (!question)
        return res
          .status(401)
          .json({ success: 0, message: "Unknown Answer id" });

      const index = question.answers.findIndex((e) => {
        if (e._id == id) {
          return true;
        }
      });

      if (question.answers[index].creator == req.user)
        return res.status(401).json({
          success: 0,
          message: "You can't un-like your own answer!",
        });

      const userLikes = await Likes.findOne({ user: req.user });

      if (!userLikes || !userLikes.likes.includes(id))
        return res.status(401).json({
          success: 0,
          message: "You haven't liked this question.",
        });

      const likeIndex = userLikes.likes.indexOf(id);
      if (likeIndex > -1) userLikes.likes.splice(index, 1);
      await userLikes.save();
      question.answers[index].likes--;
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
