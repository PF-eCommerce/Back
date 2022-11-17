import {Request, Response } from 'express'
import axios from 'axios'

export const getUser = async (req : Request , res : Response) => {
     
    try {
        const accessToken = req.headers.authorization?.split(' ')[1]
        const userInfo = await axios.get('https://dev-2jwsrt5msmn8rjm0.us.auth0.com/userinfo',{
            headers : {
                authorization : `Bearer ${accessToken}`
            }
        })

        res.send(userInfo.data)
    } catch (error) {
        
    }
 }