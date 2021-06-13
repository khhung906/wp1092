const validateChatBox = async (db, name) => {
    let box = await db.ChatBoxModel.findOne({ name });
    if (!box) throw new Error ("chatbox not found");  
    return box
      .populate('users')
      .populate({ path: 'messages', populate: 'sender' })
      .execPopulate();
};

const Query = {   
    chatbox(parent, {key}, { db }, info) {
        const chatbox = validateChatBox(db, key)
        return chatbox;
    },
};

export default Query;