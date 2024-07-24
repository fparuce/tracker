<template>
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <RouterView></RouterView>
        <BoxTracker v-if="listaVazia">Você não está muito produtivo hoje... T.T</BoxTracker>
        <TarefaTracker v-else v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaTracker from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxTracker from '../components/Box.vue';
import { useStore } from '@/store';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';


export default defineComponent({
    name: 'TarefasView',
    components: {
        FormularioTarefa,
        TarefaTracker,
        BoxTracker
    },
    computed: {
        listaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.commit(ADICIONA_TAREFA, tarefa);
        }
    },
    setup() {
        const store = useStore();
        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    }
});
</script>