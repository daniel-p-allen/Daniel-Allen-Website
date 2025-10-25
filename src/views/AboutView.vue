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
        <div class="welcome-headline">
          A bit of Info?
        </div>
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

<style scoped>
.about-card {
  background: #333;
  color: white;
  border-radius: 10px;
  padding: 2em;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 4rem auto;
  border: 1px solid rgba(255,255,255,0.15);
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  line-height: 1.5;
}

/* top band */
.card-title {
  background: #222;
  border-radius: 20px;
  padding: 1em 1.5em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
}

.avatar {
  height: 150px;
  width: 150px;
  border-radius: 30%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
  margin-right: 1.5rem;
  object-fit: cover;
}

.title-text-content {
  flex: 1 1 300px;
  min-width: 250px;
  color: #fff;
}

.welcome-headline {
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  color: #fff;
  text-align: left;
}

/* callout box */
.intro-box {
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  margin: 2rem auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  max-width: 900px;
  width: 100%;
  text-align: center;
}

.intro-box p {
  margin: 0;
  color: #f0f0f0;
  font-size: 1.15rem;
  line-height: 1.5;
}

.portfolio-link {
  color: rgb(72, 171, 242);
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
}

.portfolio-link:hover {
  text-decoration: underline;
}

/* main body content */
.card-content {
  font-family: 'Montserrat', sans-serif, Helvetica, Arial;
  color: #fff;
}

.intro-text {
  line-height: 1.5;
  font-size: 1.15rem;
  font-weight: 300;
  color: rgb(230,230,230);
  margin: 2rem 0;
}

/* links (if you add any more later) */
a {
  color: white;
  text-decoration: none;
  font-size: 1.05rem;
  line-height: 1.6;
}

a:hover {
  text-decoration: underline;
  font-size: 1.1rem;
}

/* responsive */
@media screen and (max-width: 600px) {
  .about-card {
    padding: 1em;
  }

  .card-title {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .avatar {
    height: 130px;
    width: 130px;
    margin: 0 0 1rem 0;
  }

  .welcome-headline {
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .intro-box {
    margin: 1.5rem 0 2rem 0;
    padding: 1rem 1rem;
  }

  .intro-box p {
    font-size: 1rem;
    line-height: 1.4;
  }

  .intro-text {
    font-size: 1rem;
    line-height: 1.45;
    margin: 1.5rem 0;
  }
}
</style>
