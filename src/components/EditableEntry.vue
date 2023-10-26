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
        if (this.editedValue >= this.minValue) {
            this.isEditing = false;
            //console.log(this.editedValue)
            this.$emit('input', this.editedValue);
          
        }
        else{
            alert("This value is not acceptable.")
        }
      },
    },
  };
  </script>
  