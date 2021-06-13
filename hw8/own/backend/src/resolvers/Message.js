const Message = {   
    sender(parent, args, { db }, info) {  
        return db.UserModel.findById(parent.sender)
        // return Promise.all(       
        //     parent.sender.map((mId) =>           
        //     db.UserModel.findById(mId)),     
        // );   
    }, 
};

export default Message;