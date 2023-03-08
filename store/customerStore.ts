import { defineStore } from "pinia";
import { ICustomer } from '../types/index';
import { useToast } from "vue-toastification";

export const useCustomerStore = defineStore("customer-store", {
  state: () => ({
    customer: [] as ICustomer[],
    selectedCustomer: null as null | ICustomer,
  }),
  actions: {
    async getCustomers() {
      try {
        let data = await $fetch<ICustomer[]>("/api/customers");
        this.customer = data;
        return data as ICustomer[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getCustomer(id: string | number | string[] | number[]) {
      try {
        let data = await $fetch<ICustomer>(`/api/customers/${id}`);
        this.selectedCustomer = data;
        return data as ICustomer;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async addCustomer(customer: ICustomer) {
      try {
        const data = await $fetch("/api/customers/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: customer,
        })
        useToast().success("Customer has been created and added to Db.");
        return data
      
      } catch (error: any) {
        useToast().error(error.data.message);
        console.log(error)
      } finally {
        async () => {
          await this.getCustomers();
        }
      }
    },
    async updateCustomer(id: string | number, customer: ICustomer) {
      await $fetch(`/api/customers/${id}`, {
        method: "PUT",
        body: customer,
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getCustomers();
          useToast().success("Customer has been updated");
        });
    },
    async deleteCustomer(id: string) {
      await $fetch(`/api/customers/${id}`, {
        method: "DELETE",
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getCustomers();
          useToast().success("Customer has been deleted");
        });
    },
  },
  getters: {
    getCustomerState: (state) => {
      return state.selectedCustomer;
    },
  }
});



