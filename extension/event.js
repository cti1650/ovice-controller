"use strict";

{
  chrome.runtime.onInstalled.addListener(() => {
    const MenuItems = [{ id: "test", title: "test" }];
    MenuItems.forEach((item) => {
      chrome.contextMenus.create({ ...item, contexts: ["all"] });
    });
  });

  chrome.action.onClicked.addListener((tab) => {
    // chrome.scripting.executeScript(
    //   {
    //     target: { tabId: tab.id },
    //     func: () => {
    //       return window.getSelection().toString();
    //     },
    //   },
    //   (selection) => {
    //     if (selection) {
    //       chrome.windows.create({
    //         url:
    //           'https://www.deepl.com/translator#en/ja/' +
    //           (selection[0].result
    //             ? encodeURIComponent(selection[0].result)
    //             : ''),
    //         type: 'popup',
    //         width: 700,
    //         height: 700,
    //       });
    //     }
    //   }
    // );
  });

  // メニューをクリック時に実行
  chrome.contextMenus.onClicked.addListener((info) => {
    // const url =
    //   "https://www.deepl.com/translator" +
    //   (info.menuItemId
    //     ? "#" +
    //       info.menuItemId.replace("_", "/") +
    //       "/" +
    //       encodeURIComponent(info.selectionText)
    //     : "");
    // console.log(url);
    // chrome.windows.create({
    //   url: url,
    //   type: "popup",
    //   width: 700,
    //   height: 700,
    // });
    // chrome.tabs.get(tabId, async (tab) => {
    //   let muted = !tab.mutedInfo.muted;
    //   console.log(tab);
    //   // await chrome.tabs.update(tabId, { muted });
    //   console.log(`Tab ${tab.id} is ${muted ? "muted" : "unmuted"}`);
    // });
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (!~tab.url.indexOf(".ovice.in/")) return;
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["js/script.js"],
          },
          (callback) => {
            console.log(callback);
          }
        );
        console.log(tab);
      });
    });
  });
}
