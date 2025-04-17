package org.example.chatservice.dtos;

import lombok.*;
import org.example.chatservice.entities.MessageState;
import org.example.chatservice.entities.MessageType;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse {
    private Long id;
    private String content;
    private MessageType type;
    private MessageState state;
    private Long senderId;
    private Long receiverId;
    private LocalDateTime createdAt;
    private byte[] media;
}
