document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAgendamento');
    const mensagemEl = document.getElementById('mensagem');

    if (!form || !mensagemEl) return;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const agendamento = {
            clienteInfo: document.getElementById('clienteInfo').value.trim(),
            servico: document.getElementById('servico').value.trim(),
            data: document.getElementById('data').value,
            horario: document.getElementById('horario').value,
            status: 'PENDENTE'
        };

        if (!agendamento.clienteInfo || !agendamento.servico || !agendamento.data || !agendamento.horario) {
            mensagemEl.style.color = 'red';
            mensagemEl.innerText = 'Preencha todos os campos obrigatórios.';
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/agendamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agendamento)
            });

            if (response.ok) {
                mensagemEl.style.color = 'green';
                mensagemEl.innerText = 'Agendamento realizado com sucesso!';
                form.reset();
            } else {
                mensagemEl.style.color = 'red';
                mensagemEl.innerText = `Erro ao realizar o agendamento (HTTP ${response.status}).`;
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            mensagemEl.style.color = 'red';
            mensagemEl.innerText = 'Não foi possível conectar ao servidor.';
        }
    });
});