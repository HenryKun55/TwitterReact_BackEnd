'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({ request }){
        const data = request.only(['username', 'email', 'password'])

        return await User.create(data)
    }

    async authenticate({ request, auth}){
        const { email, password } = request.all()

        return await auth.attempt(email, password)
    }

    async getUser({ response, auth }){
        try{
            const data = await auth.getUser()
            return response.json({user: data, error: false, success: true})
        }catch(err){
            return response.json({
                error: true, 
                success: false
            })
        }
    }
}

module.exports = AuthController
