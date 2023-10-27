<!-- EditableEntry.vue -->
<template>
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
        //console.log("data Editable:", typeof(this.value))
      return {
        isEditing: false,
        editedValue: this.value,
      };
    },
    computed: {
      displayValue() {
        // Customize how the value is displayed if needed
        return this.value;
      },
    },
    methods: {
      startEditing() {
        
        this.isEditing = true;
        this.$nextTick(() => {
        this.$refs.inputField.focus();
      });
        
      },
      saveValue() {
        //console.log("entered")

        // handle decimal fields
        const regex = /^-?(\d+(\.\d{1,2})?|\.\d{1,2})$/; // checking for positive numbers
        const containsANumber = regex.test(this.editedValue); // true if the number is a positive int, or decimal of up to 2 decimal places

        const intChecker= /^[1-9]\d*$/;
        const isInt = intChecker.test(this.editedValue);
        console.log("is 2 an int?", intChecker.test("2"))

        console.log(containsANumber, this.isDecimal, isInt, this.editedValue)
        if(this.editedValue == "N/A"){
            console.log("N/A")
            this.isEditing = false;
            this.$emit('input', this.editedValue);
        }

        // received a number
        else if(containsANumber && this.isDecimal && this.editedValue >= this.minValue){
            // this is an entry that accepts decimal inputs
            console.log("decimal")
            this.isEditing = false;
            this.editedValue = parseFloat(this.editedValue)
            this.$emit('input', this.editedValue);
    
        }
        
        else if(containsANumber && !this.isDecimal && intChecker.test(this.editedValue) && this.editedValue >= this.minValue){
            this.isEditing = false;
            console.log("integer")
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
  