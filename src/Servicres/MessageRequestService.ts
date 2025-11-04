import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageRequest } from '../Module';

@Injectable({ providedIn: 'root' })
export class MessageRequestService {
  private apiUrl = 'http://localhost:5183/api/MessageRequest';

  constructor(private http: HttpClient) {}

  sendMessage(request: MessageRequest): Observable<MessageRequest> {
    return this.http.post<MessageRequest>(this.apiUrl, request);
  }

  getMessages(): Observable<MessageRequest[]> {
    return this.http.get<MessageRequest[]>(this.apiUrl);
  }
}
