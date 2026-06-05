
const userschema = require('../model/userdb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//this get all user function will fetch all the user data from the userscehma model and send the json responce as user data to the client
const getAllUsers = async (req, res) => {
    try {
        //using find method it will fetch all the user data from the userscehma model and send the json responce as user data to the client
        const users = await userschema.find().select('-password');  
        res.status(200).json(users);
    }
        catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}
//it will fetch the user data by id from the userscehma model and send the json responce as user data to the client
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        //using find by id method it will fetch the user data by id from the userscehma model and send the json responce as user data to the client
        const user = await userschema.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }      
         res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if the user already exists in the database by email
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await userschema.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
      //hasing the password using bycyopt and conversting into 10 random numbers 
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new userschema({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//this update user function will update the user data by id and send the json responce as updated data to the client
const updateUser = async (req, res) => {
    try {
    const userId = req.params.id;
    const body = req.body;
    //using find by id and update emthod it will update the user data by id from the userscehma model and send the json responce as updated data to the client
    const update = await userschema.findByIdAndUpdate(userId, body, { new: true });
    res.status(200).json(update);
}catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
}
}
//this delete user function will delete the user data by id and send the json responce as messge of scuess 
const deleteUser = async (req, res) => {
    try {
        //this req.params will sotre the or recive the dynamic id from the route 
        const userId = req.params.id;
        //using find by id and update emthod it will delete the user data by id from the userscehma model  
        const deletedUser = await userschema.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}       


const loginuser = async(req,res)=>{
    
    let {email,password} = req.body;
    try{
        if (!email || !password) {
            return res.status(400).json({error:'Email and password are required'})
        }

        const user = await userschema.findOne({email: email.toLowerCase().trim()}); 
        if(!user){
            return res.status(404).json({error:'User not found'})
        }
        const ismatching = await bcrypt.compare(password,user.password);
        if(!ismatching){
            return res.status(401).json({error:'Invalid password'})
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }catch(error){
        res.status(500).json({error:'Internal Server Error'})
}
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginuser 
}
