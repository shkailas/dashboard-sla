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
          <tr v-for="item in sortedData" :key="item.id">
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
    </div>
  </template>
  
  <script>
  import userData from '../assets/data.json'
  export default {
    data() {
      // console.log(userData)
      return {
        jsonData: userData, // Load your JSON data here
      };
    },
    computed: {
      sortedData() {
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
        console.log(allData)
        return allData
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