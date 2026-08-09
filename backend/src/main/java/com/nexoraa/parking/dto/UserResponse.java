package com.nexoraa.parking.dto;


import lombok.*;

import java.time.LocalDateTime;

import com.nexoraa.parking.entity.UserRole;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private UserRole role;

    private Boolean active;

    private LocalDateTime createdAt;
}
