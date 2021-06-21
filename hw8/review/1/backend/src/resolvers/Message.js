const Message = {
    async sender(parent, args, { db, pubsub }, info) {
        return await db.UserModel.findById(parent.sender);
    },
};
export { Message as default };