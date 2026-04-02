import validator from 'validator';


type Role = "seller" | "user";

interface RegisterRequest {
    email: string;
    password: string;
    role: Role;
}

export const RegisterVadlidation = (req: RegisterRequest)=>{
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

export const LoginVadlidation = (email: string, password: string)=>{
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('your password is weak!');
    }
}

export const EmailValid = (email: string)=>{
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    }
}

export const PasswordValid = (password: string)=>{
      if(!validator.isStrongPassword(password)){
        throw new Error('your password is weak!');
    }
}