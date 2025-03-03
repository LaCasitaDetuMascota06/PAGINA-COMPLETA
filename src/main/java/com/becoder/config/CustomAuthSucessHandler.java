package com.becoder.config;

import java.io.IOException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.becoder.entity.User;
import com.becoder.service.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthSucessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        // Obtener roles del usuario autenticado
        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());

        if (authentication.getPrincipal() instanceof CustomUser) {
            CustomUser customUser = (CustomUser) authentication.getPrincipal();
            User user = customUser.getUser();

            // Resetear intentos fallidos si el usuario existe
            if (user != null) {
                userService.resetAttempt(user.getEmail());
            }

            // Redirigir según el rol
            if (roles.contains("ROLE_ADMIN")) {
                response.sendRedirect("/admin/profile");
            } else if (roles.contains("ROLE_USER")) {
                response.sendRedirect("/user/profile");
            } else if (roles.contains("ROLE_PELUQUERA")) {
                response.sendRedirect("/peluquera/profile");
            } else if (roles.contains("ROLE_DOMICILIARIO")) {
                response.sendRedirect("/domiciliario/profile");
            } else {
                // Rol no definido
                response.sendRedirect("/403"); // Página de acceso denegado
            }
        } else {
            // Caso donde el principal no sea una instancia esperada
            response.sendRedirect("/error");
        }
    }
}
