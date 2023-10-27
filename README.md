# dashboard

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
### Progress

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