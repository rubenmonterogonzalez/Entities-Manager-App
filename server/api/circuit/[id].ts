import Circuit from '~~/server/models/circuit'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  
  try {
    const circuit = await Circuit.findByPk(id)
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
    console.error('Error fetching circuit by ID:', error)
    return {
      status: 500,
      data: { message: 'Internal server error' },
    }
  }
})