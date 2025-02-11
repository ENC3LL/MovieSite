package com.example.moviesite.model;

import jakarta.persistence.*;
import lombok.Data;

@Data // Lombok автоматически генерирует геттеры, сеттеры, toString и т.д.
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;
}