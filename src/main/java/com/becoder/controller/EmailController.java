package com.becoder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.becoder.service.EmailService;

import java.util.Arrays;
import java.util.List;

@Controller
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Endpoint para mostrar la página con el formulario
    @GetMapping("/envio-correo")
    public String mostrarPagina(Model model) {
        return "envioCorreo";  // Devuelve la vista HTML
    }

    // Endpoint para enviar correos masivos
    @PostMapping("/enviar-correo")
    public String enviarCorreo(
            @RequestParam("destinatarios") String destinatarios, 
            @RequestParam("asunto") String asunto, 
            @RequestParam("mensaje") String mensaje,
            Model model) {
        try {
            // Dividir los correos por comas y enviarlos
            List<String> listaDestinatarios = Arrays.asList(destinatarios.split(","));
            emailService.enviarCorreo(listaDestinatarios, asunto, mensaje);

            model.addAttribute("mensaje", "Correos enviados con éxito");
        } catch (Exception e) {
            model.addAttribute("mensaje", "Error al enviar los correos: " + e.getMessage());
        }
        return "envioCorreo";  // Vuelve a mostrar la página con el mensaje
    }
}
