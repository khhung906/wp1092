
const validateUser = async (db, name) => {
  const existing = await db.UserModel.findOne({ name });
  if (existing) return existing;
  return new db.UserModel({ name }).save();
};

const validateChatBox = async (db, name, participants) => {
  let box = await db.ChatBoxModel.findOne({ name });
  if (!box) box = await new db.ChatBoxModel({ name, users: participants }).save();
  return box
    .populate('users')
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate();
};

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info)  
  {     
    if (!name1 || !name2)       
      throw new Error ("Missing chatBox name for CreateChatBox");  
    
    
    const chatBoxName = makeName(name1, name2)

    const sender = await validateUser(db, name1);     
    const receiver = await validateUser(db, name2);
    const chatBox = await validateChatBox(db, chatBoxName, [sender, receiver]);
    console.log(chatBox)
    console.log(chatBox.messages)

    const box = {
      id: chatBox._id,
      name: chatBox.name,
      messages: chatBox.messages.map((mes) =>(mes._id))
    }

    return box;
  },
  async sendMessage(parent, { message, name1, name2 }, { db, pubsub }, info)  
  {     
    console.log('send')
    if (!name1 || !name2)       
      throw new Error ("Missing chatBox name for sendMessage");  
      
    const chatBoxName = name2;

    const sender = await validateUser(db, name1);     
    //const receiver = await validateUser(db, name2);
    //receiver is not defined here
    const chatBox = await validateChatBox(db, chatBoxName, [sender]);

    pubsub.publish(chatBoxName, { 
        MessageReceived:{
          id: chatBox._id,
          sender: sender._id,
          body: message
        },
      }
    );

    const newMessage = new db.MessageModel({ sender:sender._id, body:message });
    await newMessage.save();

    chatBox.messages.push(newMessage);
    await chatBox.save();
    console.log(chatBox)

    const box = {
      id: chatBox._id,
      name: chatBox.name,
      messages: chatBox.messages.map((mes) =>(mes._id))
    }

    return box;
  },
  async findUser(parent, { userID }, { db }, info){
    const user = await db.UserModel.findOne({ _id:userID })
    if (!user)       
      throw new Error ("User not found");  
    console.log(user)
    const User = {
      id: user._id,
      name: user.name
    }
    return User
  }
};

export { Mutation as default };
