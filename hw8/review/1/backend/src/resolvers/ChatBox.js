const ChatBox = {
    messages(parent, args, { db, pubsub }, info) {
        return Promise.all(
            parent.messages.map((mId) =>
                db.MessageModel.findById(mId)),
        );
    },
};
export { ChatBox as default };