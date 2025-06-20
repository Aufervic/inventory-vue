<template>
    <aside class="bg-dark text-white vh-100 p-3" style="min-width: 250px;">
        <h4 class="text-center mb-4">Inventario</h4>
        <ul class="nav flex-column">
            <li class="nav-item">
                <router-link to="/" class="nav-link text-white">
                    <i class="bi bi-house-door me-2"></i> Dashboard
                </router-link>
            </li>

            <!-- Equipos colapsable -->
            <li>
                <a class="nav-link text-white d-flex justify-content-between align-items-center"
                    data-bs-toggle="collapse" href="#equiposSubmenu" role="button" aria-expanded="false"
                    aria-controls="equiposSubmenu">
                    <span><i class="bi bi-laptop me-2"></i> Equipos</span>
                    <i class="bi bi-chevron-down"></i>
                </a>
                <div class="collapse ps-3" id="equiposSubmenu">
                    <router-link to="/equipment" class="nav-link text-white">
                        <i class="bi bi-list-ul me-2"></i> Lista
                    </router-link>
                    <router-link to="/equipment/create" class="nav-link text-white">
                        <i class="bi bi-plus-circle me-2"></i> Añadir nuevo
                    </router-link>
                </div>
            </li>
        </ul>
    </aside>
</template>
