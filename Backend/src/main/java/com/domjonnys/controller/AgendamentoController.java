package com.domjonnys.controller;

import com.domjonnys.model.Agendamento;
import com.domjonnys.repository.AgendamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private static final LocalTime HORARIO_ABERTURA = LocalTime.of(9, 0);
    private static final LocalTime HORARIO_FECHAMENTO = LocalTime.of(19, 0);

    private static final Set<LocalDate> FERIADOS = Set.of(
            LocalDate.of(2026, 1, 1),   // Confraternização Universal
            LocalDate.of(2026, 4, 21),  // Tiradentes
            LocalDate.of(2026, 5, 1),   // Dia do Trabalhador
            LocalDate.of(2026, 9, 7),   // Independência do Brasil
            LocalDate.of(2026, 10, 12), // Nossa Senhora Aparecida
            LocalDate.of(2026, 11, 2),  // Finados
            LocalDate.of(2026, 11, 15), // Proclamação da República
            LocalDate.of(2026, 11, 20), // Dia Nacional de Zumbi e da Consciência Negra
            LocalDate.of(2026, 12, 25), // Natal
            LocalDate.of(2027, 1, 1),   // Confraternização Universal
            LocalDate.of(2027, 4, 21),  // Tiradentes
            LocalDate.of(2027, 5, 1),   // Dia do Trabalhador
            LocalDate.of(2027, 9, 7),   // Independência do Brasil
            LocalDate.of(2027, 10, 12), // Nossa Senhora Aparecida
            LocalDate.of(2027, 11, 2),  // Finados
            LocalDate.of(2027, 11, 15), // Proclamação da República
            LocalDate.of(2027, 11, 20), // Dia Nacional de Zumbi e da Consciência Negra
            LocalDate.of(2027, 12, 25)  // Natal
    );

    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoController(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    @PostMapping
    public ResponseEntity<?> criarAgendamento(@RequestBody Agendamento agendamento) {
        if (agendamento.getData() == null || agendamento.getHorario() == null || agendamento.getHorario().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Informe data e horário para o agendamento.");
        }

        if (agendamento.getData().getDayOfWeek() == DayOfWeek.SUNDAY || FERIADOS.contains(agendamento.getData())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Não há atendimento aos domingos e feriados. Funcionamento: seg. a sáb., das 09:00 às 19:00.");
        }

        final LocalTime horarioSolicitado;
        try {
            horarioSolicitado = LocalTime.parse(agendamento.getHorario().trim());
        } catch (DateTimeParseException ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Formato de horário inválido.");
        }

        if (horarioSolicitado.isBefore(HORARIO_ABERTURA) || horarioSolicitado.isAfter(HORARIO_FECHAMENTO)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("A barbearia funciona de segunda a sábado, das 09:00 às 19:00.");
        }

        String horarioLimpo = agendamento.getHorario().trim();

        if (agendamentoRepository.existsByDataAndHorario(agendamento.getData(), horarioLimpo)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Já existe um agendamento para esta data e horário.");
        }

        agendamento.setHorario(horarioLimpo);

        if (agendamento.getStatus() == null || agendamento.getStatus().isBlank()) {
            agendamento.setStatus("PENDENTE");
        }

        Agendamento novoAgendamento = agendamentoRepository.save(agendamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAgendamento);
    }

    @GetMapping
    public ResponseEntity<List<Agendamento>> listarAgendamentos() {
        List<Agendamento> agendamentos = agendamentoRepository.findAll();
        return ResponseEntity.ok(agendamentos);
    }

    @PutMapping("/{id}/confirmar")
    public ResponseEntity<Agendamento> confirmarAgendamento(@PathVariable Long id) {
        return agendamentoRepository.findById(id).map(agendamento -> {
            agendamento.setStatus("CONFIRMADO");
            Agendamento atualizado = agendamentoRepository.save(agendamento);
            return ResponseEntity.ok(atualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarAgendamento(@PathVariable Long id) {
        if (agendamentoRepository.existsById(id)) {
            agendamentoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}