import {SeatStatus} from './seatStatus';
import {Row} from './row';
import {Columns} from './columns';
import {SeatType} from './seatType';

export interface Seat {
  seatId: number;
  seatStatus: SeatStatus;
  row: Row;
  columns: Columns;
  seatType: SeatType;
}
