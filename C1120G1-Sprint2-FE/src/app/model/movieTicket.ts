import {Room} from './room';
import {Movie} from './movie';
import {ShowTime} from './showTime';
import {ProjectionType} from './projectionType';

export interface MovieTicket {
  movieTicketId: number;
  showDate: string;
  ticketPrice: string;
  room: Room;
  movie: Movie;
  showTime: ShowTime;
  projectionType: ProjectionType;
}
