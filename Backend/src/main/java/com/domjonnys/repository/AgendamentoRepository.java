package com.domjonnys.repository;

import com.domjonnys.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    boolean existsByDataAndHorario(LocalDate data, String horario);
}