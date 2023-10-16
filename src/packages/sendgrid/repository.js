

import { sendmailseq } from '../../models';
import { queryBuilderGetList } from './query-builder';
import { listInitOptions } from '../../utils/paginate';
import { Sequelize } from 'sequelize';
import sgMail from '@sendgrid/mail';

// Set your SendGrid API token directly
const sendgridApiKey = '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';
sgMail.setApiKey(sendgridApiKey);

async function create(body, subject,Text,html) {
  try {
    // Log the body data
    console.log('Data before creating the record:', body);

    // Create the record using sendmailseq.create
    const createdRecord = await sendmailseq.create(body,subject,Text,html);

    // Send an email using SendGrid
    const msg = {
      to: '', // Change this to the recipient's email
      from: 'berel2@brightenmail.com', // Change this to your verified sender email
      subject: subject,
      text: Text,
      html: html,
    };

    // Send the email
    const response = await sgMail.send(msg);

    // Log the response from SendGrid
    console.log('SendGrid Response:', response);

    return createdRecord;
  } catch (error) {
    // Handle any errors that might occur during record creation
    console.error('Error creating record:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export default {
  create,
};

             // can also use that //
// import { sendmailseq } from '../../models';
// import sgMail from '@sendgrid/mail';
// import express from 'express';

// const router = express.Router();

// // Set your SendGrid API token directly
// const sendgridApiKey = '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 ';
// sgMail.setApiKey(sendgridApiKey);

// router.post('/send-email', async (req, res) => {
//   const { to, from, subject, text, html } = req.body;

//   try {
//     // Create the record using sendmailseq.create
//     const createdRecord = await sendmailseq.create(req.body);

//     // Send an email using SendGrid
//     const msg = {
//       to: to,       // Recipient's email
//       from: from,   // Sender's email
//       subject: subject,
//       text: text,
//       html: html,
//     };

//     // Send the email
//     const response = await sgMail.send(msg);

//     // Log the response from SendGrid
//     console.log('SendGrid Response:', response);

//     return res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     // Handle any errors that might occur during record creation or email sending
//     console.error('Error:', error);
//     return res.status(500).json({ error: 'An error occurred' });
//   }
// });

// export default router;


