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
      BA(IT) T2 Starter of 2023
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -5px;
}

h3 {
  font-size: 1.6rem;
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  font-weight: 200;
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
