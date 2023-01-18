import { defineStore } from "pinia";
import { ICustomer } from "../types/index";
// import { useToast } from "vue-toastification";
import useToast from "../composables/useToast";

export const useCustomerStore = defineStore("customer-store", {
  state: () => ({
    customers: [] as ICustomer[],
  }),
  actions: {
    async getCustomers() {
      try {
        let data = await $fetch<ICustomer[]>("/api/customers");
        this.customers = data;
        return data as ICustomer[];
      } catch (e: any) {
        useToast().error(e.message);
      }
    },
    async addCustomer(customer: ICustomer) {
      await $fetch("/api/customers/add", {
        method: "POST",
        body: customer,
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getCustomers();
          useToast().success("Customer has been created");
        });
    },
    async updateCustomer(id: string, customer: ICustomer) {
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
});