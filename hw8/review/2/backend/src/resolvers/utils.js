import uuidv4 from 'uuid/v4';

const checkUser = async (db, name, type) => {
    if(type === "createChatBox") {
        let user = await db.UserModel.findOne({ name: name });
        if(!user) return false;
        else return true;
    }
}

const newUser = async (db, name) => {
    let user = await new db.UserModel({ id: uuidv4(), name: name }).save();
}

export {checkUser, newUser};