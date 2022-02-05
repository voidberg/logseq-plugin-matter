import "@logseq/libs";
import App from "./App.svelte";

const css = (t, ...args) => String.raw(t, ...args);

function createModel() {
  return {
    show() {
      logseq.showMainUI();
    },
  };
}

function main() {
  new App({
    target: document.querySelector("#app"),
  });

  const key = logseq.baseInfo.id;

  logseq.setMainUIInlineStyle({
    zIndex: 11
  });

  // Various event handlers
  logseq.App.onBlockRendererMounted(console.log)
  logseq.App.onPageFileMounted(console.log)
  logseq.App.onSidebarVisibleChanged(console.log)

  const openIconName = 'template-plugin-open';

  logseq.provideStyle(css`
    div[data-injected-ui=${openIconName}-${key}] {
      display: inline-flex;
      align-items: center;
      opacity: 0.55;
      font-weight: 500;
      padding: 0 5px;
      position: relative;
    }

    div[data-injected-ui=${openIconName}-${key}]:hover {
      opacity: 0.9;
    }
  `);

  logseq.provideUI({
    key: openIconName,
    path: "#search",
    template: `
      <a data-on-click="show"
         style="opacity: .6; display: inline-flex;">⚙️</a>
    `,
  });
}

logseq.ready(createModel()).then(main).catch(console.error);
