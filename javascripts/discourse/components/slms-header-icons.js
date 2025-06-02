import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class SlmsHeaderIcons extends Component {
  @service currentUser;

  @tracked shutterIcon = "question";
  @tracked shutterTitle = "Open status: unknown";

  constructor() {
    super(...arguments);

    if (
      settings.shutter_tick_enable &&
      this.currentUser?.groups?.some((g) => g.name === "members")
    ) {
      try {
        const cache = JSON.parse(settings.tool_status);
        const shutter = cache.tools?.[4];
        if (shutter) {
          if (shutter.status) {
            this.shutterIcon = "check";
            this.shutterTitle = `Open since ${shutter.date}`;
          } else {
            this.shutterIcon = "times";
            this.shutterTitle = `Closed since ${shutter.date}`;
          }
        }
      } catch (e) {
        console.warn("Failed to parse tool_status JSON", e);
      }
    }
  }

  get showShutterIcon() {
    return (
      settings.shutter_tick_enable &&
      this.currentUser?.groups?.some((g) => g.name === "members")
    );
  }
}
