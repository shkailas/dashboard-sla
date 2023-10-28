<!--
  EditableEntry.vue

  Description:
  This Vue.js component provides a cell with editable content. It allows users to double-click on a cell to edit its value. The component supports input validation for different types of input, including numbers (integers and decimals), and enforces minimum values where applicable.

  Component Details:
  - Props:
    - value: The initial value for the editable cell.
    - inputType: The input type (default is 'text').
    - minValue: The minimum allowed value (default is 1).
    - isDecimal: Specifies whether the input accepts decimal numbers (default is false).

  Author: Shankar Kailas
-->

<template>
    <!-- makes an entry edittable on double click -->
    <td @dblclick="startEditing" ref="editableCell">
      <span v-if="!isEditing">{{ displayValue }}</span>
      <input
        ref="inputField"
        v-else
        v-model="editedValue"
        @blur="saveValue"
        :type="inputType"
        :min="minValue"
        
      />
    </td>
  </template>
  
  <script>
  export default {
    props: {
        value: {
            type: [ Number],
            required: true,
        },
        inputType: {
            type: String,
            default: 'text',
        },
        minValue: {
            type: Number,
            default: 1,
        },
        isDecimal: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        
      return {
        isEditing: false,
        editedValue: this.value,
      };
    },
    computed: {
      displayValue() {
        
        return this.value;
      },
    },
    methods: {
      // this function helps maintain focus on the element being editted so that it is easier to use and text boxes do not
      // remain after clicking away
      startEditing() {
        
        this.isEditing = true;
        this.$nextTick(() => {
        this.$refs.inputField.focus();
      });
        
      },

      // function that makes sure an appropriate input value is being set in the table depending on the column it belongs to
      saveValue() {
        
        const regex = /^-?(\d+(\.\d{1,2})?|\.\d{1,2})$/; // checking for positive numbers
        const containsANumber = regex.test(this.editedValue); // true if the number is a positive int, or decimal of up to 2 decimal places
        const intChecker= /^[1-9]\d*$/;
        
        if(this.editedValue == "N/A"){
            
            this.isEditing = false;
            this.$emit('input', this.editedValue);
        }
        // received a number
        else if(containsANumber && this.isDecimal && this.editedValue >= this.minValue){
            // this is an entry that accepts decimal inputs
            this.isEditing = false;
            this.editedValue = parseFloat(this.editedValue)
            this.$emit('input', this.editedValue);
        }
        else if(containsANumber && !this.isDecimal && intChecker.test(this.editedValue) && this.editedValue >= this.minValue){
            // this is an entry that only accepts integer values
            this.isEditing = false;
            this.editedValue = parseInt(this.editedValue)
            this.$emit('input', this.editedValue);
        }
        else{
            alert("This value is not acceptable.")
        }
      },
    },
  };
  </script>
  