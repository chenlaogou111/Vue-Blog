<template>
  <div>
    <!-- 调用富文本编辑器? -->
    <quill-editor
      ref="myTextEditor"
      class="editor"
      v-model="editor"
      :options="editorOption"
      @change="onEditorChange"
      @blur="onEditorBlur"
    >
    </quill-editor>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  props: {
    defaultCont: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editorOption: {
        placeholder: "编辑文章内容",
      },
      editor: defaultCont,
    };
  },
  methods: {
    onEditorChange() {
      // console.log(this.editor);
    },
    onEditorBlur() {
      this.$emit("storage-edit", this.editor);
    },
  },
  components: { quillEditor },
};
</script>