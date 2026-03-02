import mongoose from "mongoose";
import validator from 'validator';

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    email:{
        type: String,
        require: true,
        unique: true,  // auto apply the index
        lowercase:true,
        trim: true,
        validator: {
            validator: (value)=>{
                if(!validator.isEmail(value)){
                    throw new Error(`${value} is not valid!`)
                }
            }
        }
    },
    password:{
        type: String,
        require: true,
        validator: {
            validator: (value)=>{
                if(!validator.isStrongPassword(value)){
                    throw new Error(`${value} is weak password!`)
                }
            }
        }
    },
    passwordChangedAt: {
    type: Date,
    default: null
    },
    role: {
        type: String,
        require: true,
        enum: ['admin','user']
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;