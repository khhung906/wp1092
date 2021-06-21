/* -------------------------------------------------------------------------- */
/*                                  UTILITIES                                 */
/* -------------------------------------------------------------------------- */
const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

const checkUser = async(db, name, mission_type) => {
    if (mission_type === 'createChatBox') {
        const user_exist = await db.UserModel.findOne({ name: name });
        return user_exist;
    }
};
 
const newUser = (db, name) => {
    const newuser = new db.UserModel({ name: name });
    newuser.save();
} 

export { makeName, checkUser, newUser }