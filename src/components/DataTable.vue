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
            <th>index</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in displayedData" :key="item.id">
            <td>{{ item["Status"] }}</td>
            <!-- <td>{{ item["Cores"] }}</td> -->
            <!-- <td @click="startEditing(index)">
              <span v-if="!isEditing(index)">{{ item["Cores"] }}</span>
              <input
                v-else
                v-model.number="editedCores"
                @blur="saveCores(index)"
                type="number"
                min="1"
              />
            </td> -->
            <EditableEntry
              :value="item['Cores']"
              @input="saveCores(index, $event)"
            ></EditableEntry>

            <td>{{ item["Product"] }}</td>

            <EditableEntry
              :value="item['Lithography']"
              @input="saveLithography(index, $event)"
            ></EditableEntry>

            
            <td>{{ item["Lithography"] }}</td>
            <td>{{ item['Threads'] }}</td>
            <td>{{ item["Base_Freq"] }}</td>
            <td>{{ item["Max_Turbo_Freq"] }}</td>
            <td>{{ index }}</td>
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
  import userData from '../assets/data.json'
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
      // startEditing(index) {
      //   this.editingIndex = index;
      //   this.editedCores = this.jsonData[index]["Cores"];
      // },
      // isEditing(index) {
      //   return this.editingIndex === index;
      // },
      // saveCores(index) {
      //   if (this.editedCores >= 1) {
      //     this.jsonData[index]["Cores"] = this.editedCores;
      //     this.editingIndex = -1;
      //   } else {
      //     //
      //     alert("This input needs to be a positive integer")
      //   }
      // },
      saveCores(index, newValue) {
        // Update the 'Cores' value in the 'jsonData' array
        this.jsonData[index]["Cores"] = parseInt(newValue);
        //console.log(this.jsonData)
      },
      saveLithography(index, newValue) {
        this.jsonData[index]["Lithography"] = parseInt(newValue);
        //console.log(this.jsonData)
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
  </style>