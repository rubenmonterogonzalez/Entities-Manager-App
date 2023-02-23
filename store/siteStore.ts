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
        let data = await $fetch<ISite[]>("/api/site");
        this.site = data;
        return data as ISite[];
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getSite(siteId: string | number | string[] | number[]) {
      try {
        let data = await $fetch<ISite>(`/api/site/${siteId}`);
        this.selectedSite = data;
        return data as ISite;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async getSitesByCustomerId(customerId: string | number | string[] | number[]) {
      try {
        let data = await $fetch<ISite>(`/api/site/customerId/${customerId}`);
        this.selectedSite = data;
        return data as ISite;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async addSite(site: ISite) {
      try {
        const data = await $fetch("/api/site/add", {
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
    getSiteState: (state) => {
      return state.selectedSite
    },

    customerSites: (state) => {
      return state.site.filter(s => s.customerId === state.customerId)
    },
  }
});