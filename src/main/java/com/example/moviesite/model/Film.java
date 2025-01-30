package com.example.moviesite.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "films")
public class Film {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double rating;

    @Column(name = "\"year\"") // Используем кавычки

    private String genres;
    private String country;
    private String duration;
    private String ageRating;
}