package com.domjonnys.repository;

import com.domjonnys.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByIsCurso(Boolean isCurso);
}