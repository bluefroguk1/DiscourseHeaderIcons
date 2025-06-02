import { apiInitializer } from "discourse/lib/api";
import { iconNode } from "discourse-common/lib/icon-library";

export default apiInitializer("0.12.1", (api) => {
  const currentUser = api.getCurrentUser();

  api.renderInOutlet("header-extra", () => {
    const nodes = [];

    // Always show calendar icon
    nodes.push(
      h("li.header-dropdown-toggle", [
        h(
          "a.icon",
          {
            href: "/calendar",
            title: "SLMS Calendar",
          },
          iconNode("calendar-alt")
        ),
      ])
    );

    // Show shutter icon for members only
    if (
      settings.shutter_tick_enable &&
      currentUser?.groups?.some((g) => g.name === "members")
    ) {
      let icon = "question";
      let title = "Open status: unknown";

      try {
        const cache = JSON.parse(settings.tool_status);
        const shutter = cache.tools?.[4];
        if (shutter) {
          if (shutter.status) {
            icon = "check";
            title = `Open since ${shutter.date}`;
          } else {
            icon = "times";
            title = `Closed since ${shutter.date}`;
          }
        }
      } catch (e) {
        console.warn("Error parsing tool_status:", e);
      }

      nodes.push(
        h("li.header-dropdown-toggle", [
          h(
            "a.icon",
            {
              href: "/calendar",
              title: title,
            },
            iconNode(icon)
          ),
        ])
      );
    }

    return h("ul.header-icons", nodes);
  });
});
