package com.volunteeringPlatform.volunteeringPlatformBackend;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class VolunteeringPlatformBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VolunteeringPlatformBackendApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedHeaders("Authorization", "Content-Type")
						.allowedMethods("GET", "POST", "DELETE", "PUT")
						.allowedOriginPatterns("*")
						.allowCredentials(true);
			}
		};
	}
}