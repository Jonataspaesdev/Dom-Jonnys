window.carregarAgendamentos = async function() {
    const tabela = document.getElementById('tabelaAgendamentos');
    if (!tabela) return;
    
    tabela.innerHTML = '<tr><td colspan="7">A carregar agendamentos...</td></tr>';

    try {
        const response = await fetch('http://localhost:8080/api/agendamentos');
        
        if (response.ok) {
            const agendamentos = await response.json();
            tabela.innerHTML = '';

            if (agendamentos.length === 0) {
                tabela.innerHTML = '<tr><td colspan="7">Nenhum agendamento encontrado.</td></tr>';
                return;
            }

            agendamentos.forEach(item => {
                const tr = document.createElement('tr');
                
                const statusClass = item.status === 'CONFIRMADO' ? 'status-confirmado' : 'status-pendente';
                
                tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.clienteInfo}</td>
                    <td>${item.servico}</td>
                    <td>${item.data}</td>
                    <td>${item.horario}</td>
                    <td><span class="${statusClass}">${item.status || 'PENDENTE'}</span></td>
                    <td>
                        ${item.status !== 'CONFIRMADO' ? `<button class="btn-confirmar" onclick="confirmarAgendamento(${item.id})">Confirmar</button>` : ''}
                        <button class="btn-cancelar" onclick="cancelarAgendamento(${item.id})">Cancelar</button>
                    </td>
                `;
                tabela.appendChild(tr);
            });
        } else {
            tabela.innerHTML = '<tr><td colspan="7" style="color:red;">Erro ao carregar os agendamentos.</td></tr>';
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        tabela.innerHTML = '<tr><td colspan="7" style="color:red;">Erro ao conectar com o servidor.</td></tr>';
    }
};

window.confirmarAgendamento = async function(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/agendamentos/${id}/confirmar`, {
            method: 'PUT'
        });
        if (response.ok) {
            carregarAgendamentos();
        } else {
            alert('Erro ao confirmar agendamento.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
};

window.cancelarAgendamento = async function(id) {
    if (confirm('Tem a certeza de que deseja cancelar este agendamento?')) {
        try {
            const response = await fetch(`http://localhost:8080/api/agendamentos/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                carregarAgendamentos();
            } else {
                alert('Erro ao apagar agendamento.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }
};

document.addEventListener('DOMContentLoaded', window.carregarAgendamentos);