<script setup>
// Props 
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      A minimalist online location to provide coding examples.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 1.5; 
  margin-bottom: 0.2rem;
  position: relative;
  top: -3px;
}

h3 {
  font-size: 1.3rem;
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  font-weight: 200;
  line-height: 1.22;
  margin-top: 0;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
