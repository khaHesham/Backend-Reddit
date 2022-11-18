//const Post = require("../models/postModel");
const Repository = require("./repository");
const { mongoErrors } = require("../error_handling/errors");

class PostRepository extends Repository {
  constructor({ Post }) {
    super(Post);
  }

  async updatetext(id, text) {
    const post = await this.model.findByIdAndUpdate(
      id,
      { text: text },
      {
        new: true,
        runValidators: true,
      }
    );

    return { success: true, doc: post };
  }

  async deletePost(id) {
    //await Post.findByIdAndUpdate(id, {isDeleted: true})
    await this.model.findByIdAndDelete(id);
  }

  async addReply(parent, child) {
    await this.model.findByIdAndUpdate(parent, {
      $push: { replies: child },
      $inc: { commentCount: 1 },
    });
  }

  async removeReply(parent, child) {
    await this.model.findByIdAndUpdate(parent, {
      $pull: { replies: child },
      $inc: { commentCount: -1 },
    });
  }
}
module.exports = PostRepository;
