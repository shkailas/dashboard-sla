<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Cores</th>
            <th>Product</th>
            <th>Lithography</th>
            <th>Threads</th>
            <th>Base Frequency</th>
            <th>Max Turbo Frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in displayedData" :key="item.id">
            <td>{{ item["Status"] }}</td>
            <td>{{ item["Cores"] }}</td>
            <td>{{ item["Product"] }}</td>
            <td>{{ item["Lithography"] }}</td>
            <td>{{ item['Threads'] }}</td>
            <td>{{ item["Base_Freq"] }}</td>
            <td>{{ item["Max_Turbo_Freq"] }}</td>
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
  export default {
    data() {
      // console.log(userData)
      return {
        jsonData: userData, // Load your JSON data here
        currentPage: 1,
        itemsPerPage: 100,
      };
    },
    computed: {

      sortedData() {
        
      },
      // Calculate the index of the first item to be displayed on the current page
      startIndex() {
        return (this.currentPage - 1) * this.itemsPerPage;
      },
      // Slice the data to display only items for the current page
      displayedData() {
        // Sort and group your data based on your requirements
        // You can use JavaScript to achieve this // Separate the data by status: "done", "not done", "in progress"
        const LaunchedData = this.jsonData.filter((item) => item["Status"] === "Launched");
        const DiscontinuedData = this.jsonData.filter((item) => item["Status"] === "Discontinued");
        const LaunchedWithIPUData = this.jsonData.filter((item) => item["Status"] === "Launched (with IPU)");
        const AnnouncedData = this.jsonData.filter((item) => item["Status"] === "Announced");
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
        //console.log(allData)
        //return allData
        return allData.slice(this.startIndex, this.startIndex + this.itemsPerPage);
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