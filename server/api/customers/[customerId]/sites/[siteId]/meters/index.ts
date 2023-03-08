import Meter from '~~/server/models/meters'

export default defineEventHandler(async (event) => {
  const siteId = event.context.params?.siteId;

  try {
    if (!siteId) {
      return {
        status: 400,
        data: { message: 'Bad request: missing siteId' },
      };
    }

    const meter = await Meter.findAll({
      where: { siteId: siteId },
    });

    if (meter && meter.length > 0) {
      return {
        status: 200,
        data: meter,
      };
    } else {
      return {
        status: 404,
        data: { message: 'This site does not have meters' },
      };
    }
  } catch (error) {
    console.error('Error fetching meter by site ID:', error);
    return {
      status: 500,
      data: { message: 'Internal server error' },
    };
  }
});

