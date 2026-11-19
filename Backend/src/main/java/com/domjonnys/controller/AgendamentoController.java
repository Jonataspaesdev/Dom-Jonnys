package com.domjonnys.controller;

import com.domjonnys.model.Agendamento;
import com.domjonnys.repository.AgendamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoController(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    @PostMapping
    public ResponseEntity<?> criarAgendamento(@RequestBody Agendamento agendamento) {
        if (agendamento.getData() != null && agendamento.getHorario() != null
                && agendamentoRepository.existsByDataAndHorario(agendamento.getData(), agendamento.getHorario())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Já existe um agendamento para esta data e horário.");
        }

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