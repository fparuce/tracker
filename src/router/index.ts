import Tarefas from "@/views/Tarefas.vue";
import Projetos from "@/views/Projetos.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Formulario from "@/views/Projetos/Formulario.vue";
import Lista from "@/views/Projetos/Lista.vue";
import AtualizaTarefa from "@/views/AtualizaTarefa.vue";

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas,
        children: [
            {
                path: 'tarefa/:id',
                name: 'Editar Tarefa',
                component: AtualizaTarefa,
                props: true
            }
        ]
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: Formulario
            },
            {
                path: ':id',
                name: 'Editar projeto',
                component: Formulario,
                props: true
            }
        ]
    }
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;