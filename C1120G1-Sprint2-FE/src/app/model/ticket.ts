import {User} from './user';
import {Seat} from './seat';
import {TicketStatus} from './ticketStatus';
import {MovieTicket} from './movieTicket';

export interface Ticket {
  ticketId: number;
  createTime: string;
  user: User;
  seat: Seat;
  ticketStatus: TicketStatus;
  movieTicket: MovieTicket;
}
