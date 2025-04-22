import { UserService } from './../../chatServices/services/user.service';
import { Component, output, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatResponse, UserResponse } from '../../chatServices/models';
import { ChatService } from '../../chatServices/services';

@Component({
  selector: 'app-chat-list',
  imports: [CommonModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  @Input() chats: ChatResponse[] = [];
  searchNewContact = false;
  contacts: Array<UserResponse> = [];
  chatSelected = output<ChatResponse>();
  public userId: any;

  ngOnInit(): void {
    console.log('Initial chats in ngOnInit:', this.chats);
    this.getUserId();
  }

  trackChat(index: number, chat: ChatResponse) {
    return chat.id;
  }

  trackContact(index: number, contact: UserResponse) {
    return contact.id;
  }

  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {}

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
  searchContact() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.contacts = users;
        this.searchNewContact = true;
      },
    });
  }

  chatClicked(chat: ChatResponse) {
    this.chatSelected.emit(chat);
  }

  wrapMessage(lastMessage: string | undefined): string {
    if (lastMessage && lastMessage.length <= 20) {
      return lastMessage;
    }
    return lastMessage?.substring(0, 17) + '...';
  }

  selectContact(contact: UserResponse) {
    this.chatService
      .createChat({
        'sender-id': this.userId as number,
        'receiver-id': contact.id as number,
      })
      .subscribe({
        next: (res) => {
          const chat: ChatResponse = {
            id: res.response,
            name: contact.fullName,
            recipientOnline: contact.online,
            lastMessageTime: contact.lastSeen,
            senderId: this.userId,
            receiverId: contact.id,
          };
          this.chats.unshift(chat);
          this.searchNewContact = false;
          this.chatSelected.emit(chat);
        },
      });
  }
}
