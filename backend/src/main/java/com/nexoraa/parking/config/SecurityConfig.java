package com.nexoraa.parking.config;

import com.nexoraa.parking.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

        http

                .cors(cors -> {})

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // CORS preflight
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // Authentication
                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        // Swagger
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // Dashboard
                        .requestMatchers(
                                "/api/dashboard/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "STAFF"
                        )

                        // Parking
                        .requestMatchers(
                                "/api/parking/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "STAFF"
                        )

                        // Payments
                        .requestMatchers(
                                "/api/payments/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "STAFF"
                        )

                        // Vehicles and slots
                        .requestMatchers(
                                "/api/vehicles/**",
                                "/api/parking-slots/**"
                        ).hasAnyRole(
                                "ADMIN",
                                "STAFF"
                        )

                        // Users
                        .requestMatchers(
                                "/api/users/**"
                        ).hasRole("ADMIN")

                        // Everything else
                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }
}