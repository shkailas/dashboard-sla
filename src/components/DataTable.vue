<template>
    <div>
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
          
          <tr v-for="(item, index) in displayedData" :key="item.id" >
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
    </div>
  </template>
  
  <script>
  import userData from '../../server/data/data.json'
  import EditableEntry from './EditableEntry.vue'
  export default {
    components:{
      EditableEntry,
    },
    data() {
      // console.log(userData)
      // Sort and group your data based on your requirements
      // You can use JavaScript to achieve this // Separate the data by status: "done", "not done", "in progress"
      const LaunchedData = userData.filter((item) => item["Status"] === "Launched");
      const DiscontinuedData = userData.filter((item) => item["Status"] === "Discontinued");
      const LaunchedWithIPUData = userData.filter((item) => item["Status"] === "Launched (with IPU)");
      const AnnouncedData = userData.filter((item) => item["Status"] === "Announced");
      // console.log(LaunchedData)
      // Sort each group by cores and then by lithography
      const sortByCoresAndLithography = (a, b) => {
        if (a["Cores"] === b["Cores"]) {
          return a["Lithography"] - b["Lithography"];
        }
        return a["Cores"] - b["Cores"];
      };

      LaunchedData.sort(sortByCoresAndLithography);
      DiscontinuedData.sort(sortByCoresAndLithography);
      LaunchedWithIPUData.sort(sortByCoresAndLithography);
      AnnouncedData.sort(sortByCoresAndLithography);

      // Concatenate the groups in the desired order
      const allData = LaunchedData.concat(DiscontinuedData, LaunchedWithIPUData, AnnouncedData);
      console.log(allData)
      return {
        jsonData: allData, // Load your JSON data here
        currentPage: 1,
        itemsPerPage: 100,
        // editingIndex: -1,
        // editedCores: null,

      };
    },
    computed: {
      // Calculate the index of the first item to be displayed on the current page
      startIndex() {
        return (this.currentPage - 1) * this.itemsPerPage;
      },
      // Slice the data to display only items for the current page
      displayedData() {
        
        //console.log(allData)
        //return allData
        return this.jsonData.slice(this.startIndex, this.startIndex + this.itemsPerPage);
      },
    },
    methods: {
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