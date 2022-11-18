import express from 'express'
import{ expressjwt , GetVerificationKey} from 'express-jwt'
import jwks from 'jwks-rsa'
import * as authFunction from '../../controllers/loginAuth0.controller'

const router = express.Router()


const verifyJwt = expressjwt({
    secret : jwks.expressJwtSecret ({
        cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-2jwsrt5msmn8rjm0.us.auth0.com/.well-known/jwks.json'
    })  as GetVerificationKey,
    audience: 'this is a inique indetifier',
    issuer: 'https://dev-2jwsrt5msmn8rjm0.us.auth0.com/',
    algorithms: ['RS256']
 })



 router.get('/protected',verifyJwt, authFunction.getUser)

 export default router