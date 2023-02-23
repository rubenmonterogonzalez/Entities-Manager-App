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
        let data = await $fetch<ICircuit[]>("/api/circuit");
        this.circuit = data;
        return data as ICircuit[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getCircuit(circuitId: string | number | string[] | number[]) {
      try {
        let data = await $fetch<ICircuit>(`/api/circuit/${circuitId}`);
        this.selectedCircuit = data;
        return data as ICircuit;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getCircuitsByMeterId(meterId: string | number | string[] | number[]) {
      try {
        let data = await $fetch<ICircuit>(`/api/circuit/meterId/${meterId}`);
        this.selectedCircuit = data;
        return data as ICircuit;
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
    getCircuitState: (state) => {
      return state.selectedCircuit
    },
    meterCircuit: (state) => {
      return state.circuit.filter(c => c.meterId === state.meterId)
    }
  }
});