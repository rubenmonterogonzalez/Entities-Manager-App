import { defineStore } from "pinia";
import { ICustomer, ISite, IMeter, ICircuit} from '../types/index';
import { useToast } from "vue-toastification";

export const useCustomerStore = defineStore("customer-store", {
  state: () => ({
    customer: [] as ICustomer[],
    site: [] as ISite[],
    meter: [] as IMeter[],
    circuit: [] as ICircuit[],
  }),
  actions: {
    addCustomer(customer: ICustomer) {
      window.localStorage.setItem("customer", JSON.stringify(customer));
    }
  },
  getters: {
    getCustomer: (state) => {
      return state.customer
    },
    // async addNewUser(newUser: INewUser) {
    //   await $fetch("/api/customers/add", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: newUser,
    //   })
    //     .catch((e) => {
    //       useToast().error(e.data.message);
    //     })
    //     .then(async () => {
    //       await this.getCustomers();
    //       useToast().success("Customer has been created from STATE");
    //     });
    // },

    // async getCustomers() {
    //   try {
    //     let data = await $fetch<INewUser[]>("/api/customers");
    //     this.newUser = data;
    //     return data as INewUser[];
    //   } catch (e: any) {
    //     useToast().error(e.message);
    //   }
    // },
    // async addCustomer(customer: ICustomer) {
    //   await $fetch("/api/customers/add", {
    //     method: "POST",
    //     body: customer,
    //   })
    //     .catch((e) => {
    //       useToast().error(e.data.message);
    //     })
    //     .then(async () => {
    //       await this.getCustomers();
    //       useToast().success("Customer has been created from STATE");
    //     });
    // },
    // async updateCustomer(id: string, customer: ICustomer) {
    //   await $fetch(`/api/customers/${id}`, {
    //     method: "PUT",
    //     body: customer,
    //   })
    //     .catch((e) => {
    //       useToast().error(e.data.message);
    //     })
    //     .then(async () => {
    //       await this.getCustomers();
    //       useToast().success("Customer has been updated");
    //     });
    // },
    // async deleteCustomer(id: string) {
    //   await $fetch(`/api/customers/${id}`, {
    //     method: "DELETE",
    //   })
    //     .catch((e) => {
    //       useToast().error(e.data.message);
    //     })
    //     .then(async () => {
    //       await this.getCustomers();
    //       useToast().success("Customer has been deleted");
    //     });
    // },
  },
});



