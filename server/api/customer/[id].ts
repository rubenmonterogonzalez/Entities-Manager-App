import Customer from '~~/server/models/customer'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  
  try {
    const customer = await Customer.findByPk(id)
    if (customer) {
      return {
        status: 200,
        body: customer,
      }
    } else {
      return {
        status: 404,
        body: { message: 'Customer not found' },
      }
    }
  } catch (error) {
    console.error('Error fetching customer by ID:', error)
    return {
      status: 500,
      body: { message: 'Internal server error' },
    }
  }
})