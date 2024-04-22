const gerenciadorAlunos = {
    alunos: [],

    adicionarAluno(matricula, nome, idade, genero) {
        this.alunos.push({ matricula, nome, idade, genero });
        this.renderAlunos();
    },

    atualizarAluno(index, matricula, nome, idade, genero) {
        this.alunos[index] = { matricula, nome, idade, genero };
        this.renderAlunos();
    },

    excluirAluno(index) {
        this.alunos.splice(index, 1);
        this.renderAlunos();
    },

    renderAlunos() {
        const tbody = document.getElementById('alunos');
        tbody.innerHTML = '';

        this.alunos.forEach((aluno, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.matricula}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.genero}</td>
                <td>
                    <button onclick="editarAluno(${index})">Editar</button>
                    <button onclick="excluirAluno(${index})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-aluno');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário

        const matricula = form.querySelector('input[name="matricula"]').value;
        const nome = form.querySelector('input[name="nome"]').value;
        const idade = form.querySelector('input[name="idade"]').value;
        const genero = form.querySelector('input[name="genero"]').value;

        const index = form.getAttribute('data-index');
        if (index) {
            gerenciadorAlunos.atualizarAluno(index, matricula, nome, idade, genero);
            form.removeAttribute('data-index');
        } else {
            gerenciadorAlunos.adicionarAluno(matricula, nome, idade, genero);
        }

        form.reset();
    });
});

function editarAluno(index) {
    const aluno = gerenciadorAlunos.alunos[index];
    const form = document.getElementById('form-aluno');

    form.querySelector('input[name="matricula"]').value = aluno.matricula;
    form.querySelector('input[name="nome"]').value = aluno.nome;
    form.querySelector('input[name="idade"]').value = aluno.idade;
    form.querySelector('input[name="genero"]').value = aluno.genero;

    form.setAttribute('data-index', index);
}

function excluirAluno(index) {
    gerenciadorAlunos.excluirAluno(index);
}
