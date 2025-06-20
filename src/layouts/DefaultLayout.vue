<script setup>
import Sidebar from '@/components/Sidebar.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

</script>

<template>
    <div class="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper" class="flex-grow-1 d-flex flex-column">
            <NavBar />
            <main class="flex-grow-1 container-fluid py-3">
                <router-view />
            </main>
            <Footer />
        </div>
    </div>
</template>

<style scoped></style>