package com.domjonnys.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "agendamentos")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String servico;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private String horario;

    @Column(nullable = false)
    private String clienteInfo;

    private String status = "PENDENTE";

    public Agendamento() {}

    public Agendamento(String servico, LocalDate data, String horario, String clienteInfo) {
        this.servico = servico;
        this.data = data;
        this.horario = horario;
        this.clienteInfo = clienteInfo;
    }

    public Long getId() { return id; }
    public String getServico() { return servico; }
    public void setServico(String servico) { this.servico = servico; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public String getHorario() { return horario; }
    public void setHorario(String horario) { this.horario = horario; }
    public String getClienteInfo() { return clienteInfo; }
    public void setClienteInfo(String clienteInfo) { this.clienteInfo = clienteInfo; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}