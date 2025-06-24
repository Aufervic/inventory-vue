<template>
    <aside class="bg-dark text-white vh-100 p-3" style="min-width: 250px;">
        <h4 class="text-center mb-4">Inventario</h4>
        <ul class="nav flex-column">
            <li class="nav-item">
                <router-link to="/" class="nav-link text-white" exact-active-class="active">
                    <i class="bi bi-house-door me-2"></i> Dashboard
                </router-link>
            </li>

            <!-- Equipos colapsable -->
            <li>
                <a class="nav-link text-white d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse" href="#submenuEquipos" role="button" aria-expanded="false"
                    aria-controls="submenuEquipos">
                    <span><i class="bi bi-laptop me-2"></i> Equipos</span>
                    <i class="bi bi-chevron-down"></i>
                </a>
                <div class="collapse ps-3" id="submenuEquipos">
                    <router-link to="/equipment" class="nav-link text-white" active-class="active">
                        <i class="bi bi-list-ul me-2"></i> Lista
                    </router-link>
                    <router-link to="/equipment/new" class="nav-link text-white" active-class="active">
                        <i class="bi bi-plus-circle me-2"></i> Añadir nuevo
                    </router-link>
                </div>
            </li>


            <!-- Movimientos colapsable -->
            <li class="mt-2">
                <a class="nav-link text-white d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    href="#submenuMovimientos"
                    role="button"
                    aria-expanded="false"
                    aria-controls="submenuMovimientos"
                    >
                    <span><i class="bi bi-arrow-left-right me-2"></i> Movimientos</span>
                    <i class="bi bi-chevron-down small"></i>
                </a>
                <div class="collapse ps-3" id="submenuMovimientos">
                    <router-link to="/movement" class="nav-link text-white" active-class="active">
                        <i class="bi bi-list me-2"></i> Lista
                    </router-link>
                    <router-link to="/movement/new" class="nav-link text-white" active-class="active">
                        <i class="bi bi-plus-circle me-2"></i> Añadir nuevo
                    </router-link>
                </div>
            </li>


            <!-- Estados colapsable -->
            <li class="mt-2">
                <a class="nav-link text-white d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    href="#submenuEstados"
                    role="button"
                    aria-expanded="false"
                    aria-controls="submenuEstados">
                    <span><i class="bi bi-check2-square me-2"></i> Estados</span>
                    <i class="bi bi-chevron-down small"></i>
                </a>
                <div class="collapse ps-3" id="submenuEstados">
                    <router-link to="/state" class="nav-link text-white" active-class="active">
                        <i class="bi bi-list me-2"></i> Lista
                    </router-link>
                    <router-link to="/state/new" class="nav-link text-white" active-class="active">
                        <i class="bi bi-plus-circle me-2"></i> Añadir nuevo
                    </router-link>
                </div>
            </li>


            <!-- Ubicaciones colapsable -->
            <li class="mt-2">
                <a class="nav-link text-white d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse"
                    href="#submenuUbicaciones"
                    role="button"
                    aria-expanded="false"
                    aria-controls="submenuUbicaciones">
                    <span><i class="bi bi-geo-alt me-2"></i> Ubicaciones</span>
                    <i class="bi bi-chevron-down small"></i>
                </a>
                <div class="collapse ps-3" id="submenuUbicaciones">
                    <router-link to="/ubication" class="nav-link text-white" active-class="active">
                        <i class="bi bi-list me-2"></i> Ver todas
                    </router-link>
                    <router-link to="/ubication/new" class="nav-link text-white" active-class="active">
                        <i class="bi bi-plus-circle me-2"></i> Añadir nuevo
                    </router-link>
                </div>
            </li>

        </ul>
    </aside>
</template>

<style scoped>
.nav-link.active {
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.1);
}
</style>