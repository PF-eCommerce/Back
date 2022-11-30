import {transports } from './mailer'
import {Iregister, IforgotPassword, IEmail} from '../../types'

    export const emailRegister = async (datos : Iregister) =>{
        
        const {userName, email , token } = datos

         await transports.sendMail({
        from : `"TresBien - eCommerce Indumentaria" <tresbien.ecommerce@gmail.com>`,
        to: email,
        subject : "Comprueba tu cuenta en TresBien",
        text : "Comprueba tu cuenta en TresBien",
        html : `<p>Hola ${userName}, comprueba tu cuenta de TresBien.</p>
        <p> Tu cuenta esta lista, solo debes comprobarla en el siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar este email</p>`
        })
    }
   export const forgotPasswordSendEmail = async (datos : IforgotPassword) =>{
        const {email, token } = datos
        
         await transports.sendMail({
            from : `"TresBien - eCommerce Indumentaria" <tresbien.ecommerce@gmail.com>`,
            to: email,
            subject : 'Olvidaste tu Contraseña',
            text : 'cambia tu constraseña',
            html : `<p>Hola, accede al link de abajo para cambiar tu contraseña.</p>
            <a href="${process.env.FRONTEND_URL}/changePassword/${token}">Cambiar la password</a> </p>
            <p> Si tu no solicitaste el cambio de contraseña por "olvidaste tu contraseña", alguien intenta hackearte </p>`
            })
    }
    export const emailPayment = async (datos : IEmail) =>{
          const {link, email} = datos
            await transports.sendMail({
            from : `"TresBien - eCommerce Indumentaria" <tresbien.ecommerce@gmail.com>`,
            to: email,
            subject : 'Tu orden',
            text : 'Tu compra',
            html : `<p>Hola, aqui esta tu orden.</p>
                    <a href="${link}">proceder a comprar</a> </p>
                    <p> Si tu ya hiciste la compra , puedes obviar este email</p>`
        })
    }

