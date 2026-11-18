document.getElementById('formAgendamento').addEventListener('submit', async function(event) {
    event.preventDefault();

    const agendamento = {
        clienteInfo: document.getElementById('clienteInfo').value,
        servico: document.getElementById('servico').value,
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value
    };

    try {
        const response = await fetch('http://localhost:8080/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agendamento)
        });

        if (response.ok) {
            document.getElementById('mensagem').style.color = 'green';
            document.getElementById('mensagem').innerText = 'Agendamento realizado com sucesso!';
            document.getElementById('formAgendamento').reset();
        } else {
            document.getElementById('mensagem').style.color = 'red';
            document.getElementById('mensagem').innerText = 'Erro ao realizar o agendamento.';
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        document.getElementById('mensagem').style.color = 'red';
        document.getElementById('mensagem').innerText = 'Não foi possível conectar ao servidor.';
    }
});