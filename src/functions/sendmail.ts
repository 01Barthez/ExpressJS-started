import nodemailer from 'nodemailer'
import fs from 'fs';
import ejs from 'ejs';
import path from 'path'
import { envs } from '../core/config/env';

interface ItemplateData {
    name: string,
    content: string
}
const emailConfig = {
    email: envs.MAIL_ADDRESS,
    password: envs.MAIL_PASSWORD
}
const validateEmailConfig = () => {
    if(!emailConfig.email || !emailConfig.password){
        console.error("email address or password not config!");
        process.exit(1);
    }
};
validateEmailConfig();

// Configuration du transporteur de l'email
const transporter = nodemailer.createTransport({
    host: envs.MAIL_HOST,
    port: envs.MAIL_PORT,
    secure: envs.MAIL_SECURITY,
    auth: {
        user: emailConfig.email,
        pass: emailConfig.password,
    },
});


async function sendMail(receiver: string, subjet: string, templateData: ItemplateData) {
    try {
        // Lecture du contenu du template ejs
        const templatePath = path.join(__dirname + '/mail.ejs')
        const template = fs.readFileSync(templatePath, 'utf8');

        // Creer un rendu HTML avec les données lu dans le fichier ejs.
        const content = ejs.render(template, templateData)

        //options du message a envoyer
        const mailOptions = {
            from: `Barthez_Web Developper : ${emailConfig.email}`,
            to: receiver,
            subject: subjet,
            html: content
        }

        // Envoi du message
        await transporter.sendMail(mailOptions)
        console.log("message successfuly send");
    } catch (error) {
        console.error(`Error when trying to send mail: ${error}`)
        throw error;
    }
}

export default sendMail;