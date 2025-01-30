package com.example.moviesite.controller;

import com.example.moviesite.model.Film;
import com.example.moviesite.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/films")
public class FilmController {

    @Autowired
    private FilmRepository filmRepository;

    // Получение описания фильма по ID
    @GetMapping("/{filmId}/description")
    public ResponseEntity<String> getFilmDescription(@PathVariable Long filmId) {
        Film film = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Фильм не найден"));
        return ResponseEntity.ok(film.getDescription());
    }

    // Получение всех фильмов
    @GetMapping
    public ResponseEntity<Iterable<Film>> getAllFilms() {
        return ResponseEntity.ok(filmRepository.findAll());
    }

    // Добавление нового фильма (для администраторов)
    @PostMapping
    public ResponseEntity<Film> addFilm(@RequestBody Film film) {
        Film savedFilm = filmRepository.save(film);
        return ResponseEntity.ok(savedFilm);
    }
}