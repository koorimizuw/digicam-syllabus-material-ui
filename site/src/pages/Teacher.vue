<template>
  <syllabus-layout>
    <v-card width="1500" class="mx-auto teacher-title">
      <v-card-title>
        All
        <span class="teacher-length">{{ teachers.length }}</span>
        Teachers
        <v-spacer />
        <v-text-field v-model="searchText" append-icon="search" label="名前検索"></v-text-field>
      </v-card-title>
      <v-chip
        v-for="position in positions"
        :key="position.name"
        @click.native="() => setPosition(position.name)"
        class="ma-2"
        color="primary"
        link
        :outlined="searchPosition !== position.name"
        pill
      >{{position.name}}</v-chip>
      <syllabus-card :links="teachers" :card_col="4" />
    </v-card>
  </syllabus-layout>
  <!--
  <syllabus-layout class="teacher">
    <h1 class="syllabus-page-title">
      All
      <span class="syllabus-page-title-count">{{ teachers.length }}</span>Teachers
    </h1>

    <input class="syllabus-input" placeholder="名前検索" v-model="searchText" />

    <h2 class="syllabus-page-statistics-title">Positions</h2>

    <transition-group name="syllabus-tags" tag="nav">
      <syllabus-button
        v-for="position in positions"
        :class="[
          'position',
          (searchPosition && (position.name !== searchPosition)) 
          ? 'position-inactive'
          : 'position-active'
        ]"
        :link="position"
        :key="position.name"
        @click.native="() => setPosition(position.name)"
      />
    </transition-group>

    <h2 class="syllabus-page-statistics-title subject-margin">Teachers</h2>
    <transition-group name="syllabus-tags" tag="nav">
      <syllabus-button :link="link" v-for="link in teachers" :key="link.name" />
    </transition-group>
  </syllabus-layout>
  -->
</template>
<script>
import SyllabusCard from "../components/SyllabusCard";

export default {
  metaInfo: {
    title: "Teachers"
  },
  data() {
    return {
      searchText: "",
      searchPosition: ""
    };
  },
  computed: {
    teachers() {
      let teachers = this.$page.allTeacher.edges.map(edge => {
        const { name, id, subjects, position } = edge.node;
        return {
          extra: subjects.totalCount,
          name,
          position: position.trim() || "不明",
          url: `/teacher/${id}`
        };
      });

      teachers = teachers.filter(teacher => {
        if (this.searchText && !teacher.name.includes(this.searchText)) {
          return false;
        }
        if (this.searchPosition && teacher.position !== this.searchPosition) {
          return false;
        }
        return true;
      });

      return teachers;
    },
    positions() {
      let count = {};
      let positions = this.$page.allTeacher.edges.map(edge => {
        const position = edge.node.position.trim() || "不明";

        if (position) {
          count[position] = (count[position] || 0) + 1;
        }
      });
      return Object.entries(count).map(([k, v]) => ({
        name: k,
        extra: v,
        url: "#"
      }));
    }
  },
  methods: {
    setPosition(p) {
      this.searchPosition = this.searchPosition === p ? "" : p;
    }
  },
  components: {
    SyllabusCard
  }
};
</script>

<page-query>
query {
  allTeacher {
    edges {
      node {
        id
        name
        position
        subjects {
          totalCount
        }
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
.teacher {
  &-title {
    padding: 30px 40px;
  }
  &-length {
    margin: 5px;
    font-size: 1.2em;
    color: rgb(0, 147, 226);
  }
}
</style>
