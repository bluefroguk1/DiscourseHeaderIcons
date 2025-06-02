// header-icons-calendar.js

import { withPluginApi } from "discourse/lib/plugin-api";
import { iconNode } from "discourse-common/lib/icon-library";

export default {
  name: "header-icons-calendar",

  initialize(container) {
    withPluginApi("0.12.1", (api) => {
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
            console.warn("Error parsing shutter status", e);
          }

          return helper.h("li.header-dropdown-toggle", [
            helper.h(
              "a.icon",
              {
                href: "/calendar",
                title,
              },
              iconNode(icon)
            ),
          ]);
        });
      }
    });
  },
};
