import { defineStore } from "pinia";
import { ICustomer, ISite, IMeter, ICircuit } from '../types/index';
import { useToast } from "vue-toastification";

export const useEntitiesStore = defineStore("entities-store", {
  state: () => ({
    initialised: false,
    customers: [] as ICustomer[],
    sites: [] as ISite[],
    meters: [] as IMeter[],
    circuits: [] as ICircuit[],
  }),
  actions: {
    async init() {
      if (this.initialised) return
      await this.fetchEntities(),
      await this.fetchEntity(),
      await this.fetchEntityByEntities(),
      this.initialised = true
    },
    async fetchEntities(entities = ['customers', 'sites', 'meters', 'circuits']) {
      try {
        const promises = entities.map(entity => $fetch(`/api/${entity}`));
        const [customers, sites, meters, circuits] = await Promise.all(promises);
        this.customers = customers as ICustomer[];
        this.sites = sites as ISite[];
        this.meters = meters as IMeter[];
        this.circuits = circuits as ICircuit[];
      } catch (error: any) {
        useToast().error(error.message)
      }
    },
    async fetchEntity(entities: 'customers' | 'sites' | 'meters' | 'circuits', entity: number | string) {
      try {
        const promise = await $fetch(`/api/${entities}/${entity}`);
        switch (entities) {
          case 'customers':
            this.customers = [promise] as ICustomer[];
            break;
          case 'sites':
            this.sites = [promise] as ISite[];
            break;
          case 'meters':
            this.meters = [promise] as IMeter[];
            break;
          case 'circuits':
            this.circuits = [promise] as ICircuit[];
            break;
        }
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async fetchEntityByEntities(entities:'sites' | 'meters' | 'circuits', entity: 'customerId' | 'siteId' | 'meterId' | 'circuitId', entityId: string | number) {
      try {
        const data = await $fetch(`/api/${entities}/${entity}/${entityId}`);
        return data;
      } catch (error: any) {
        useToast().error(error.message);
      }
    },
    async addEntity(entity = 'sites') {
      // api call
      await this.fetchEntities([entity])
    }
  },
  getters: {

  }
})
