const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;


describe("Flair", () => {

  beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({
      force: true
    }).then((res) => {

      Topic.create({
          title: "Avatar",
          description: "Pandora is inhabited by the Na'vi."
        })
        .then((topic) => {
          this.topic = topic;
          Flair.create({
              name: "Jake Sully,",
              color: "Red",
              topicId: this.topic.id
            })
            .then((flair) => {
              this.flair = flair;
              done();
            });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });

  });

  describe("#create()", () => {

    it("should create a flair object with a name, color, and assigned topic", (done) => {
      Flair.create({
          name: "blue-skinned, sapient humanoids",
          color: "blue",
          topicId: this.topic.id
        })
        .then((flair) => {

          expect(flair.name).toBe("blue-skinned, sapient humanoids");
          expect(flair.color).toBe("blue");
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });

    });

    it("should not create a flair with missing name, color, or assigned topic", (done) => {

      Flair.create({
          name: "blue-skinned, sapient humanoids"
        })
        .then((flair) => {
          done();
        })
        .catch((err) => {

          expect(err.message).toContain("Flair.color cannot be null");
          expect(err.message).toContain("Flair.topicId cannot be null");
          done();
        })

    });

  });

  describe("#setTopic()", () => {

    it("should associate a topic and a flair together", (done) => {

      Topic.create({
          title: "The Na'vi live in harmony with nature and worship a mother goddess named Eywa",
          description: "Pandora is largely a jungle world ."
        })
        .then((newTopic) => {
          expect(this.flair.topicId).toBe(this.topic.id);
          this.flair.setTopic(newTopic)
            .then((flair) => {
              expect(flair.topicId).toBe(newTopic.id);
              done();

            });
        })
    });

  });

  describe("#getTopic()", () => {

    it("should return the associated topic", (done) => {

      this.flair.getTopic()
        .then((associatedTopic) => {
          expect(associatedTopic.title).toBe("Avatar");
          done();
        });

    });

  });

});