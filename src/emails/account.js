const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => sgMail.send({
    to: email,
    name: name,
    from: 'asia.kaiant@hotmail.com',
    subject: 'Welcome to Task Manager',
    html: `I hope this one actually get to you.<strong>${name} <strong>`
})


const sendCancelationEmail = (email, name) => sgMail.send({
    to: email,
    from: 'asia.kaiant@hotmail.com',
    subject: 'Good bye! Is there something we kept you on board',
    text: `Its sad to see you going. ${name}. we would like to know the reason of leaving`
})

module.exports = {sendWelcomeEmail, sendCancelationEmail}