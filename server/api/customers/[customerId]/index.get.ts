import Customer from '~~/server/models/customers'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.customerId;
  
  try {
    const customer = await Customer.findByPk(id)
    if (customer) {
      return {
        status: 200,
        data: customer,
      }
    } else {
      return {
        status: 404,
        data: { message: 'Customer not found' },
      }
    }
  } catch (error) {
    console.error('Error fetching customer by ID:', error)
    return {
      status: 500,
      data: { message: 'Internal server error' },
    }
  }
})