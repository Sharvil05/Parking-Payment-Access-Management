package com.nexoraa.parking.config;


import com.nexoraa.parking.entity.User;
import com.nexoraa.parking.entity.UserRole;
import com.nexoraa.parking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initializeData() {

        return args -> {

            // Create default ADMIN if it doesn't exist
            if (!userRepository.existsByEmail(
                    "admin@parking.com")) {

                User admin = User.builder()
                        .name("Parking Admin")
                        .email("admin@parking.com")
                        .password(
                                passwordEncoder.encode("Admin@123")
                        )
                        .phone("9999999999")
                        .role(UserRole.ADMIN)
                        .active(true)
                        .build();

                userRepository.save(admin);

                System.out.println(
                        "Default ADMIN user created"
                );
            }

            /*
             * Convert existing plain-text Rahul password
             * to BCrypt.
             */
            userRepository
                    .findByEmail("rahul@gmail.com")
                    .ifPresent(user -> {

                        String password =
                                user.getPassword();

                        if (password != null
                                && !password.startsWith("$2")) {

                            user.setPassword(
                                    passwordEncoder.encode(
                                            password
                                    )
                            );

                            userRepository.save(user);

                            System.out.println(
                                    "Rahul password converted to BCrypt"
                            );
                        }
                    });
        };
    }
}