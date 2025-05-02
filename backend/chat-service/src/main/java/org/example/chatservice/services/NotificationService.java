package org.example.chatservice.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.chatservice.entities.Notification;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    public void sendNotification(Long userId, Notification notification) {

        String email = userService.getEmailById(userId);
        log.info("Sending ws notification to {} with payload {}", email, notification);

        messagingTemplate.convertAndSendToUser(
                email,
                "/chat",
                notification);
    }
}
