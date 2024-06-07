import type { RoomMessage } from "@/stores/models";

export interface ChatWindowShareState {
  selectedReplyMessage: RoomMessage;
  updateSelectedReplyMessage: (value: RoomMessage |  null) => void;
}