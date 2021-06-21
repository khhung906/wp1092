import { makeName, checkUser, newUser } from '../utility';
const Query = {
    users(parent, args, { db, pubsub }, info) {
        if (!args.name) {
            return db.UserModel;
        }
        return db.UserModel.find({ name: { $regex: args.name } });
    },
    chatbox(parent, { name }, { db, pubsub }, info) {
        return db.ChatBoxModel.findOne({ name: name })
    },
};

export { Query as default };
