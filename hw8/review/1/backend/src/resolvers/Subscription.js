const Subscription = {
    message: {
        subscribe(parent, { chatbox_name }, { db, pubsub }, info) {
            const chatbox = db.ChatBoxModel.findOne({ name: chatbox_name });
            if (!chatbox) {
                throw new Error('ChatBox not found');
            }
            return pubsub.asyncIterator(`message ${chatbox_name}`);
        }
    },
};

export { Subscription as default };
