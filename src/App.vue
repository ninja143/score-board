<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-dark bg-dark navbar-expand-lg " data-bs-theme="dark">
        <div class="container">
          <RouterLink class="navbar-brand" to="#">Leaver Board</RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse float-end" id="navbarSupportedContent">
            
            <ul class="navbar-nav me-auto mb-2">
              <li class="nav-item float-end">
                <RouterLink class="nav-link" to="/">Dashboard</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
<script>
export default {
    name: 'App',
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = to.meta.title || VITE_APP_TITLE;
            }
        },
    }
};
</script>
