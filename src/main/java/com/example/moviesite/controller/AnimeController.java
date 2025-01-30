package com.example.moviesite.controller;

import com.example.moviesite.model.Anime;
import com.example.moviesite.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/anime")
public class AnimeController {

    @Autowired
    private AnimeRepository animeRepository;

    // Получение описания аниме по ID
    @GetMapping("/{animeId}/description")
    public ResponseEntity<String> getAnimeDescription(@PathVariable Long animeId) {
        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new RuntimeException("Аниме не найдено"));
        return ResponseEntity.ok(anime.getDescription());
    }

    // Получение всех аниме
    @GetMapping
    public ResponseEntity<Iterable<Anime>> getAllAnime() {
        return ResponseEntity.ok(animeRepository.findAll());
    }

    // Добавление нового аниме (для администраторов)
    @PostMapping
    public ResponseEntity<Anime> addAnime(@RequestBody Anime anime) {
        Anime savedAnime = animeRepository.save(anime);
        return ResponseEntity.ok(savedAnime);
    }
}