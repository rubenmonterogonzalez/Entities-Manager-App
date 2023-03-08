import Circuit from '~~/server/models/circuits'

export default defineEventHandler(async (event) => {
  const meterId = event.context.params?.meterId;
  const id = event.context.params?.circuitId;

  try {
    const circuit = await Circuit.findOne({
      where: { meterId, id }
    });
    if (circuit) {
      return {
        status: 200,
        data: circuit,
      }
    } else {
      return {
        status: 404,
        data: { message: `Circuit not found under meter ${meterId}` },
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