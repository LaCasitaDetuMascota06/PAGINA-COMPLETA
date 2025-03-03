package com.reporte.reporte.service;

import com.reporte.reporte.entity.Persona;
import com.reporte.reporte.repository.Personarepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Personaservice {

    private final Personarepository personaRepository;

    public Personaservice(Personarepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    /**
     * Obtiene todas las personas de la base de datos.
     *
     * @return Lista de personas.
     */
    public List<Persona> obtenerTodasLasPersonas() {
        return personaRepository.findAll();
    }

    /**
     * Obtiene una persona por su ID.
     *
     * @param id ID de la persona.
     * @return Persona encontrada o null si no existe.
     */
    public Persona obtenerPersonaPorId(Long id) {
        Optional<Persona> persona = personaRepository.findById(id);
        return persona.orElse(null);
    }

    /**
     * Guarda una nueva persona o actualiza una existente.
     *
     * @param persona Objeto Persona a guardar.
     */
    public void guardarPersona(Persona persona) {
        personaRepository.save(persona);
    }

    /**
     * Elimina una persona por su ID.
     *
     * @param id ID de la persona a eliminar.
     */
    public void eliminarPersona(Long id) {
        if (!personaRepository.existsById(id)) {
            throw new RuntimeException("La persona con ID " + id + " no existe.");
        }
        personaRepository.deleteById(id);
    }
    
}

