package com.example.moviesite.controller;

import com.example.moviesite.model.User;
import com.example.moviesite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Отображение страницы регистрации/логина
    @GetMapping("/indexReg")
    public String indexReg() {
        return "indexReg"; // Возвращает шаблон indexReg.html
    }

    // Обработка регистрации (без реальной аутентификации)
    @PostMapping("/handleAuth")
    public ResponseEntity<String> handleAuth(@RequestBody AuthRequest authRequest) {
        // Создаем нового пользователя
        User user = new User();
        user.setUsername(authRequest.username);
        user.setEmail(authRequest.email);
        user.setPassword(authRequest.password); // В реальности нужно хэшировать пароль
        userRepository.save(user);

        // Возвращаем успешный ответ и перенаправляем на главную страницу
        return ResponseEntity.ok("redirect:/");
    }

    // DTO для входящих данных
    static class AuthRequest {
        public boolean isLogin; // Не используется в фейковой регистрации
        public String username;
        public String email;
        public String password;
    }
}