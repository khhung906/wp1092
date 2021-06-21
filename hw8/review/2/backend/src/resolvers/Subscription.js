const Subscription = {
  addMessages: {
    subscribe(parent, { name }, { db, pubsub }, info) {
      const chatbox = db.ChatBoxModel.findOne({ name: name })
      console.log(name)
      if (!chatbox) {
        throw new Error('ChatBox not found');
      }

      return pubsub.asyncIterator(`addMessages ${name}`);
    },
  },
};

export { Subscription as default };
