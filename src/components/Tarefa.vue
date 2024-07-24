<template>
    <BoxTracker>
        <div class="columns">
            <div class="column is-5">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3"> {{ tarefa.projeto?.nome || 'Tarefa sem projeto' }}</div>
            <div class="column">
                <CronometroTrack :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
            <RouterLink :to="`/tarefa/${tarefa.id}`" class="button">
                <span class="icon is-small">
                    <i class="fas fa-pencil-alt"></i>
                </span>
            </RouterLink>
            <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
                <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                </span>
            </button>
        </div>
    </BoxTracker>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import CronometroTrack from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxTracker from './Box.vue';
import { useStore } from '@/store';
import { REMOVE_TAREFA } from '@/store/tipo-mutacoes';


export default defineComponent({
    name: 'TarefaTracker',
    components: {
        CronometroTrack,
        BoxTracker
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        excluir(id: string) {
            this.store.commit(REMOVE_TAREFA, id)
        }
    },
    setup() {
        const store = useStore();
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }

});
</script>
