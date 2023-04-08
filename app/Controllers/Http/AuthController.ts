import Hash from '@ioc:Adonis/Core/Hash'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const user = await prisma.user.create({
      data: {
        name: request.input('name'),
        email: request.input('email'),
        password: await Hash.make(request.input('password')),
      },
    })

    const token = await auth.login(user)
    return token
  }

  public async login({ auth, request }: HttpContextContract) {
    const token = await auth.use('api').attempt(request.input('email'), request.input('password'))

    return token
  }
}
