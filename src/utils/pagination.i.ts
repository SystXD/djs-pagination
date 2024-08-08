import {
  ButtonBuilder,
  EmbedBuilder,
  Message,
  InteractionResponse,
  CollectorFilter,
  ButtonInteraction,
} from "discord.js";

export interface PaginationOptions {
  EmbedsArray: EmbedBuilder[];
  ButtonsArray: ButtonBuilder[];
  Response: InteractionResponse | Message;
  filter?: CollectorFilter<[ButtonInteraction]>;
  collectorTime?: number;
}
