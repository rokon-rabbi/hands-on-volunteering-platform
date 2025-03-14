package com.volunteeringPlatform.volunteeringPlatformBackend.controller;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.Event;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.EventService;
import com.volunteeringPlatform.volunteeringPlatformBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event, @RequestHeader("Authorization") String token) {
        String username = userService.getUsernameFromToken(token);
        User creator = userService.getUserByEmail(username);
        event.setCreatedBy(creator);
        Event savedEvent = eventService.createEvent(event);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Event created successfully");
        response.put("eventId", savedEvent.getId());
        response.put("title", savedEvent.getTitle());
        response.put("date", savedEvent.getDateTime());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<?> getAllEvents(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location) {

        List<Event> events = eventService.getEvents(category, location);
        List<Map<String, Object>> eventList = new ArrayList<>();

        for (Event event : events) {
            Map<String, Object> eventData = new HashMap<>();
            eventData.put("eventId", event.getId());
            eventData.put("title", event.getTitle());
            eventData.put("date", event.getDateTime());
            eventData.put("location", event.getLocation());
            eventData.put("category", event.getCategory());
            eventList.add(eventData);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("events", eventList);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{eventId}/join")
    public ResponseEntity<?> joinEvent(@PathVariable UUID eventId, @RequestHeader("Authorization") String token) {
        String username = userService.getUsernameFromToken(token);
        User user = userService.getUserByEmail(username);
        eventService.addAttendee(eventId, user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Successfully joined the event");
        response.put("eventId", eventId.toString());
        response.put("user", username);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/{eventId}")
    public ResponseEntity<?> getEventDetails(@PathVariable UUID eventId, @RequestHeader("Authorization") String token) {
        try {
            String username = userService.getUsernameFromToken(token);
            Event event = eventService.getEventById(eventId);

            if (event == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
            }

            User user = userService.getUserByEmail(username);

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", user.getId());
            userInfo.put("username", user.getUsername());
            userInfo.put("email", user.getEmail());
            userInfo.put("role", user.getRole());
            userInfo.put("skills", user.getSkills());
            userInfo.put("causes", user.getCauses());

            Map<String, Object> eventDetails = new HashMap<>();
            eventDetails.put("eventId", event.getId());
            eventDetails.put("title", event.getTitle());
            eventDetails.put("description", event.getDescription());
            eventDetails.put("dateTime", event.getDateTime());
            eventDetails.put("location", event.getLocation());
            eventDetails.put("category", event.getCategory());
            eventDetails.put("createdBy", userInfo);

            return ResponseEntity.ok(eventDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching the event details");
        }
    }


}
