import { MessageRequest } from './../../chatServices/models/message-request';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatResponse, MessageResponse } from '../../chatServices/models';
import { ChatService, MessageService, UserService } from '../../chatServices/services';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, NavbarComponent, ChatListComponent, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  chats: Array<ChatResponse> = [];
  selectedChat: ChatResponse = {};
  chatMessages: MessageResponse[] = [];
  messageContent = '';
  userId: any;

  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllChats();
    this.getUserId();
  }

  getUserId(): void {
    this.userService.currentUser().subscribe({
      next: (id) => {
        this.userId = id;
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
