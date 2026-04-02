import { Request, Response } from "express";
import { sendContactEmail } from '../utils/sendEmail.js';
import { EmailValid } from '../utils/validations.js';

interface ReqBody {
    name: string;
    email: string;
    message: string;
}

const Contact = async (req: Request<{}, {}, ReqBody>, res: Response): Promise<void> => {
    try{
        const {name, email, message} = req?.body;

        if(!name || !email || !message){
             res.status(404).json({message: 'All feilds are required!'})
             return;
        }

        // validate
        EmailValid(email);

        // send mail
        sendContactEmail(name, email, message);

        // return
        res.status(200).json({message: 'Successfully sent message'});
    }
    catch(err){
        res.status(500).json({message: 'Failed to send message!'})
    }
}

export default Contact;