<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroTrack :tempoEmSegundos="tempoEmSegundos" />
        <BotaoFormulario @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />
        <BotaoFormulario @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CronometroTrack from './Cronometro.vue';
import BotaoFormulario from './BotaoFormulario.vue';

export default defineComponent({
    name: 'TemporizadorTrack',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        CronometroTrack,
        BotaoFormulario
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar() {
            this.cronometroRodando = true;
            this.cronometro = setInterval(() => { this.tempoEmSegundos += 1 }, 1000);
        },
        finalizar() {
            this.cronometroRodando = false;
            clearInterval(this.cronometro);
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    }
})
</script>
<style scoped>
.button {
    margin-left: 8px;
}
</style>