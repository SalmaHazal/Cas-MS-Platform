import { AuthService } from './../../services/auth-service/auth.service';
import { MessageRequest } from './../../chatServices/models/message-request';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatResponse, MessageResponse } from '../../chatServices/models';
import { ChatService, MessageService, UserService } from '../../chatServices/services';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { FormsModule } from '@angular/forms';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Notification } from './notification';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, NavbarComponent, ChatListComponent, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  chats: Array<ChatResponse> = [];
  selectedChat: ChatResponse = {};
  chatMessages: MessageResponse[] = [];
  messageContent = '';
  userId: any;
  socketClient: any = null;
  notificationSubscription: any;

  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    if (this.socketClient !== null) {
      this.socketClient.disconnect();
      this.notificationSubscription.unsubscribe();
      this.socketClient = null;
    }
  }

  ngOnInit(): void {
    this.getUserId();
    this.getAllChats();
  }

  initWebSocket() {
    if (this.authService.email) {
      let ws = new SockJS('http://localhost:8082/ws');
      this.socketClient = Stomp.over(ws);
      const userIdString = this.userId.toString();
      const subUrl = `/user/${userIdString}/chat`;
      this.socketClient.connect({'Authorization': 'Bearer ' + this.authService.accessToken},
        () => {
          console.log('WebSocket connected');
          this.notificationSubscription = this.socketClient.subscribe(subUrl,
            (message: any) => {
              console.log('Message received:', message.body);
              const notification: Notification = JSON.parse(message.body);
              this.handleNotification(notification);
            },
            (error: any) => {
              console.error('Error while subscribing:', error);
            }
          );
        }
      );
    }
  }

  handleNotification(notification: Notification) {
    if (!notification) return;
    if (this.selectedChat && this.selectedChat.id === notification.chatId) {
      switch (notification.type) {
        case 'MESSAGE':
        case 'IMAGE':
          const message: MessageResponse = {
            senderId: notification.senderId,
            receiverId: notification.receiverId,
            content: notification.content,
            type: notification.messageType,
            media: notification.media,
            createdAt: new Date().toString()
          };
          if (notification.type === 'IMAGE') {
            this.selectedChat.lastMessage = 'Attachment';
          } else {
            this.selectedChat.lastMessage = notification.content;
          }
          this.chatMessages.push(message);
          break;
        case 'SEEN':
          this.chatMessages.forEach(m => m.state = 'SEEN');
          break;
      }
    } else {
      const destChat = this.chats.find(c => c.id === notification.chatId);
      if (destChat && notification.type !== 'SEEN') {
        if (notification.type === 'MESSAGE') {
          destChat.lastMessage = notification.content;
        } else if (notification.type === 'IMAGE') {
          destChat.lastMessage = 'Attachment';
        }
        destChat.lastMessageTime = new Date().toString();
        destChat.unreadCount! += 1;
      } else if (notification.type === 'MESSAGE') {
        const newChat: ChatResponse = {
          id: notification.chatId,
          senderId: notification.senderId,
          receiverId: notification.receiverId,
          lastMessage: notification.content,
          name: notification.chatName,
          unreadCount: 1,
          lastMessageTime: new Date().toString()
        };
        this.chats.unshift(newChat);
      }
    }
  }

  getUserId(): void {
    this.userService.currentUser().subscribe({
      next: (id) => {
        this.userId = id;
        console.log('User ID fetched:', this.userId); // Debug log
        this.initWebSocket(); // Initialize WebSocket only after userId is set
      },
      error: (err) => {
        console.error('Error fetching user ID:', err);
      },
    });
  }

  private getAllChats() {
    this.chatService.getChatsByReceiver().subscribe({
      next: (res) => {
        this.chats = res;
        console.log(this.chats);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  chatSelected(chatResponse: ChatResponse) {
    this.selectedChat = chatResponse;
    this.getAllChatMessages(chatResponse.id as string);
    this.setMessagesToSeen();
    this.selectedChat.unreadCount = 0;
  }

  setMessagesToSeen() {
    this.messageService
      .setMessagesToSeen({
        'chat-id': this.selectedChat.id as string,
      })
      .subscribe({
        next: () => {},
      });
  }

  getAllChatMessages(chatId: string) {
    this.messageService
      .getMessages({
        'chat-id': chatId,
      })
      .subscribe({
        next: (messages) => {
          this.chatMessages = messages;
        },
      });
  }

  isSelfMessage(message: MessageResponse) {
    return message.senderId === this.userId;
  }

  uploadMedia(target: EventTarget | null) {
    // const file = this.extractFileFromTarget(target);
    // if (file !== null) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (reader.result) {
    //       const mediaLines = reader.result.toString().split(',')[1];
    //       this.messageService.uploadMedia({
    //         'chat-id': this.selectedChat.id as string,
    //         body: {
    //           file: file
    //         }
    //       }).subscribe({
    //         next: () => {
    //           const message: MessageResponse = {
    //             senderId: this.getSenderId(),
    //             receiverId: this.getReceiverId(),
    //             content: 'Attachment',
    //             type: 'IMAGE',
    //             state: 'SENT',
    //             media: [mediaLines],
    //             createdAt: new Date().toString()
    //           };
    //           this.chatMessages.push(message);
    //         }
    //       });
    //     }
    //   }
    //   reader.readAsDataURL(file);
    // }
  }

  keyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  onClick() {
    this.setMessagesToSeen();
  }

  sendMessage() {
    if (this.messageContent) {
      const messageRequest: MessageRequest = {
        chatId: this.selectedChat.id,
        senderId: this.getSenderId(),
        receiverId: this.getReceiverId(),
        content: this.messageContent,
        type: 'TEXT',
      };

      this.messageService
        .saveMessage({
          body: messageRequest,
        })
        .subscribe({
          next: () => {
            const message: MessageResponse = {
              senderId: this.getSenderId(),
              receiverId: this.getReceiverId(),
              content: this.messageContent,
              type: 'TEXT',
              state: 'SENT',
              createdAt: new Date().toString(),
            };
            this.selectedChat.lastMessage = this.messageContent;
            this.chatMessages.push(message);
            this.messageContent = '';
          },
        });
    }
  }

  getSenderId(): number {
    if (this.selectedChat.senderId === this.userId) {
      return this.selectedChat.senderId as number;
    }
    return this.selectedChat.receiverId as number;
  }

  getReceiverId(): number {
    if (this.selectedChat.senderId === this.userId) {
      return this.selectedChat.receiverId as number;
    }
    return this.selectedChat.senderId as number;
  }
}
