//register user
const register = async (req, res) => {
    res.send("register user");
}

//login user
const login = async (req, res) => {
    res.send("login user");
}

module.exports = {register, login};