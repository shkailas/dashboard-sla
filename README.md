# Processor Table Editting Dashboard

## Progress (Brief)
The following tasks have been completed:

1. The application was written using Vue 3 options api
2. The primary components were a table component and and edittable entry component. 
3. Numerical cells can be editted by double clicking on them. Only appropriate numerical inputs (or "N/A") will be allowed for inputs by the user.
4. A Save button was implemented to allow for the client to save their edits to the data file.
5. A Express.js backend was implemented to handle the data file manipulations and service.
6. Pagination was implemented to limit the number of entries per page to 100 entries. This makes is easier to comb thorough data.
7. Color Coding was implemented to make it easier to see quickly the differing statuses of different processor entries.
8. Implemented multiple search fields to allow the user to filter based on different columns at the same time. Can be done by typing in the search boxes.
9. Implemented client-side sorting to allow the user to sort the data based on a specific column. This can be done by clicking on the column header.
10. Used Pinia State management to demonstrate proficiency with it and to handle the client side sorting.

## Additional Decisions
1. options API was elected due to greater familiarity and due to the simplicity and straightforwardness of the task.
2. Users are allowed to enter "N/A" into entries in case they do not know the true value or they want to flag that value.
3. During sortng, it was chosen that "N/A" entries are "larger" than numerical entries.
4. multiple text filters were implemented so that more filters could be applied at once, instead of a single search filter.
5. Express JS server was elected for the backend since it is a JS framework like Vue and due to familiarity. Other considerations included spring boot and django.
6. Made a EditableEntry component because that logic was used multiple times, and made the code adhere to single-funcitonality principles more.
7. There were times when slightly more code was written (i.e. the save functions) that could be considered redundant. However, this was done for clearer understanding and for easier traceability to improve debugging and development speed. 
8. Initial challenges were with refamiliarizing myself wtih Vue programming, but that was quickly overcome.
9. Additional Challenges primarily arose with time and being able to work during a midterm week, however, all basic tasks and the bonus tasks were attempted and completed.

## Future Works
Due to my school schedule this week, I was unable to complete all of my desired refatorings, some of which included the following:

1. implementing filtering using state
2. When saving data, currently, it is saved by discarding the old data file and replacing it with a new one, which has unnecessary overhead. This could be ameliorated by only editting the entries that have been modified.
3. Further styling. This was not a high priority, but something that does mean a lot in a final product. Functionality was heabily prioritized.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Running the Application](#running-the-application)
4. [Production Build](#production-build)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. If not, you can download and install them from the [official Node.js website](https://nodejs.org/).

## Setup Instructions

To set up the project, follow these steps:

1. Clone this repository to your local machine using `git clone` or download the ZIP file.

```bash
git clone https://github.com/your-username/your-repo.git
```
2. Navigate to the project directory
```
npm install
```

## Running the Application

To run the application, follow these steps:

1. Start the backend server (runs on port 3000). Run the following command:
```bash
node ./server/server.js
```
2. Start the frontend development server (for development purposes). Run the following command:
```
npm run start
```
3. Access the application in your web browser.

## Production Build

To create a production-ready build with compilation and minification, run the following command:
```
npm run build
```
This command will generate optimized production files in the dist directory.


## Progress (Detailed Version)

#### 10/25
 Set up the intial table to display all of the data. Loading all data from a JSON file. Created a DataTable Component

#### 10/25
 implemented task 3 (pagination) so that 10 rows are shown per page for better user experience. The order of the data is maintained.
 
#### 10/25
 implemented task 2 part d (allowing users to double-click to input data). Only implemented on the cores column. Filter on tolerated values and save functionality have not been implemented yet.

#### 10/25
 implemented task 2 part d (allowing users to double-click to input data). Wrote component version of edittable fields to adhere more to single functionality componenets. Only implemented on the cores column. save functionality have not been implemented yet. The cores field must be an integer greater than 1. If it is a decimal greater than 1, then truncate the decimal. Otherwise, alert the user.

 #### 10/25
fixed focusing issue so that when double clicked, the input field remains focused

#### 10/26
added different colors to the table so that items with different status values have different colors

#### 10/27
finalized funtionality for changing elements in the table. Implemented all of the logic for inputs. Decided to limit the user to only inputting values that are appropriate for each field (i.e. for the integer fields, only positive integers are excepted). Otherwise an alert pops up, not allowing the user to move forward until an appropriate value is filled.
Left the user the option to use "N/A" to input into a field in case the user does not know the true value and does not want to leave the table empty (or wants it flagged that the value is empty).
Did not allow user to edit the status column, since instructions only permitted inputs that were numerical.
Also made the styling for the colors of the row more friendly by making the style classes conditional with a reusable funciton.

#### 10/27
Added small express server to handle json file reads and writes. reads implemented as a get. post for file saving yet to be modified.


#### 10/27
Implemented Save functionality in server by deleting old file and creating new data file with new data. Implemented the button in Vue so that saving can be done by users. Data is now read into Vue as a call to the server, rather than from file read.
This Marks the conclusion of implementing the functionality of the required Tasks:refactor and enhancement, adding functionality, pagination, color coding.


#### 10/27
Developed a search feature which allows the user to filter for entries. There are search filters for each column of table. If the search bar is empty, the filtering will be inactive. Otherwise, if the search is for the Product Name, then it will filter based on if the input string is part of the product name. If teh search is for a numerical field, it must match exactly.


#### 10/27
To implement the Bonus tasks client side sorting, I utilized pinia state management to tackle this issue. I wrote a store for which column should be sorted on and in what order (asc/desc). I then created the funcionality to click on the table header so that the clicked column would be the one that was sorted on. Clicking on it once sorts in ascending order. clicking again will set it to descening order. I opted to have the "N/A" values be considered "greater" than numerical values.


#### 10/27
Cleaning up code repository of files and components that were autogenerated when I first created this repository.
Removing debug code.
finalize commenting in code to help understanding for future readers