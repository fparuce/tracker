<template>
    <section>
        <form @submit.prevent="atualiza">
            <div class="field">
                <label for="descricaoDaTarefa" class="label">
                    Tarefa
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
            <div class="field">
                <button class="button" type="submit">Atualizar Tarefa</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { ATUALIZA_TAREFA } from '@/store/tipo-mutacoes';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: 'AtualizaTarefa',
    props: {
        id: {
            type: String
        }
    },
    mounted() {

        const tarefa = this.store.state.tarefas.find(task => task.id === this.id)
        if (tarefa) {
            this.tarefa = tarefa
        }
    },
    data() {
        return {
            tarefa: {} as ITarefa,
            idProjeto: ''
        }
    },
    methods: {
        atualiza() {
            this.tarefa.projeto = this.projetos.find(proj => proj.id === this.idProjeto)
            this.store.commit(ATUALIZA_TAREFA, this.tarefa)
            this.$router.push('/');
        }
    },
    setup() {
        const store = useStore();
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }

});
</script>
