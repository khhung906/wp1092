import uuidv4 from 'uuid/v4';
import { checkUser, newUser } from './utils';

const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info)
  {
    if (!name1 || !name2)
      throw new Error
      ("Missing chatBox name for CreateChatBox");
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

    const chatboxName = [name1, name2].sort().join("_");
    const findCheckBox = await db.ChatBoxModel.findOne({ name: chatboxName });
    if(findCheckBox) return findCheckBox;
    else {
      let newChatBox = await new db.ChatBoxModel({
        id: uuidv4(),
        name: chatboxName,
        messages: [],
      }).save();
  
      return newChatBox;
    }
  },

  async createMessage(parent, { sender, body, chatBoxName }, { db, pubsub }, info)
  {
    //console.log(123)
    const senderUser = await db.UserModel.findOne({ name: sender });
    const chatbox = await db.ChatBoxModel.findOne({ name: chatBoxName });
    //console.log(senderUser)
    const msg = await new db.MessageModel({
      id: uuidv4(),
      sender: senderUser,
      body: body,
    }).save();
    console.log(msg)

    

    chatbox.messages.push(msg)
    await chatbox.save()
    pubsub.publish(`addMessages ${chatBoxName}`, {
      addMessages: {
        mutation: "CREATED",
        data: msg,
      },
    });
    return msg
  }

}



export { Mutation as default };
