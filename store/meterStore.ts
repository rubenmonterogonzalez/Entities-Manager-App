import { defineStore } from "pinia";
import { IMeter } from '../types/index';
import { useToast } from "vue-toastification";

export const useMeterStore = defineStore("meter-store", {
  state: () => ({
    meter: [] as IMeter[],
  }),
  actions: {
    async addMeter(meter: IMeter) {
      try {
        await $fetch("/api/meter/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: meter,
        })
        useToast().success("Meter has been created.");
      } catch (error: any) {
        useToast().error(error.data.message);
        console.log(error)
      } finally {
        async () => {
          await this.getMeters();
        }
      }
    },
    async getMeters() {
      try {
        let data = await $fetch<IMeter[]>("/api/meter");
        this.meter = data;
        return data as IMeter[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async updateMeter(id: string, meter: IMeter) {
      await $fetch(`/api/meter/${id}`, {
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
      await $fetch(`/api/meter/${id}`, {
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
    getMeter: (state) => {
      return state.meter
    },
  }
});