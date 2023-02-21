import Meter from '~~/server/models/meter'

export default defineEventHandler(async (event) => {
  const siteId = event.context.params.siteId;

  try {
    const meter = await Meter.findAll({
      where: { siteId: siteId }
    });
    if (meter) {
      return {
        status: 200,
        data: meter,
      }
    } else {
      return {
        status: 404,
        data: { message: 'Meter not found' },
      }
    }
  } catch (error) {
    console.error('Error fetching meter by site ID:', error)
    return {
      status: 500,
      data: { message: 'Internal server error' },
    }
  }
})