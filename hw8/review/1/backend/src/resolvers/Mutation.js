import { makeName, checkUser, newUser } from '../utility';

const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {
    if (!name1 || !name2) {
      throw new Error
        ("Missing chatBox name for CreateChatBox");
    }
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log
        ("User does not exist for CreateChatBox: " + name1);
      await newUser(db, name1);
    }
    if (!(await checkUser(db, name2, "createChatBox"))) {
      console.log
        ("User does not exist for CreateChatBox: " + name2);
      await newUser(db, name2);
    }
    const chatbox_name = makeName(name1, name2)
    const existing_chatbox = await db.ChatBoxModel.findOne({ name: chatbox_name });
    if (!existing_chatbox) {
      const newchatbox = new db.ChatBoxModel({ name: chatbox_name, messages: [] });
      newchatbox.save();
      return newchatbox;
    }
    else {
      return existing_chatbox;
    }
  },

  async createMessage(parent, { name, sender, body }, { db, pubsub }, info) {
    if (!sender || !name) {
      throw new Error
        ("Missing chatBox name for CreateMessage");
    }
    const chatbox_name = name;
    const existing_chatbox = await db.ChatBoxModel.findOne({ name: chatbox_name });
    if (!existing_chatbox) {
      throw new Error
        ("This ChatBox does not exist, please construct the ChatBox first.");
    }
    else {
      const sender_user = await db.UserModel.findOne({ name: sender });
      const newmessage = new db.MessageModel({ name: chatbox_name, sender: sender_user, body: body });
      newmessage.save();
      existing_chatbox.messages.push(newmessage);
      existing_chatbox.save();
      pubsub.publish(`message ${chatbox_name}`, {
        message: {
          mutation: 'CREATED',
          data: newmessage,
        },
      });
      return newmessage;
    }
  }
}
export { Mutation as default };