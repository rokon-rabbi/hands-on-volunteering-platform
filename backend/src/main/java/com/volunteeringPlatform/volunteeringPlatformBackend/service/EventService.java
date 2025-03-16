package com.volunteeringPlatform.volunteeringPlatformBackend.service;

import com.volunteeringPlatform.volunteeringPlatformBackend.model.Event;
import com.volunteeringPlatform.volunteeringPlatformBackend.model.User;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.EventRepository;
import com.volunteeringPlatform.volunteeringPlatformBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getEvents(String category, String location) {
        if (category != null && location != null) {
            return eventRepository.findByCategoryAndLocation(category, location);
        } else if (category != null) {
            return eventRepository.findByCategory(category);
        } else if (location != null) {
            return eventRepository.findByLocation(location);
        } else {
            return eventRepository.findAll();
        }
    }

    public void addAttendee(UUID eventId, User user) {
        Optional<Event> event = eventRepository.findById(eventId);
        event.ifPresent(e -> {
            e.getAttendees().add(user);
            eventRepository.save(e);
        });
    }
    public Event getEventById(UUID eventId) {

        Optional<Event> event = eventRepository.findById(eventId);
        return event.orElse(null);
    }

}
