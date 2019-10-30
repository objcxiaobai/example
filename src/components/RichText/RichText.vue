<template>
  <div class="common-base" :class="{ fullscreen: fullscreen }">
    <form method="post">
      <textarea :id="tinymceId"></textarea>
      <div class="editor-custom-btn-container">
        <EditorImage
          class="editor-upload-btn"
          @successCBK="imageSuccessCBK"
        ></EditorImage>
      </div>
    </form>
  </div>
</template>
<script>
import load from "@/utils/dynamicLoadScript.js";
import EditorImage from "@/components/EditorImage/EditorImage.vue";
const tinymceCDN =
  "https://cdn.tiny.cloud/1/e69e5ijodh4tp0hniqipro1ss7bpeq2v831mslyr0usqkvqn/tinymce/5/tinymce.min.js";
export default {
  name: "rich-text",
  components: {
    EditorImage
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tinymceId: "vue-tinymce-1",
      //富文本对象是否初始化
      hasInit: false,
      //   监听富文本对象事件是否触发
      hasChange: false,
      fullscreen: false
    };
  },

  methods: {
    init() {
      // 动态加载<scirpt></scirpt>
      load(tinymceCDN, err => {
        if (err) {
          this.$message.error(err.message);
          return;
        }
        // 初始化富文本
        this.initTinymce();
      });
    },
    // 给富文本赋值
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    // 获取富文本的值
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    initTinymce() {
      const self = this;
      window.tinymce.init({
        // 绑定dom
        selector: `#${this.tinymceId}`,
        a_plugin_option: true,
        a_configuration_option: 400,
        // 删除菜单栏
        menubar: false,
        // 设置编辑高度
        min_height: 500,
        //每一个编辑器实例初始化时会执行你指定一个函数名
        // editor是编辑器实例对象引用
        init_instance_callback: function(editor) {
          //初始化为"",不会执行
          if (self.value) {
            editor.setContent(self.value);
          }
          self.hasInit = true;
          //  监听以下事件
          editor.on("NodeChange Change KeyUp SetContent", () => {
            self.hasChange = true;
            self.$emit("input", editor.getContent());
          });
        },
        setup(editor) {
          editor.on("FullscreenStateChanged", e => {
            self.fullscreen = e.state;
          });
        }
      });
    },
    imageSuccessCBK(arr) {
      const self = this;
      arr.forEach(item => {
        window.tinymce
          .get(self.tinymceId)
          .insertContent(`<img class="wscnph" src="${item.url}" />`);
      });
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        console.log("执行观察者", val);
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || "")
        );
      }
    }
  }
};
</script>

<style scoped>
.common-base {
  background: #fff;
  position: relative;
  line-height: normal;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
