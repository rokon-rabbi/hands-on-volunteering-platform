package com.volunteeringPlatform.volunteeringPlatformBackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controller {
    @GetMapping("/hello")
   public String getHello() {
       return "Hello World";
   }
}
