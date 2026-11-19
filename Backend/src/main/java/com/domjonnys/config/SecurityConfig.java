package com.domjonnys.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Integra a configuração do CorsConfig com o Spring Security
            .cors(Customizer.withDefaults())
            // Desativa a proteção CSRF para permitir requisições POST/PUT/DELETE do front-end
            .csrf(csrf -> csrf.disable())
            // Libera o carregamento de frames (necessário para o H2 Console funcionar na página)
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))
            // Autoriza qualquer requisição sem pedir autenticação nesta fase
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            );

        return http.build();
    }
}