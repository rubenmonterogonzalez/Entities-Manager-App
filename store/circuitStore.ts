import { defineStore } from "pinia";
import { ICircuit } from '../types/index';
import { useToast } from "vue-toastification";

export const useCircuitStore = defineStore("circuit-store", {
  state: () => ({
    circuit: [] as ICircuit[],
  }),
  actions: {
    async getCircuits() {
      try {
        let data = await $fetch<ICircuit[]>("/api/circuit");
        this.circuit = data;
        return data as ICircuit[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async addCircuit(circuit: ICircuit) {
      try {
        await $fetch("/api/circuit/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: circuit,
        })
        useToast().success("Circuit has been created.");
      } catch (error: any) {
        useToast().error(error.data.message);
        console.log(error)
      } finally {
        async () => {
          await this.getCircuits();
        }
      }
    },
    async updateCircuit(id: string, circuit: ICircuit) {
      await $fetch(`/api/circuit/${id}`, {
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
      await $fetch(`/api/circuit/${id}`, {
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
    getCircuit: (state) => {
      return state.circuit
    },
  }
});