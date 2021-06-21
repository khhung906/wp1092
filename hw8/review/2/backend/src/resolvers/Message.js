const Message = {
    sender(parent, args, { db }, info) {
      return Promise.resolve(db.UserModel.findById(parent.sender));
    },
  };
  
export default Message;