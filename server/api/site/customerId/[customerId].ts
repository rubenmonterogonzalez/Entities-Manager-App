import Site from '~~/server/models/site'

export default defineEventHandler(async (event) => {
  const customerId = event.context.params.customerId;

  try {
    const site = await Site.findAll({
      where: { customerId: customerId }
    });
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
    console.error('Error fetching site by customer ID:', error)
    return {
      status: 500,
      data: { message: 'Internal server error' },
    }
  }
})