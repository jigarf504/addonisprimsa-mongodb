import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostController {
  public async index() {
    return await prisma.post.findMany()
  }

  public async store({ request }: HttpContextContract) {
    const post = prisma.post.create({
      data: request.only(['title', 'content']),
    })

    return post
  }

  public async update({ request, params }: HttpContextContract) {
    const post = prisma.post.update({
      where: { id: params.id },
      data: request.only(['title', 'content']),
    })

    return post
  }

  public async show({ params }: HttpContextContract) {
    return await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    })
  }

  public async destroy({ params }: HttpContextContract) {
    return await prisma.post.delete({
      where: { id: params.id },
    })
  }
}
