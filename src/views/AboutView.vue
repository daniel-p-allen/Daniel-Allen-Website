<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="about-card">
    <!-- Top band: avatar + heading -->
    <div class="card-title">
      <img
        class="avatar"
        src="../assets/dan.jpeg"
        alt="Photo of Daniel Allen"
      />
      <div class="title-text-content">
        <h2 class="welcome-headline">
          A bit of Info?
        </h2>
      </div>
    </div>

    <!-- Callout box with portfolio link -->
    <div class="intro-box">
      <p>
        You can explore project details, tech choices and in-progress work here:
        <RouterLink to="/portfolio" class="portfolio-link">View the portfolio →</RouterLink>
      </p>
    </div>

    <!-- Main about content -->
    <div class="card-content">
      <p class="intro-text">
        I’m a recently upskilled software application graduate / developer with a practical, full-stack mindset built from years of experience in business, marketing, and user-focused design. My approach to development is grounded in how technology is actually used — shaped by time spent managing real systems, workflows, and customer-facing projects. I’ve worked with tools like AWS and Salesforce and bring an understanding of user experience, data, and process design that complements my growing technical depth. I’m continuing to develop as a coder, but my strength lies in bridging business insight with development — turning concepts into solutions that make sense for users and organisations alike.
      </p>
    </div>
  </div>
</template>

