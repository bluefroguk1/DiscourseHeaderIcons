// javascripts/discourse/api-initializers/add-header-icons.js

import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.12.1", (api) => {
  api.renderInOutlet("header-extra", "slms-header-icons");
});
