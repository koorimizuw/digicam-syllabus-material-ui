// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import SyllabusButton from "~/components/SyllabusButton.vue";
import SyllabusList from "~/components/SyllabusList.vue";
import SyllabusStatistics from "~/components/SyllabusStatistics.vue";

export default function (Vue, { router, head, isClient }) {
  Vue.component("syllabus-layout", DefaultLayout);
  Vue.component("syllabus-button", SyllabusButton);
  Vue.component("syllabus-list", SyllabusList);
  Vue.component("syllabus-statistics", SyllabusStatistics);
}
