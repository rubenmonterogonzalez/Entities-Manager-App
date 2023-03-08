import Meter from '~~/server/models/meters'

export default defineEventHandler(async (event) => {
  const siteId = event.context.params?.siteId;
  const id = event.context.params?.meterId;

  try {
    const meter = await Meter.findOne({
      where: { siteId, id }
    });
    if (meter) {
      return {
        status: 200,
        data: meter,
      }
    } else {
      return {
        status: 404,
        data: { message: `Meter not found under site ${siteId}` },
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