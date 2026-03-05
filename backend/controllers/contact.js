import { sendContactEmail } from '../utils/sendEmail.js';
import { EmailValid } from '../utils/validations.js';

const Contact = async (req, res)=>{
    try{
        const {name, email, message} = req?.body;

        if(!name || !email || !message){
            return res.status(404).json({message: 'All feilds are required!'})
        }

        // validate
        EmailValid(email);

        // send mail
        sendContactEmail(name, email, message);

        // return
        res.status(200).json({message: 'Successfully sent message'});
    }
    catch(err){
        return res.status(400).json({message: 'Failed to send message!'})
    }
}

export default Contact;