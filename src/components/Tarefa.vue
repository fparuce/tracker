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
import { REMOVER_TAREFA } from '@/store/tipo-acoes';


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
    setup() {
        const store = useStore();

        const excluir = (id: string) => {
            store.dispatch(REMOVER_TAREFA, id)
        }
        return {
            projetos: computed(() => store.state.projeto.projetos),
            excluir
        }
    }

});
</script>