import { defineStore } from "pinia";
import { ISite } from '../types/index';
import { useToast } from "vue-toastification";

export const useSiteStore = defineStore("site-store", {
  state: () => ({
    customerId: null,
    site: [] as ISite[],
    selectedSite: null as null | ISite,
  }),
  actions: {
    async getSites() {
      try {
        let data = await $fetch<ISite[]>("/api/sites");
        this.site = data;
        return data as ISite[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getSite(siteId: string | number | string[] | number[]) {
      try {
        let data = await $fetch<ISite>(`/api/sites/${siteId}`);
        this.selectedSite = data;
        return data as ISite;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getSitesByCustomerId(customerId: string | number | string[] | number[]) {
      try {
        let data = await $fetch<ISite>(`/api/customers/${customerId}/sites`);
        this.selectedSite = data;
        return data as ISite;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async addSite(site: ISite) {
      try {
        const data = await $fetch("/api/sites/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: site,
        })
        useToast().success("Site has been created.");
        return data
      } catch (error: any) {
        useToast().error(error.data.message);
        console.log(error)
      } finally {
        await this.getSites();
      }
    },
    async updateSite(site: ISite) {
      await $fetch(`/api/sites/${site.id}`, {
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
      await $fetch(`/api/sites/${id}`, {
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
    getSiteState: (state) => {
      return state.selectedSite
    },

    customerSites: (state) => {
      return state.site.filter(s => s.customerId === state.customerId)
    },
  }
});