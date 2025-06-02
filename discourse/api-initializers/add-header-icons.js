// javascripts/discourse/api-initializers/add-header-icons.js

import { apiInitializer } from "discourse/lib/api";
import { iconNode } from "discourse-common/lib/icon-library";

export default apiInitializer("0.12.1", (api) => {
  // Add Calendar Icon for all users
  api.decorateWidget("header-icons:before", (helper) => {
    return helper.h("li.header-dropdown-toggle", [
      helper.h(
        "a.icon",
        {
          href: "/calendar",
          title: "SLMS Calendar",
        },
        iconNode("calendar-alt")
      ),
    ]);
  });

  // Add Shutter Tool Status Icon for members (if setting is enabled)
  const currentUser = api.getCurrentUser();

  if (
    settings.shutter_tick_enable &&
    currentUser &&
    currentUser.groups.some((group) => group.name === "members")
  ) {
    api.decorateWidget("header-icons:before", (helper) => {
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
        console.warn("Invalid shutter status JSON", e);
      }

      return helper.h("li.header-dropdown-toggle", [
        helper.h(
          "a.icon",
          {
            href: "/calendar",
            title: title,
          },
          iconNode(icon)
        ),
      ]);
    });
  }
});
