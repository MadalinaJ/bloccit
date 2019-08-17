const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;



describe("Topic", () => {
  beforeEach((done) => {
    this.topic;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "HR Giger",
        description: "known for his work on Alien (1979)"
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "Alien(1979)",
          body: "There is an explanation for all this. :D :D",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
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
    it("should create a topic object with a title and body", (done) => {
      Topic.create({
        title: "Dune(1984)",
        description: "The Spice must flow.",
        topicId: this.topic.id
      })
      .then((topic) => {
        expect(topic.title).toBe("Dune(1984)");
        expect(topic.description).toBe("The Spice must flow.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it("should not create a topic with missing title or description", (done) => {
        Topic.create({
          title: "Interstellar",
          topicId: this.topic.id
        })
        .then((topic) => {
            done();
        })
        .catch((err) => {
          expect(err.message).toContain("Topic.description cannot be null");
          done();
        })
      });
  });


  describe("#getPosts()", () => {
    it("should create a post object with a title, body, and assigned topic", (done) => {
      Post.create({
        title: "Inception",
        body: "If you're going to perform inception, you need imagination.",
        topicId: this.topic.id
      })
      .then((post) => {
        expect(post.title).toBe("Inception");
        expect(post.body).toBe("If you're going to perform inception, you need imagination.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it("should not create a post with missing title, body, or topicId", (done) => {
        Post.create({
          title: "SF"
        })
        .then((post) => {
            done();
        })
        .catch((err) => {
          expect(err.message).toContain("Post.body cannot be null");
          expect(err.message).toContain("Post.topicId cannot be null");
          done();
        })
      });
      it("should associate a topic and a post together, and return all associated posts", (done) => {
        Post.create({
          title: "Prometheus",
          body: "There is nothing in the desert and no man needs nothing.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.topic.getPosts()
          .then((posts) => {
            expect(posts[0].title).toBe(this.post.title);
            done();
          });
        })
      });
    });
  });