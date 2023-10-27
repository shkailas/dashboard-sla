<template>
    <div>
      <input v-model="searchQueryCores" placeholder="Search Cores" />
      <input v-model="searchQueryProduct" placeholder="Search Product" />
      
      <input v-model="searchQueryLithography" placeholder="Search Lithography" />
      <input v-model="searchQueryThreads" placeholder="Search Threads" />
      <input v-model="searchQueryBaseFrequency" placeholder="Search Base Frequency" />
      <input v-model="searchQueryMaxTurboFrequency" placeholder="Search Max Turbo Frequency" />
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Cores</th>
            <th>Product</th>
            <th>Lithography (nm)</th>
            <th>Threads</th>
            <th>Base Frequency (GHz)</th>
            <th>Max Turbo Frequency (GHz)</th>
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

            <!-- <td :class="rowClass()(item.Status)" >{{ item["Max_Turbo_Freq"] }}</td> -->
            <EditableEntry
              :value="item['Max_Turbo_Freq']"
              @input="saveMaxTurboFrequency(index, $event)"
              :class="rowClass()(item.Status)" 
              :minValue=0
              :isDecimal=true
            ></EditableEntry>
            <!-- <td :class="rowClass()(item.Status)" >{{ index }}</td> -->
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage * itemsPerPage >= jsonData.length">Next</button>
      </div>
      <button @click="saveJsonFile">Click Me to Save</button>
    </div>
  </template>
  
  <script>
  
  import EditableEntry from './EditableEntry.vue'
  import axios from 'axios'
  export default {
    components:{
      EditableEntry,
    },
    data() {
      return {
        jsonData: [], // Load your JSON data here
        currentPage: 1,
        itemsPerPage: 100,
        // editingIndex: -1,
        // editedCores: null,
        searchQueryProduct: '', 
        searchQueryCores: '', 
        searchQueryLithography: '', 
        searchQueryThreads: '', 
        searchQueryBaseFrequency: '', 
        searchQueryMaxTurboFrequency: '', 


      };
    },
    created(){      
      axios.get('http://localhost:3000/api/data') 
      .then(response => {
        this.jsonData = response.data;
        
        this.processData();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
    },  

      
    
    computed: {
      // Calculate the index of the first item to be displayed on the current page
      startIndex() {
        return (this.currentPage - 1) * this.itemsPerPage;
      },
      filteredData() {
        return this.displayedData.filter(item => {

          return (
            (this.searchQueryProduct === '' || item.Product.toLowerCase().includes(this.searchQueryProduct.toLowerCase())) &&
            (this.searchQueryBaseFrequency === '' || parseFloat(this.searchQueryBaseFrequency) == item.Base_Freq) &&
            (this.searchQueryMaxTurboFrequency === '' || parseFloat(this.searchQueryMaxTurboFrequency) == item.Max_Turbo_Freq) &&
            (this.searchQueryLithography === '' || parseFloat(this.searchQueryLithography) == item.Lithography) &&
            (this.searchQueryThreads === '' || parseFloat(this.searchQueryThreads) == item.Threads) &&
            (this.searchQueryCores === '' || parseFloat(this.searchQueryCores) == item.Cores)
          );
        });
      },
      // Slice the data to display only items for the current page
      displayedData() {
        
        
        return this.jsonData.slice(this.startIndex, this.startIndex + this.itemsPerPage);
      },
    },
    methods: {
      processData(){
        const LaunchedData = this.jsonData.filter((item) => item["Status"] === "Launched");
        const DiscontinuedData = this.jsonData.filter((item) => item["Status"] === "Discontinued");
        const LaunchedWithIPUData = this.jsonData.filter((item) => item["Status"] === "Launched (with IPU)");
        const AnnouncedData = this.jsonData.filter((item) => item["Status"] === "Announced");
        
        // Sort each group by cores and then by lithography
        const sortByCoresAndLithography = (a, b) => {
          if (a["Cores"] === b["Cores"]) {
            return a["Lithography"] - b["Lithography"];
          }
          return a["Cores"] - b["Cores"];
        };

        LaunchedData.sort(sortByCoresAndLithography);
        console.log(LaunchedData)
        DiscontinuedData.sort(sortByCoresAndLithography);
        LaunchedWithIPUData.sort(sortByCoresAndLithography);
        AnnouncedData.sort(sortByCoresAndLithography);

        // Concatenate the groups in the desired order
        this.jsonData = LaunchedData.concat(DiscontinuedData, LaunchedWithIPUData, AnnouncedData);
        //console.log(allData)
      },
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

      saveCores(index, newValue) {
        // Update the 'Cores' value in the 'jsonData' array
        this.jsonData[index]["Cores"] = newValue;
        console.log(this.jsonData)
      },
      saveLithography(index, newValue) {
        this.jsonData[index]["Lithography"] = newValue;
        //console.log(this.jsonData)
      },
      saveThreads(index, newValue) {
        this.jsonData[index]["Threads"] = newValue;
        //console.log(this.jsonData)
      },
      saveBaseFrequency(index, newValue) {
        this.jsonData[index]["Base_Freq"] = newValue;
        //console.log(this.jsonData)
      },
      saveMaxTurboFrequency(index, newValue) {
        this.jsonData[index]["Max_Turbo_Freq"] = newValue;
        //console.log(this.jsonData)
      },
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
      rowClass() {
        //console.log("rowClass")
        return (status) => {
          const classMap = {
            'Launched': 'launched',
            'Discontinued': 'discontinued',
            'Announced': 'announced',
          };
          //console.log(classMap[status] || '')
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
      /* color: white; */
      /* Add any other styling you want for "launched" items */
    }

    .discontinued {
      background-color: lightcoral;
      /* Add any other styling you want for "Discontinued" items */
    }

    .announced {
      background-color: lightblue;
      /* Add any other styling you want for "Announced" items */
    }
    .default {
      background-color: lightgoldenrodyellow;
      /* Add any other styling you want for "Announced" items */
    }
  </style>