import Circuit from '~~/server/models/circuit'

export default defineEventHandler(async (event) => {
  const meterId = event.context.params.meterId;

  try {
    const circuit = await Circuit.findAll({
      where: { meterId: meterId }
    });
    if (circuit) {
      return {
        status: 200,
        data: circuit,
      }
    } else {
      return {
        status: 404,
        data: { message: 'Circuit not found' },
      }
    }
  } catch (error) {
    console.error('Error fetching circuit by meter ID:', error)
    return {
      status: 500,
      data: { message: 'Internal server error' },
    }
  }
})