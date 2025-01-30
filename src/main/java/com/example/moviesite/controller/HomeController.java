package com.example.moviesite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/indexReg")
    public String indexReg() {
        return "redirect:/index"; // Redirects to the home page
    }
}
