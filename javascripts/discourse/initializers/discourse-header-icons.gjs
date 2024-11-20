import { apiInitializer } from "discourse/lib/api";
import dIcon from "discourse-common/helpers/d-icon";

export default apiInitializer("1.34.0", (api) => {
  api.headerIcons.add(
    "discourse-header-icons",
    <template>
      <li>
        <a id="calendar-alt " class="icon" href="/calendar" title="SLMS Calendar">
          {{dIcon "calendar-alt"}}
        </a>
      </li>
    </template>,
    { before: "search" }
  );
});