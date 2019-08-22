const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;


describe("Topic", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {

// #2
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user

// #3
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",

// #4
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {

// #5
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        })
      })
    });
  });


  describe("#create()", () => {
    it("should create a topic object with a title and body", (done) => {
      Topic.create({
        title: "Dune(1984)",
        description: "The Spice must flow.",
         topicId: this.topic.id
        //topicId: this.topic.id
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
   
    // it("should not create a topic with missing title or description", (done) => {
    //     Topic.create({
    //       title: "Interstellar",
    //       topicId: this.topic.id
    //     })
    //     .then((topic) => {
    //         done();
    //     })
    //     .catch((err) => {
    //       expect(err.message).toContain("Topic.description cannot be null");
    //       done();
    //     })
    //   });
  });
  describe("#getPosts()", () => {

    it("should return the post associated with the topic", (done) => {

      this.topic.getPosts()
        .then((associatedPosts) => {
          expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
          done();
        });

    });

  });


});

  // describe("#getPosts()", () => {
  //   it("should create a post object with a title, body, and assigned topic", (done) => {
  //     Post.create({
  //       title: "Inception",
  //       body: "If you're going to perform inception, you need imagination.",
  //       topicId: this.topic.id
  //     })
  //     .then((post) => {
  //       expect(post.title).toBe("Inception");
  //       expect(post.body).toBe("If you're going to perform inception, you need imagination.");
  //       done();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       done();
  //     });
  //   });
  //   it("should not create a post with missing title, body, or topicId", (done) => {
  //       Post.create({
  //         title: "SF"
  //       })
  //       .then((post) => {
  //           done();
  //       })
  //       .catch((err) => {
  //         expect(err.message).toContain("Post.body cannot be null");
  //         expect(err.message).toContain("Post.topicId cannot be null");
  //         done();
  //       })
  //     });
  //     it("should associate a topic and a post together, and return all associated posts", (done) => {
  //       Post.create({
  //         title: "Prometheus",
  //         body: "There is nothing in the desert and no man needs nothing.",
  //         topicId: this.topic.id
  //       })
  //       .then((post) => {
  //         this.topic.getPosts()
  //         .then((posts) => {
  //           expect(posts[0].title).toBe(this.post.title);
  //           done();
  //         });
  //       })
  //     });
  //   });
  // });