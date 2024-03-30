/* eslint-disable no-undef */
// UserController.js

const { User } = require("../models/ModelSchema");
var Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var cookie = require('cookie')



const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    if(req.body.password){
      const hash = Bcrypt.hashSync(req.body.password, 10);
      newUser.password = hash;
    }
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  //check for existing user
  const email = req.body.email;
  const password = req.body.password;
  let hashedPWD;
  User.findOne({email: email}).exec()
                              .then(data => {
                                if(!data){
                                    res.status(401).send("Invalid Login, Try again.");
                                }
                                else{
                                    hashedPWD = data.password;
                                    Bcrypt.compare(password, hashedPWD, (err, ismatch) => {
                                      if(ismatch){
                                        const token = jwt.sign({email: email}, process.env.SECRET);
                                        // add token to custom header, we are changing this.
                                        // res.header('Access-Control-Expose-Headers', 'x-auth-token');
                                        // res.header("x-auth-token", token);
                                        
                                        // Set a cookie with the secure and HttpOnly flags  
                                        const cookieOptions = {    
                                            secure: true,    
                                            httpOnly: true,  
                                            path:'/'
                                        };  

                                        const cookieString = cookie.serialize('jwt', token, cookieOptions);  

                                        // Set the cookie in the response header  
                                        res.setHeader('Set-Cookie', cookieString);
                                        //res.cookie('jwt', token, cookieOptions);

                                        res.status(200).send({"Message":"Logged in", "id": data["_id"]})
                                      }
                                      else{
                                        res.status(401).send("Failed to login, check credentials.")
                                      }
                                    })
                                }
                            })
                              .catch(err => {
                                res.status(500).send(err);
                              })
                              
}

const logout = async(req, res) =>{
res.clearCookie('jwt');
res.status(204).send();
};


module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
  logout
};
