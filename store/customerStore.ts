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
        let data = await $fetch<ICustomer[]>("/api/customer");
        this.customer = data;
        return data as ICustomer[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getCustomer(id: string) {
      try {
        let data = await $fetch<ICustomer>(`/api/customer/${id}`);
        this.selectedCustomer = data;
        return data as ICustomer;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async addCustomer(customer: ICustomer) {
      try {
        const data = await $fetch("/api/customer/add", {
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
    async updateCustomer(id: string, customer: ICustomer) {
      await $fetch(`/api/customer/${id}`, {
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
      await $fetch(`/api/customer/${id}`, {
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
  // getters: {
  //   getCustomer: (state) => {
  //     return state.customer
  //   },
  // }
});



