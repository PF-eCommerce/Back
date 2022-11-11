const nodemailer = require('nodemailer')

const transports = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure : true,
    auth : {
        user : 'tresbien.ecommerce@gmail.com',
        pass : process.env.EMAIL_PASS
    },
});

transports.verify().then(() => {
    console.log('listo para enviar correos')
})

module.exports = transports;