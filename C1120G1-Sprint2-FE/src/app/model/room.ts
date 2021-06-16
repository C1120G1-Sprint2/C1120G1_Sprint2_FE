import {RoomStatus} from './roomStatus';

export interface Room {
  roomId: number;
  roomName: string;
  roomStatus: RoomStatus;
}
