/*
SortingStore.js

Description:
This Pinia store manages the sorting of data based on a specified column and order. 
It defines the state for the sorting column and order, along with actions to update and toggle sorting settings. 
The getters provide access to the current sort column and order.

Store Details:
- State: 
    - sortColumn: Represents the column to sort on.
    - sortOrder: Represents the sorting order (asc or desc).
- Getters: 
    - getSortColumn(): Returns the current sort column.
    - getSortOrder(): Returns the current sorting order.

Author: Shankar Kailas
*/

import { defineStore } from 'pinia';

export const useSortingStore = defineStore('sorting', {
state: () => ({
    sortColumn: 'Status', // which column to be sorting on 
    sortOrder: 'desc', // which order to be sorting in
    
}),
//getters
getters:{
    getSortColumn(){
        return this.sortColumn;
    },
    getSortOrder(){
        return this.sortOrder;
    }
},

actions: {

    // Implement logic to toggle ascending/descending when clicking the same column
    setSort(column) {
    
    if (column === this.sortColumn) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        this.sortColumn = column;
        this.sortOrder = 'asc'; // arbitrarily default to ascending when changing sorting column
    }
    
    },

},
});