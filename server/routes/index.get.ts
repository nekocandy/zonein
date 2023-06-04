export default defineEventHandler(async (event) => {
  return sendRedirect(event, '/login', 302)
})
