<template>
    <!-- contact form inputs -->
    <div class="formcontainer">
      <form @submit.prevent="submitForm">
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" v-model="formData.name"><br>
        
        <label for="email">Email:</label><br>
        <input type="text" id="email" name="email" v-model="formData.email"><br>
        
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" rows="4" cols="50" v-model="formData.message"></textarea><br>
        
        <br>
        
        <!-- using v-if and v-for -->
        <h4>
            Where did you find me?
        </h4>
        <span>Selected: {{ selected_option }}</span>
        <br>
        <!-- Drop down example -->
        <select v-model="selected_option">
            <option disabled value="">Select</option>
            <option>Google</option>
            <option>Facebook</option>
            <option>Twitter</option>
            <option>LinkedIn</option>
            <option>Other</option>
        </select>
        <br>
        <!-- Radio button example -->
        <!-- <div v-for="option in options" :key="option.value">
            <input type="radio" 
            :id="option.value" 
            :value="option.value" v-model="formData.referralSource" />
            <label :for="option.value">{{ option.text }}</label>
            <br>
            
        </div> -->
        <br>
        <span> {{ formData.referralSource }}</span>
        <br>
        <input type="submit" value="Send">
        <input type="button" value="Reset" @click="resetForm">
        <!-- Display the success card when form is submitted -->
        <div v-if="submitted" class="success-card">
            Your email has been submitted. Thanks, and I will get back to you soon!
        </div>

        <!-- Display the reset notification -->
        <div v-if="resetAction" class="reset-notification">
            Form fields cleared.
        </div>
       
        
       
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
       
        return {
            formData: {
                name: '',
                email: '',
                message: '',
                subscribe: false
                 
            },
            submitted: false,  
            resetAction: false,  
            selected_option: " ",
            options: [
            { text: 'Brilliant', value: 'brilliant' },
            { text: 'Good', value: 'good' },
            { text: 'Alright', value: 'alright' },
            { text: 'Dodgy', value: 'dodgy' },
            { text: 'Crap', value: 'crap' }
        ],
            referralSource: ''
        };
    },
    methods: {
        
        resetForm() {
            this.formData = {
                name: '',
                email: '',
                message: '',
                subscribe: false
            };
            this.selected_option = "Use the dropdown to select an option";
            this.resetAction = true;
            setTimeout(() => {
                this.resetAction = false;  // Hide the reset message after some time (e.g., 3 seconds)
            }, 3000);
        },
        submitForm() {
        console.log("Form submitted with data:", this.formData);

        this.submitted = true;
            setTimeout(() => {
            this.submitted = false;
            }, 3000);
        },  
    }
}
  </script>
  
  <style scoped>

form  {
    margin: auto;
    width: 60%;
    padding: 20px;
    border: 0px solid #ccc;
    border-radius: 15px;
    font-family: 'Montserrat', sans-serif, Helvetica, Arial;
}

textarea {
    width: 90%;
    resize: vertical; 
}

input[type=text] {
    width: 90%;
    resize: vertical; 
}

input[type=submit], input[type=button] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
    margin-top: 10px;
}

@media (max-width: 768px) {
    form {
        width: 90%;
    }
}


.success-card {
padding: 10px;
background-color: #D4EDDA;
color: #155724;
border: 1px solid #C3E6CB;
margin: 10px 0;
border-radius: 4px;
}

.reset-notification {
    padding: 10px;
    background-color: #FFF3CD;
    color: #856404;
    border: 1px solid #FFEEBA;
    margin: 10px 0;
    border-radius: 4px;
}
  </style>