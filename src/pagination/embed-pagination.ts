import {
  AutocompleteInteraction,
  ButtonBuilder,
  EmbedBuilder,
  BaseInteraction,
  Interaction,
  Message,
  InteractionResponse,
  MessageComponentInteraction,
  CollectorFilter,
  ButtonInteraction,
  EmbedAssertions,
  ButtonComponent,
  ComponentType,
  ActionRowBuilder,
} from "discord.js";
import type { PaginationOptions } from "../utils/pagination.i";
export class EmbedPagination {
  public constructor({
    EmbedsArray,
    ButtonsArray,
    Response,
    filter,
    collectorTime,
  }: PaginationOptions) {
    if (
      EmbedsArray.some((embed) => !(embed instanceof EmbedBuilder)) ||
      EmbedsArray.length == 0
    )
      console.warn("Unable to locate any valid embed from array");
    if (ButtonsArray.length > 4)
      console.warn("There are more than 4 buttons in the array");

    let currentPage = 0;
    Response.createMessageComponentCollector({
      filter: (filter as CollectorFilter<any>) ?? undefined,
      componentType: ComponentType.Button,
      time: collectorTime ?? 120_000,
    })
      .on("collect", async (interaction) => {
        try {
          switch (interaction.customId) {
            case "index-page":
              currentPage = 0;
              interaction.update({ embeds: [EmbedsArray[currentPage]] });
              break;

            case "last-page":
              currentPage = EmbedsArray.length - 1;
              interaction.update({ embeds: [EmbedsArray[currentPage]] });
              break;

            case "next-page":
              if (currentPage < EmbedsArray.length - 1) currentPage++;
              interaction.update({ embeds: [EmbedsArray[currentPage]] });
              break;

            case "previous-page":
              if (currentPage > 0) currentPage--;
              interaction.update({ embeds: [EmbedsArray[currentPage]] });
              break;
            default:
              break;
          }
        } catch (error) {
          console.error(error);
        }
      })
      .on("end", () => {
        ButtonsArray.forEach((button) => button.setDisabled(true));
        Response.edit({
          components: [
            new ActionRowBuilder<ButtonBuilder>().addComponents(ButtonsArray),
          ],
        });
      });
  }
}
