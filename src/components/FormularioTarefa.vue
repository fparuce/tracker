<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TemporizadorTrack @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import TemporizadorTrack from './Temporizador.vue';
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';

import { key } from '@/store';


export default defineComponent({
    name: 'FormularioTarefa',
    components: {
        TemporizadorTrack
    },
    emitis: ['aoSalvarTarefa'],
    setup(props, contexto) {
        const store = useStore(key);
        const projetos = computed(() => store.state.projeto.projetos);

        const descricao = ref("");
        const idProjeto = ref("");

        const finalizarTarefa = (tempoDecorrido: number): void => {
            const projeto = projetos.value.find(p => p.id == idProjeto.value);
            if(!projeto){
                store.commit(NOTIFICAR, {
                    titulo: 'Ops!',
                    texto: "Selecione um projeto antes de finalizar a tarefa!",
                    tipo: TipoNotificacao.FALHA,
                });
                return;
            }
            contexto.emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projeto
            });
            descricao.value = '';
        }
        return {
            projetos: computed(() => store.state.projeto.projetos),
            descricao,
            idProjeto,
            finalizarTarefa
        }
    }
})
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>