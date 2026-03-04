import validator from 'validator';

export const RegisterVadlidation = (req)=>{
     const {email, password, role} = req;

    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('your password is weak!');
    }
    if(!["seller","user"].includes(role)){
        throw new Error('role is not valid!');
    }
}

export const LoginVadlidation = (email, password)=>{
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('your password is weak!');
    }
}