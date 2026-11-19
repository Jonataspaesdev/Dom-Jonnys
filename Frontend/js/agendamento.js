const FERIADOS = new Set([
    '2026-01-01',
    '2026-04-21',
    '2026-05-01',
    '2026-09-07',
    '2026-10-12',
    '2026-11-02',
    '2026-11-15',
    '2026-11-20',
    '2026-12-25',
    '2027-01-01',
    '2027-04-21',
    '2027-05-01',
    '2027-09-07',
    '2027-10-12',
    '2027-11-02',
    '2027-11-15',
    '2027-11-20',
    '2027-12-25'
]);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAgendamento');
    const mensagemEl = document.getElementById('mensagem');

    if (!form || !mensagemEl) return;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value.trim();

        const agendamento = {
            clienteInfo: document.getElementById('clienteInfo').value.trim(),
            servico: document.getElementById('servico').value.trim(),
            data: data,
            horario: horario,
            status: 'PENDENTE'
        };

        if (!agendamento.clienteInfo || !agendamento.servico || !agendamento.data || !agendamento.horario) {
            mensagemEl.style.color = 'red';
            mensagemEl.innerText = 'Preencha todos os campos obrigatórios.';
            return;
        }

        const dataObj = new Date(`${data}T12:00:00`);
        if (Number.isNaN(dataObj.getTime()) || dataObj.getDay() === 0 || FERIADOS.has(data)) {
            mensagemEl.style.color = 'red';
            mensagemEl.innerText = 'Não há atendimento aos domingos e feriados. Funcionamento: seg. a sáb., das 09:00 às 19:00.';
            return;
        }

        if (horario < '09:00' || horario > '19:00') {
            mensagemEl.style.color = 'red';
            mensagemEl.innerText = 'A barbearia funciona de segunda a sábado, das 09:00 às 19:00.';
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
                const erroTexto = await response.text();
                mensagemEl.style.color = 'red';
                mensagemEl.innerText = erroTexto || `Erro ao realizar o agendamento (HTTP ${response.status}).`;
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            mensagemEl.style.color = 'red';
            mensagemEl.innerText = 'Não foi possível conectar ao servidor.';
        }
    });
});