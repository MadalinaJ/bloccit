const Topic = require("./models").Topic;
const Post = require("./models").Post;
const Flair = require("./models").Flair;
const Authorizer = require("../policies/topic");

module.exports = {

  getAllTopics(callback) {
    return Topic.findAll()
      .then((topics) => {
        callback(null, topics);
      })
      .catch((err) => {
        callback(err);
      })
  },

  getTopic(id, callback) {
    return Topic.findByPk(id, {
        include: [{
            model: Post,
            as: "posts"
          },
          {
            model: Flair,
            as: "flairs"
          }
        ]
      })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
  },

  addTopic(newTopic, callback) {
    return Topic.create({
        title: newTopic.title,
        description: newTopic.description
      })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
  },

  deleteTopic(req, callback) {
    return Topic.findByPk(req.params.id)
      .then((topic) => {
        const authorized = new Authorizer(req.user, topic).destroy();
        if (authorized) {
          topic.destroy()
            .then((res) => {
              callback(null, topic);
            });

        } else {
          req.flash("notice", "You are not authorized to do that.")
          callback(401);
        }
      })
      .catch((err) => {
        callback(err);
      });
  },

  updateTopic(req, updatedTopic, callback) {
    return Topic.findByPk(req.params.id)
      .then((topic) => {
        if (!topic) {
          return callback("Topic not found");
        }
        const authorized = new Authorizer(req.user, topic).update();
        if (authorized) {
          topic.update(updatedTopic, {
              fields: Object.keys(updatedTopic)
            })
            .then(() => {
              callback(null, topic);
            })
            .catch((err) => {
              callback(err);
            });
        } else {
          req.flash("notice", "You are not authorized to do that.");
          callback("Forbidden");
        }
      });
  }

}