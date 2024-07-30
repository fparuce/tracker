<template>
    <section>
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editar Tarefa</p>
                    <button @click="fecharModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição
                        </label>
                        <input type="text" class="input" v-model="tarefa.descricao" id="descricaoDaTarefa" />
                        <div class="select">
                            <select v-model="idProjeto">
                                <option value="">Selecione o projeto</option>
                                <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                                    {{ projeto.nome }}
                                </option>
                            </select>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                        <button @click="atualizar" class="button is-success">Salvar</button>
                        <button @click="fecharModal" class="button">Cancelar</button>
                    </div>
                </footer>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: 'AtualizaTarefa',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        const tarefa = this.store.state.tarefa.tarefas.find(task => task.id === this.id)
        if (tarefa) {
            this.tarefa = tarefa;
            if (tarefa.projeto){
                this.idProjeto = tarefa.projeto.id;
            }
        }
    },
    data() {
        return {
            tarefa: {} as ITarefa,
            idProjeto: '',
        }
    },
    methods: {
        atualizar() {
            this.tarefa.projeto = this.projetos.find(proj => proj.id === this.idProjeto)
            this.store.dispatch(ALTERAR_TAREFA, this.tarefa)
            this.$router.push('/');
        },
        fecharModal() {
            this.$router.push('/');
        }
    },
    setup() {
        const store = useStore();
        return {
            store,
            projetos: computed(() => store.state.projeto.projetos)
        }
    }

});
</script>
