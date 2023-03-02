import Meter from '~~/server/models/meters'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  
  try {
    const meter = await Meter.findByPk(id)
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
    console.error('Error fetching meter by ID:', error)
    return {
      status: 500,
      data: { message: 'Internal server error' },
    }
  }
})