import {Room} from './room';
import {Seat} from './seat';

export interface RoomSeat {
  roomSeatId: number;
  room: Room;
  seat: Seat;
}
