// SortingStore.js
import { defineStore } from 'pinia';

export const useSortingStore = defineStore('sorting', {
  state: () => ({
    sortColumn: 'Cores',
    sortOrder: 'asc', // or 'desc'
    
  }),
  getters:{
    getSortColumn(){
        return this.sortColumn;
    },
    getSortOrder(){
        return this.sortOrder;
    }
  },
  actions: {
    setSort(column) {
      // Implement logic to toggle ascending/descending when clicking the same column
      if (column === this.sortColumn) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc'; // Default to ascending when changing column
      }
      //console.log(this.sortColumn, this.sortOrder)
    },

  },
});