import { defineStore } from "pinia";
import { ISite } from '../types/index';
import { useToast } from "vue-toastification";

export const useSiteStore = defineStore("site-store", {
  state: () => ({
    site: [] as ISite[],
  }),
  actions: {
    async getSites() {
      try {
        let data = await $fetch<ISite[]>("/api/site");
        this.site = data;
        return data as ISite[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async addSite(site: ISite) {
      try {
        await $fetch("/api/site/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: site,
        })
        useToast().success("Site has been created.");
      } catch (error: any) {
        useToast().error(error.data.message);
        console.log(error)
      } finally {
        async () => {
          await this.getSites();
        }
      }
    },
    async updateSite(id: string, site: ISite) {
      await $fetch(`/api/site/${id}`, {
        method: "PUT",
        body: site,
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getSites();
          useToast().success("Site has been updated");
        });
    },
    async deleteSite(id: string) {
      await $fetch(`/api/site/${id}`, {
        method: "DELETE",
      })
        .catch((e) => {
          useToast().error(e.data.message);
        })
        .then(async () => {
          await this.getSites();
          useToast().success("Site has been deleted");
        });
    },
  },
  getters: {
    getSite: (state) => {
      return state.site
    },
  }
});