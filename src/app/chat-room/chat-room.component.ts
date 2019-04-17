import { AuthService } from '../services/auth.service';
import { WebService} from '../services/websocket.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  private username: String;
  private email: String;
  private chatroom;
  private message: String;
  private roomId : String;
  messageArray: Array<{user: String, message: String}> = [];
  private isTyping = false;
  private currentUsername : string;
  nm : String;
  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebService,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.webSocketService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
      this.isTyping = false;
    });
    this.webSocketService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
    this.roomId = this.route.snapshot.paramMap.get('cid');
    let str = this.roomId;
      // var res_ = str.split("-");
    var res_ = str.split("-", 3);
  }

  private currentUser : Object;
  ngOnInit() {

    this.roomId = this.route.snapshot.paramMap.get('cid');
    let str = this.roomId;
      // var res_ = str.split("-");
    var res_ = str.split("-", 3);
    console.log(res_);
    this.AuthService.getProfile().subscribe( profile =>{
      this.currentUsername = profile.user.username  ;
      if(this.currentUsername == res_[0])this.username = res_[1];
      else this.username = res_[0];
      console.log(this.currentUsername + "   "+ this.username);
      this.currentUser = profile;
      this.chatroom = this.currentUsername + "-" + this.username;
      this.currentUsername < this.username ? this.chatroom = this.currentUsername + "-" + this.username 
      : this.chatroom = this.username + "-" + this.currentUsername;
      this.webSocketService.joinRoom({user: this.currentUsername, room: this.chatroom});
      this.AuthService.getChatRoomsChat(this.chatroom).subscribe(messages => {
        this.messageArray = messages.json();
      });
     },err=>{
       console.log(err);
       return false;
     });

  }

  sendMessage() {
    this.webSocketService.sendMessage({room: this.chatroom, user: this.currentUsername, message: this.message});
    this.message = '';
  }
  typing() {
    this.webSocketService.typing({room: this.chatroom, user: this.currentUsername});
  }


}  