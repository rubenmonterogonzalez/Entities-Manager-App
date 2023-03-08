import { defineStore } from "pinia";
import { ICircuit } from '../types/index';
import { useToast } from "vue-toastification";

export const useCircuitStore = defineStore("circuit-store", {
  state: () => ({
    meterId: null,
    circuit: [] as ICircuit[],
    selectedCircuit: null as null | ICircuit
  }),
  actions: {
    async getCircuits() {
      try {
        let data = await $fetch<ICircuit[]>("/api/circuits");
        this.circuit = data;
        return data as ICircuit[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getCircuit(circuitId: string | number | string[] | number[]) {
      try {
        let data = await $fetch<ICircuit>(`/api/circuits/${circuitId}`);
        this.selectedCircuit = data;
        return data as ICircuit;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getCircuitsByMeterId(meterId: string | number, siteId: string | number, customerId: string | number) {
      try {
        let data = await $fetch<ICircuit>(`/api/customers/${customerId}/sites/${siteId}/meters/${meterId}/circuits`);
        this.selectedCircuit = data;
        return data as ICircuit;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async addCircuit(circuit: ICircuit) {
      try {
        await $fetch("/api/circuits/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: circuit,
        })
        useToast().success("Circuit has been created.");
      } catch (error: any) {
        useToast().error(error.data.message);
        console.log(error)
      } finally {
        await this.getCircuits();
      }
    },
    async updateCircuit(circuit: ICircuit) {
      await $fetch(`/api/circuits/${circuit.id}`, {
        method: "PUT",
        body: circuit,
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getCircuits();
          useToast().success("Circuit has been updated");
        });
    },
    async deleteCircuit(id: string) {
      await $fetch(`/api/circuits/${id}`, {
        method: "DELETE",
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getCircuits();
          useToast().success("Circuit has been deleted");
        });
    },
  },
  getters: {
    getCircuitState: (state) => {
      return state.selectedCircuit
    },
    meterCircuit: (state) => {
      return state.circuit.filter(c => c.meterId === state.meterId)
    }
  }
});