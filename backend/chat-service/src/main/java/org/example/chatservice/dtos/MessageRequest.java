package org.example.chatservice.dtos;

import lombok.*;
import org.example.chatservice.entities.MessageType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageRequest {

    private String content;
    private Long senderId;
    private Long receiverId;
    private MessageType type;
    private String chatId;
}
