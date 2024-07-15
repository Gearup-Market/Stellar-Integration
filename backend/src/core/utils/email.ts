/* eslint-disable prettier/prettier */

import { transporter } from "../config/mailer";

export const sendVerificationEmail = async (email: string, token: string) => {

    const mailOptions = {
        from: 'register@glitztutors.ng',
        to: email,
        subject: 'Verify your account',
        text: `Please verify your account by clicking on the following link: ${process.env.BASE_URL}/users/verify/${token}`,
    };

    await transporter.sendMail(mailOptions);
};
export const sendRestPasswordEmail = async (email: string, token: string) => {

    const mailOptions = {
        from: 'register@glitztutors.ng',
        to: email,
        subject: 'Password Reset',
        text: `Your password reset token is ${token}. This token is valid for 1 hour.`,
    };

    await transporter.sendMail(mailOptions);
};
