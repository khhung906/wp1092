const Query = {
  chatBoxQuery(parent, args, { db }, info) {
    if (!args.name) {
      throw new Error("Missing chatbox name");
    }
    else{
      const chatBox = db.ChatBoxModel.findOne({ name: args.name });
      console.log(chatBox)
      return chatBox;
    }
  }
};

export { Query as default };
