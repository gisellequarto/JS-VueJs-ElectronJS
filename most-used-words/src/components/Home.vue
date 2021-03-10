<template>
  <v-container class="home" fluid>
    <v-form>
      <v-file-input
        label="Upload Subtitles"
        prepend-icon="mdi-message-text"
        append-icon="mdi-send"
        outlined
        multiple
        chips
        v-model="files"
        @click:append="processSubtitles"
      />
    </v-form>

    <div class="pills">
      <Pill
        v-for="word in groupedWords"
        :key="word.name"
        :name="word.name"
        :amount="word.amount"
      />
    </div>
  </v-container>
</template>

<script>
import Pill from "./Pill";
import { ipcRenderer } from "electron";

export default {
  components: { Pill },
  data: function () {
    return {
      files: [],
      groupedWords: [],
    };
  },
  methods: {
    processSubtitles() {
      ipcRenderer.send("process-subtitles", this.files);

      ipcRenderer.on("process-subtitles", (event, resp) => {
        this.groupedWords = resp;
      });
    },
  },
};
</script>

<style>
.home {
  background-color: #d79922;
}
.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>