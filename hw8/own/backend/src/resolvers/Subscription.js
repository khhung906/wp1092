
const Subscription = {
  MessageReceived:{
    async subscribe(parent, { key }, { db, pubsub }, info)
    {
      const chatBox = await db.ChatBoxModel.findOne({name:key});
      console.log(chatBox)

      if (!chatBox) {
        throw new Error('chatBox not found');
      }

      return pubsub.asyncIterator(chatBox.name);
    }
  }
};

export default Subscription;
