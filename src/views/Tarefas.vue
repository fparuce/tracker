<template>
    <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <RouterView></RouterView>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Filtro" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <BoxTracker v-if="listaVazia">Você não está muito produtivo hoje... T.T</BoxTracker>
        <TarefaTracker v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaTracker from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxTracker from '../components/Box.vue';
import { useStore } from '@/store';
import { CADASTRAR_TAREFA, OBTER_TAREFAS, OBTER_PROJETOS } from '@/store/tipo-acoes';


export default defineComponent({
    name: 'TarefasView',
    components: {
        FormularioTarefa,
        TarefaTracker,
        BoxTracker
    },
    computed: {
        listaVazia(): boolean {
            return this.tarefas.length == 0;
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa);
        }
    },
    setup() {
        const store = useStore();


        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        const filtro = ref("")

        // const tarefas = computed(() => store.state.tarefa.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)));

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })
        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
        }
    }
});
</script>