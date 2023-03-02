import Site from '~~/server/models/sites'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  
  try {
    const site = await Site.findByPk(id)
    if (site) {
      return {
        status: 200,
        data: site,
      }
    } else {
      return {
        status: 404,
        data: { message: 'Site not found' },
      }
    }
  } catch (error) {
    console.error('Error fetching site by ID:', error)
    return {
      status: 500,
      data: { message: 'Internal server error' },
    }
  }
})