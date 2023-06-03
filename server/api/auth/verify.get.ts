import { App } from 'realm-web'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = query.token as string
  const tokenId = query.tokenId as string

  if (!token || !tokenId) {
    throw createError({
      statusCode: 400,
      message: 'Missing token or tokenId',
    })
  }

  const config = useRuntimeConfig()

  const app = new App({ id: config.realmAppId })
  try {
    await app.emailPasswordAuth.confirmUser({ token, tokenId })

    return sendRedirect(event, '/dashboard', 302)
  }
  catch (error: any) {
    console.error('verify user', error)
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }
})
