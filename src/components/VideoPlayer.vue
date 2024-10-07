<script setup>
</script>

<template>
  <div class="video">
    <div class="video-wrapper">
      <video autoplay loop muted>
        <source src="../movie.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<style scoped>
.video {
  width: 100%;
  max-height: 250px;
  overflow: hidden;
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
}

.video video {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover; 
  transform: translateY(-25%);
}

</style>