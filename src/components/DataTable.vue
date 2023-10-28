<!-- DataTable.vue
  Description:
  This Vue.js component renders a dynamic table with search, sorting, and pagination features. 
  Users can search for specific data, click on table headers to sort columns in ascending or descending order, 
  edit table entries directly, and save changes. The component interfaces with the "sorting" Pinia store to manage sorting state.

  Features:
  - Searchable data fields
  - Sortable columns with ascending/descending toggle
  - Editable table entries
  - Pagination for data navigation
  - Data saving functionality

  Author: [Shankar Kailas]
-->
<template>
    <div>
      <!-- input fields that allow for searching -->
      <div>
      <input v-model="searchQueryCores" placeholder="Search Cores" />
      <input v-model="searchQueryProduct" placeholder="Search Product" />
      <input v-model="searchQueryLithography" placeholder="Search Lithography" />
      <input v-model="searchQueryThreads" placeholder="Search Threads" />
      <input v-model="searchQueryBaseFrequency" placeholder="Search Base Frequency" />
      <input v-model="searchQueryMaxTurboFrequency" placeholder="Search Max Turbo Frequency" />
    </div>
          <!-- button that allows user to save modifications to datafile -->
          <button @click="saveJsonFile">Click Me to Save</button>
      <table>
        <thead>
          <!-- headers that allow for sorting -->
          <tr>
            <th @click="setSort('Status')">Status</th>
            <th @click="setSort('Cores')">Cores</th>
            <th @click="setSort('Product')">Product</th>
            <th @click="setSort('Lithography')">Lithography</th>
            <th @click="setSort('Threads')">Threads</th>
            <th @click="setSort('Base_Freq')">Base Frequency</th>
            <th @click="setSort('Max_Turbo_Freq')">Max Turbo Frequency</th>
          </tr>
        </thead>
        <tbody>
          
          <tr v-for="(item, index) in filteredData" :key="item.id" >
            <td :class="rowClass()(item.Status)"> {{ item["Status"] }} </td>

            <EditableEntry
              :value="item['Cores']"
              @input="saveCores(index, $event)"
              :class="rowClass()(item.Status)"
            ></EditableEntry>

            <td :class="rowClass()(item.Status)" > {{ item["Product"] }} </td>

            <EditableEntry
              :value="item['Lithography']"
              @input="saveLithography(index, $event)"
              :class="rowClass()(item.Status)"
            ></EditableEntry>

            <EditableEntry
              :value="item['Threads']"
              @input="saveThreads(index, $event)"
              :class="rowClass()(item.Status)"
            ></EditableEntry>
            
            <EditableEntry
              :value="item['Base_Freq']"
              @input="saveBaseFrequency(index, $event)"
              :class="rowClass()(item.Status)" 
              :minValue=0
              :isDecimal=true
            ></EditableEntry>

            <EditableEntry
              :value="item['Max_Turbo_Freq']"
              @input="saveMaxTurboFrequency(index, $event)"
              :class="rowClass()(item.Status)" 
              :minValue=0
              :isDecimal=true
            ></EditableEntry>
            
          </tr>
        </tbody>
      </table>
      <!-- pagination feature to allow for toggling between pages of data -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage * itemsPerPage >= jsonData.length">Next</button>
      </div>

    </div>
  </template>
  
  <script>
  import EditableEntry from './EditableEntry.vue'
  import axios from 'axios'
  import { useSortingStore } from '@/store/sortingStore';
  import { mapActions } from 'pinia';
  
  export default {
    components:{
      EditableEntry,
    },
    data() {
      return {
        jsonData: [], // all data
        currentPage: 1, // element that controls which page of data to show
        itemsPerPage: 100, // how many entries per page

        // variables that help with filtering the data based on textbox input
        searchQueryStatus: '',
        searchQueryProduct: '',
        searchQueryCores: '', 
        searchQueryLithography: '', 
        searchQueryThreads: '', 
        searchQueryBaseFrequency: '', 
        searchQueryMaxTurboFrequency: '', 
      };
    },
    created(){  
      // start by pulling the data from backend server    
      axios.get('http://localhost:3000/api/data') 
      .then(response => {
        this.jsonData = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
    },  
    
    computed: {
      
      startIndex() {
        return (this.currentPage - 1) * this.itemsPerPage;
      },

      // function that implements the filtering based on the search filters
      // if a filter is empty, it has no effect
      filteredData() {
      
        return this.displayedData.filter(item => {

          return (
            (this.searchQueryStatus === '' || item.Status.toLowerCase().includes(this.searchQueryStatus.toLowerCase())) &&
            (this.searchQueryProduct === '' || item.Product.toLowerCase().includes(this.searchQueryProduct.toLowerCase())) &&
            (this.searchQueryBaseFrequency === '' || parseFloat(this.searchQueryBaseFrequency) == item.Base_Freq) &&
            (this.searchQueryMaxTurboFrequency === '' || parseFloat(this.searchQueryMaxTurboFrequency) == item.Max_Turbo_Freq) &&
            (this.searchQueryLithography === '' || parseFloat(this.searchQueryLithography) == item.Lithography) &&
            (this.searchQueryThreads === '' || parseFloat(this.searchQueryThreads) == item.Threads) &&
            (this.searchQueryCores === '' || parseFloat(this.searchQueryCores) == item.Cores)
          );
        })
        ;
      },
      
      // function that handles the sorting based on column and the slicing of data into pages for ease of view
      displayedData() {
        return this.jsonData.sort((a,b) => {
          const aValue=a[useSortingStore().getSortColumn];
          const bValue=b[useSortingStore().getSortColumn];
          // Handle different types: string vs. number
          if (typeof aValue !== typeof bValue) {
            if (useSortingStore().getSortOrder === 'asc') {
              return typeof aValue < typeof bValue ? -1 : 1;
            } 
            else if (useSortingStore().getSortOrder === 'desc') {
              return typeof aValue > typeof bValue ? -1 : 1;
            }
          }
          if (useSortingStore().getSortOrder === 'asc') {
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
          } else if ( useSortingStore().getSortOrder=== 'desc') {
            if (aValue > bValue) return -1;
            if (aValue < bValue) return 1;
          }
          return 0;
        }).slice(this.startIndex, this.startIndex + this.itemsPerPage)
        ;
      },
    },

    methods: {
      // import function from state file
      ...mapActions(useSortingStore, ["setSort", "getSortColumn", "getSortOrder"]),
      
      // functions for toggling between pages of datat in the applicaiton
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage * this.itemsPerPage < this.jsonData.length) {
          this.currentPage++;
        }
        
      },

      // functions that update on the client side user input values upon double clicking
      saveCores(index, newValue) {
        
        this.jsonData[index]["Cores"] = newValue;
        
      },
      saveLithography(index, newValue) {
        this.jsonData[index]["Lithography"] = newValue;
        
      },
      saveThreads(index, newValue) {
        this.jsonData[index]["Threads"] = newValue;
        
      },
      saveBaseFrequency(index, newValue) {
        this.jsonData[index]["Base_Freq"] = newValue;
        
      },
      saveMaxTurboFrequency(index, newValue) {
        this.jsonData[index]["Max_Turbo_Freq"] = newValue;
        
      },

      // function that handles contacting the backend to save the user-editted data into the datafile
      saveJsonFile(){
        axios
        .post('http://localhost:3000/api/data', this.jsonData)
        .then((response) => {
          console.log('Data saved:', response.data);
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
      },

      // function that handles coloring the rows of the table based on the Status
      rowClass() {
        
        return (status) => {
          const classMap = {
            'Launched': 'launched',
            'Discontinued': 'discontinued',
            'Announced': 'announced',
          };
          return classMap[status] || 'default';
        };
      },
    },
    
  };
  </script>
  
  <style scoped>
    .pagination {
      text-align: center;
      margin-top: 20px;
    }
    .pagination button {
      margin: 0 10px;
    }
    .launched {
      background-color: lightgreen;
    }

    .discontinued {
      background-color: lightcoral;
    }

    .announced {
      background-color: lightblue;
    }
    .default {
      background-color: lightgoldenrodyellow;
    }
  </style>