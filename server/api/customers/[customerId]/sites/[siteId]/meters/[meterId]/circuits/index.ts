import Circuit from '~~/server/models/circuits'

export default defineEventHandler(async (event) => {
  const meterId = event.context.params?.meterId;
console.log(meterId)
  try {
    if (!meterId) {
      return {
        status: 400,
        data: { message: 'Bad request: missing meterId' },
      };
    }

    const circuit = await Circuit.findAll({
      where: { meterId: meterId },
    });

    if (circuit && circuit.length > 0) {
      return {
        status: 200,
        data: circuit,
      };
    } else {
      return {
        status: 404,
        data: { message: 'This meter does not have circuits' },
      };
    }
  } catch (error) {
    console.error('Error fetching circuit by meter ID:', error);
    return {
      status: 500,
      data: { message: 'Internal server error' },
    };
  }
});

