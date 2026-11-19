function escapeHtml(valor) {
    return String(valor ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatarDataBR(dataISO) {
    if (!dataISO) return '';
    const partes = String(dataISO).split('-');
    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataISO;
}

window.carregarAgendamentos = async function() {
    const tabela = document.getElementById('tabelaAgendamentos');
    if (!tabela) return;

    tabela.innerHTML = '<tr><td colspan="7">A carregar agendamentos...</td></tr>';

    try {
        const response = await fetch('http://localhost:8080/api/agendamentos');

        if (response.ok) {
            const agendamentos = await response.json();
            tabela.innerHTML = '';

            if (!Array.isArray(agendamentos) || agendamentos.length === 0) {
                tabela.innerHTML = '<tr><td colspan="7">Nenhum agendamento encontrado.</td></tr>';
                return;
            }

            agendamentos.sort((a, b) => {
                const chaveA = `${a.data || ''} ${a.horario || ''}`;
                const chaveB = `${b.data || ''} ${b.horario || ''}`;
                return chaveA.localeCompare(chaveB);
            });

            agendamentos.forEach(item => {
                const tr = document.createElement('tr');
                const statusTexto = item.status || 'PENDENTE';
                const statusClass = statusTexto === 'CONFIRMADO' ? 'status-confirmado' : 'status-pendente';
                const dataFormatada = formatarDataBR(item.data);

                tr.innerHTML = `
                    <td>${escapeHtml(item.id)}</td>
                    <td>${escapeHtml(item.clienteInfo)}</td>
                    <td>${escapeHtml(item.servico)}</td>
                    <td>${escapeHtml(dataFormatada)}</td>
                    <td>${escapeHtml(item.horario)}</td>
                    <td><span class="${statusClass}">${escapeHtml(statusTexto)}</span></td>
                    <td>
                        ${statusTexto !== 'CONFIRMADO' ? `<button class="btn-confirmar" onclick="confirmarAgendamento(${Number(item.id)})">Confirmar</button>` : ''}
                        <button class="btn-cancelar" onclick="cancelarAgendamento(${Number(item.id)})">Cancelar</button>
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
            await window.carregarAgendamentos();
        } else {
            alert(`Erro ao confirmar agendamento (HTTP ${response.status}).`);
        }
    } catch (error) {
        console.error('Erro ao confirmar:', error);
        alert('Falha de comunicação com o servidor ao confirmar.');
    }
};

window.cancelarAgendamento = async function(id) {
    if (!confirm('Tem a certeza de que deseja cancelar este agendamento?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/agendamentos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await window.carregarAgendamentos();
        } else {
            alert(`Erro ao apagar agendamento (HTTP ${response.status}).`);
        }
    } catch (error) {
        console.error('Erro ao cancelar:', error);
        alert('Falha de comunicação com o servidor ao cancelar.');
    }
};

document.addEventListener('DOMContentLoaded', window.carregarAgendamentos);