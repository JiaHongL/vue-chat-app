import type { RoomMessage } from "@/stores/models";
import type { Observable } from "rxjs";
import type { Ref } from "vue/dist/vue.js";

export interface ChatWindowShareState {
  chatBoxScrollToBottomObs$:Observable<any>;
  selectedReplyMessage: Ref<RoomMessage>;
  updateSelectedReplyMessage: (value: any |  null) => void;
}