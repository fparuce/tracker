<template>
    <BoxTracker>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || 'Tarefa sem descrição'}}
            </div>
            <div class="column">
                <CronometroTrack :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </BoxTracker>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CronometroTrack from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxTracker from './Box.vue';


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
    }

});
</script>

