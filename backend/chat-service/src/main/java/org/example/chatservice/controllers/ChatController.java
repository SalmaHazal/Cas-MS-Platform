package org.example.chatservice.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.chatservice.dtos.ChatResponse;
import org.example.chatservice.dtos.StringResponse;
import org.example.chatservice.feignClient.UserFeignClient;
import org.example.chatservice.services.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chats")
@RequiredArgsConstructor
@Tag(name = "Chat")
public class ChatController {
    private final ChatService chatService;
    private final UserFeignClient userFeignClient;

    @PostMapping
    public ResponseEntity<StringResponse> createChat(
            @RequestParam(name = "sender-id") Long senderId,
            @RequestParam(name = "receiver-id") Long receiverId
    ) {
        final String chatId = chatService.createChat(senderId, receiverId);
        StringResponse response = StringResponse.builder()
                .response(chatId)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ChatResponse>> getChatsByReceiver() {
        Long currentUserId = userFeignClient.currentUserId();
        return ResponseEntity.ok(chatService.getChatsByReceiverId(currentUserId));
    }
}
