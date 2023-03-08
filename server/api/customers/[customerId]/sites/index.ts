import Site from '~~/server/models/sites'

export default defineEventHandler(async (event) => {
  const customerId = event.context.params?.customerId;

  try {
    if (!customerId) {
      return {
        status: 400,
        data: { message: 'Bad request: missing customerId' },
      };
    }

    const site = await Site.findAll({
      where: { customerId: customerId },
    });

    if (site && site.length > 0) {
      return {
        status: 200,
        data: site,
      };
    } else {
      return {
        status: 404,
        data: { message: 'This customer does not have sites' },
      };
    }
  } catch (error) {
    console.error('Error fetching site by customer ID:', error);
    return {
      status: 500,
      data: { message: 'Internal server error' },
    };
  }
});

