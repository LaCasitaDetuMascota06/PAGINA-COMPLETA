package com.reporte.reporte.repository;


import com.reporte.reporte.entity.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Personarepository extends JpaRepository<Persona, Long> {
}

