import { defineStore } from "pinia";
import { IMeter } from '../types/index';
import { useToast } from "vue-toastification";

export const useMeterStore = defineStore("meter-store", {
  state: () => ({
    siteId: null,
    meter: [] as IMeter[],
    selectedMeter: null as null | IMeter
  }),
  actions: {
    async getMeters() {
      try {
        let data = await $fetch<IMeter[]>("/api/meters");
        this.meter = data;
        return data as IMeter[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getMeter(meterId: string | number | string[] | number[]) {
      try {
        let data = await $fetch<IMeter>(`/api/meters/${meterId}`);
        this.selectedMeter = data;
        return data as IMeter;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getMetersBySiteId(siteId: string | number, customerId: string | string) {
      try {
        let data = await $fetch<IMeter>(`/api/customers/${customerId}/sites/${siteId}/meters`);
        this.selectedMeter = data;
        return data as IMeter;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async addMeter(meter: IMeter) {
      try {
        const data = await $fetch("/api/meters/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: meter,
        })
        useToast().success("Meter has been created.");
        return data
      } catch (error: any) {
        useToast().error(error.data.message);
        console.log(error)
      } finally {
        await this.getMeters();
      }
    },
    async updateMeter(meter: IMeter) {
      await $fetch(`/api/meters/${meter.id}`, {
        method: "PUT",
        body: meter,
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getMeters();
          useToast().success("Meter has been updated");
        });
    },
    async deleteMeter(id: string) {
      await $fetch(`/api/meters/${id}`, {
        method: "DELETE",
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getMeters();
          useToast().success("Meter has been deleted");
        });
    },
  },
  getters: {
    getMeterState: (state) => {
      return state.selectedMeter
    },
    siteMeters: (state) => {
      return state.meter.filter(m => m.siteId === state.siteId)
    },
  }
});