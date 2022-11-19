import nodemailer from 'nodemailer'

export const transports = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure : true,
    auth : {
        user : 'tresbien.ecommerce@gmail.com',
        pass : 'vxrowmmihsasxeya'
    },
});

transports.verify().then(() => {
    console.log('listo para enviar correos')
})

