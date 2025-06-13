<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const data = ref([])

onMounted(() => {
    axios
        .get('http://127.0.0.1:8000/api/equipos/')
        .then(response => (data.value = response.data))
        .catch(error => console.log(error))
})

const post = () => {
    console.log("POST")
}

</script>

<template>
    <h1>Equipos</h1>
    <button @click="post">POST</button>
    <div class="container">
        <div v-for="equipo in data" class="patrimonio-card">
            <h2>Detalles de equipo</h2>

            <div class="info-group">
                <div class="info-item">
                    <strong>Código patrimonial</strong>
                    <span>{{ equipo.codigo_patrimonial }}</span>
                </div>
                <div class="info-item">
                    <strong>Número de serie</strong>
                    <span>{{ equipo.numero_serie }}</span>
                </div>
            </div>

            <div class="info-group">
                <div class="info-item">
                    <strong>Marca</strong>
                    <span>{{ equipo.marca }}</span>
                </div>
                <div class="info-item">
                    <strong>Modelo</strong>
                    <span>{{ equipo.modelo }}</span>
                </div>
            </div>

            <div class="info-group">
                <div class="info-item">
                    <strong>Fecha de Alta</strong>
                    <span>{{ equipo.fecha_alta }}</span>
                </div>
                <div class="info-item">
                    <strong>Fecha de Compra</strong>
                    <span>{{ equipo.fecha_compra }}</span>
                </div>
            </div>

            <div class="info-group">
                <div class="info-item">
                    <strong>Número O/C</strong>
                    <span>{{ equipo.numero_o_c }}</span>
                </div>
                <div class="info-item">
                    <strong>Número NEA</strong>
                    <span>{{ equipo.numero_nea }}</span>
                </div>
            </div>

            <div class="info-group">
                <div class="info-item">
                    <strong>Centro de Costos</strong>
                    <span>{{ equipo.centro_costos }}</span>
                </div>
                <div class="info-item">
                    <strong>Tipo de ingreso</strong>
                    <span>{{ equipo.tipo_ingreso }}</span>
                </div>
            </div>

            <div class="info-group">
                <div class="info-item estado-item estado-activo">
                    <strong>Estado</strong>
                    <span>{{ equipo.estado }}</span>
                </div>
                <div class="info-item">
                    <strong>Ubicación</strong>
                    <span>{{ equipo.ubicacion }}</span>
                </div>
            </div>
        </div>
    </div>



</template>


<style scoped>
.container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: '#4f7f6';
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
}

.patrimonio-card {
    background-color: '#ffffff';
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
    margin: 10px;
    padding: 30px;
    box-sizing: border-box;
    border-left: 8px solid #28a745;
    position: relative;
    overflow: hidden;
}

.patrimonio-card h2 {
    font-size: 1.8em;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
}

.patrimonio-card h2::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: #28a745;
    margin: 10px auto 0;
    border-radius: 2px;
}

.info-group {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.info-item {
    flex: 1 1 calc(50% - 20px);
    /*columna */
    margin-bottom: 15px;
    padding: 0 10px;
    box-sizing: border-box;
}

.info-item:nth-child(odd) {
    padding-left: 0;
}

.info-item:nth-child(even) {
    padding-right: 0;
}


.info-item strong {
    display: block;
    color: #555;
    font-size: 0.9em;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.info-item span {
    color: #1a1a1a;
    font-size: 1.1em;
    font-weight: 600;
}

.estado-item span {
    padding: 5px 12px;
    border-radius: 20px;
    font-weight: bold;
    display: inline-block;
    margin-top: 5px;
}

.estado-activo span {
    background-color: #e6ffed;
    color: #28a745;
}

.estado-baja span {
    background-color: #ffebe6;
    color: #dc3545;
}

.estado-mantenimiento span {
    background-color: #fff3e6;
    color: #ffc107;
}
</style>