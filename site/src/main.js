// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import SyllabusButton from "~/components/SyllabusButton.vue";
import SyllabusList from "~/components/SyllabusList.vue";
import SyllabusStatistics from "~/components/SyllabusStatistics.vue";
import SyllabusSection from "~/components/SyllabusSection.vue";

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

export default function (Vue, { router, isClient, appOptions, head }) {
  Vue.component("syllabus-layout", DefaultLayout);
  Vue.component("syllabus-button", SyllabusButton);
  Vue.component("syllabus-list", SyllabusList);
  Vue.component("syllabus-statistics", SyllabusStatistics);
  Vue.component("syllabus-section", SyllabusSection);

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  })

  const opts = {
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
  } //opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify)

  appOptions.vuetify = new Vuetify(opts);

}