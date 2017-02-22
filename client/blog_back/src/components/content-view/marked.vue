<template>
  <div class="md-panel">
    <div class="editor-toolbar">
      <tool-items v-for="(toolItem, index) in toolbarItems" @select="handleSelect"  :class="toolItem.className" :title="toolItem.title" :tabIndex="index" ></tool-items>
    </div>
    <div class="md-editor">
         <textarea ref="markdown" :value="value" @input="handleInput"></textarea>
    </div>
  </div>
</template>

<script>

  import marked from 'marked';
  import highgihtjs from 'highlight.js';
  import _ from 'lodash';

  marked.setOptions({
      highlight: function (code) {
        return highgihtjs.highlightAuto(code).value;
      }
  });

  export default {
      name: 'markDown',
      props: ['value'],
      data () {
          return {
            mode: 'edit',
            total: 0,
            toolbarItems: [
              {title: 'Bold', 'className': 'fa fa-bold'},
              {title: 'Heading', 'className': 'fa fa-header'},
              {title: 'Italic', 'className': 'fa fa-italic'},
              {title: 'Quote', 'className': 'fa fa-quote-left'},
              {title: 'Generic List', 'className': 'fa fa-list-ul'},
              {title: 'Numbered List', 'className': 'fa fa-list-ol'},
              {title: 'Create Link', 'className': 'fa fa-link'},
              {title: 'Insert Image', 'className': 'fa fa-picture-o'},
              {title: 'Toggle Preview', 'className': 'fa fa-eye'},
              {title: 'Toggle Split', 'className': 'fa fa-columns'},
              {title: 'Summary', 'className': 'fa fa-info-circle'},
              {title: 'code', 'className': 'fa fa-code'},
            ],
            form: {}
          }
      },
    components: {
       'toolItems' : {
         render(h) {
           return h('a',
             {
               'class': this.className,
               'attrs': {
                 tabIndex: this.tabIndex,
                 title: this.title
               },
               on: {
                   click: this.select
               }
             },
           )
         },
         props: {
           title: '',
           className: '',
           tabIndex: ''
         },
         data: function () {
           return {
             counter: 0
           }
         },
         methods: {
            select() {
              this.$emit('select',this.tabIndex)
            }
         },

       }
    },

    computed: {

    },
    methods: {
      handleSelect (key) {
        switch (key) {
          case 0:
            this._boldText();
            break;
          case 1:
            this._headerText();
            break;
          case 2:
            this._italicText();
            break;
          case 3:
            this._quoteText();
            break;
          case 4:
            this._genericList();
            break;
          case 5:
            this._numberedList();
            break;
          case 6:
            this._link();
            break;
          case 7:
            this._imgLink();
            break;
          case 8:
            this._preview();
            break;
          case 9:
            this._split();
            break;
          case 10:
            this._summary();
            break;
          case 11:
            this._code();
            break;
        }
      },
      handleInput: _.debounce(function (e) {
          console.log(this.value);
        let value = e.target.value;
        this.$emit('input', value);
      }, 300),
      _preInputText (text, preStart, preEnd) {
        let textControl = this.$refs.markdown;
        const start = textControl.selectionStart;
        const end = textControl.selectionEnd;
        const origin= this.value;
        console.log(textControl);
        console.log(start + ' ,' + end + ',' + origin);
        if (start !== end) {
            const exist = origin.slice(start, end);
            text = text.slice(0, preStart) + exist + text.slice(preEnd);
            preEnd = preStart + exist.length;

            let input =  origin.slice(0, start) + text + origin.slice(end);

            this.$emit('input', input);
        }

      },
      _boldText () {
        this._preInputText('**加粗字体**', 2, 6);
      },
      _headerText() {
//        this._preInputText('_斜体文字_', 1, 5);
      },
      _italicText() {
        this._preInputText('_斜体文字_', 1, 5);
      },
      _quoteText() {
        this._preInputText('> 引用', 3, 5);
      },
      _genericList() {

      },
      _numberedList() {

      },
      _link() {

      },
      _imgLink() {

      },
      _preview() {

      },
      _split() {

      },
      _summary() {

      },
      _code() {
        this._preInputText('```\ncode block\n```', 5, 15)
      }






    }
  }



//  require('simplemde/dist/simplemde.min.css');
//  import simplemde from 'simplemde'
//  import moment from 'moment';
//  import highlightJs from 'highlight.js';

//  export default {
//    props: ['value'],
//    data() {
//      let form = {}
//      return { form }
//    },
//    mounted() {
//      this.mde = new simplemde({
//        element: this.$refs.area,
//        autofocus: true,
//        renderingConfig : {
//          singleLineBreaks: false,
//          codeSyntaxHighlighting: true
//        },
//        toolbar: [
//          'bold',
//          'italic',
//          'strikethrough',
//          'heading',
//          'heading-smaller',
//          'heading-bigger',
//          'heading-1',
//          'heading-2',
//          'heading-3',
//          'quote',
//          'unordered-list',
//          'ordered-list',
//          'clean-block',
//          'link',
//          'image',
//          'table',
//          'horizontal-rule',
//          'preview',
//          'side-by-side',
//          'fullscreen',
//          'guide',
//          'code'
//        ]
//      });
//
//      this.mde.value(this.value);
//      this.mde.codemirror.on('change', () => {
//        this.$emit('input', this.mde.value());
//      })
//    },
//    watch: {
//      // this would update on every keystroke, so maybe you have to remove it.
//      // component should work nonetheless, but if an external source changed the value, it would not reflect in this component.
//      value(newVal) { this.mde.value(newVal) }
//    },
//    beforeDestroy() {
//      this.mde.toTextArea();  // clean up when component gets destroyed.
//    }
//
//  }
</script>

<style lang="scss" scoped>

  .editor-toolbar {
    position: relative;
    opacity: .6;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    padding: 0 10px;
    border-top: 1px solid #bbb;
    border-left: 1px solid #bbb;
    border-right: 1px solid #bbb;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .editor-toolbar:hover, .editor-wrapper input.title:focus, .editor-wrapper input.title:hover,.md-editor:hover {
    opacity: .8;
  }
  .editor-toolbar:before {
    margin-bottom: 8px;
  }
  .editor-toolbar:after, .editor-toolbar:before {
    display: block;
    content: ' ';
    height: 1px;
  }
  .editor-toolbar:after {
    margin-top: 8px;
  }
  .editor-toolbar:after, .editor-toolbar:before {
    display: block;
    content: ' ';
    height: 1px;
  }
  .editor-toolbar a {
    display: inline-block;
    text-align: center;
    text-decoration: none!important;
    color: #2c3e50!important;
    width: 30px;
    height: 30px;
    margin: 0;
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
  }
  .editor-toolbar a:before {
    line-height: 30px;
  }
  .editor-toolbar a.active, .editor-toolbar a:hover, .md-editor:hover{
    /*background: #fcfcfc;*/
    border-color: #95a5a6;
  }
  .md-editor {
    position: relative;
    opacity: .6;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    padding: 0 10px;
    border-bottom: 1px solid #bbb;
    border-top: 1px solid #bbb;
    border-left: 1px solid #bbb;
    border-right: 1px solid #bbb;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .md-panel .md-editor textarea{
    box-sizing: border-box;
    display: block;
    border-style: none;
    resize: none;
    outline: 0;
    height: 100%;
    min-height: 500px;
    width: 100%;
    padding: 15px 15px 0;
  }
  .md-panel{
    margin-bottom: 20px;
  }
</style>
