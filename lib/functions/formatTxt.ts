import parse from "html-react-parser";
export default function formatTxt(title: string): JSX.Element {
  // eslint-disable-next-line no-useless-escape
  let formatedText = title;
  const underline = /(\[u\]*]).*?(\[\/u\]*])/gm;
  let items = title.match(underline);
  if (items) {
    items.forEach((item: string) => {
      item = item.split("[u]").join("");
      item = item.split("[/u]").join("");
      formatedText = formatedText.replace(
        "[u]" + item + "[/u]",
        '<span style="text-decoration: underline">' + item + "</span>"
      );
    });
  }
  const bold = /(\[b\]*]).*?(\[\/b\]*])/gm;
  items = title.match(bold);
  if (items) {
    items.forEach((item: string) => {
      item = item.split("[b]").join("");
      item = item.split("[/b]").join("");
      formatedText = formatedText.replace(
        "[b]" + item + "[/b]",
        '<span style="font-weight: bold">' + item + "</span>"
      );
    });
  }

  const italic = /(\[i\]*]).*?(\[\/i\]*])/gm;
  items = title.match(italic);
  if (items) {
    items.forEach((item: string) => {
      item = item.split("[i]").join("");
      item = item.split("[/i]").join("");
      formatedText = formatedText.replace(
        "[i]" + item + "[/i]",
        '<span style="font-style: italic;">' + item + "</span>"
      );
    });
  }

  const sup = /(\[sup\]*]).*?(\[\/sup\]*])/gm;
  items = title.match(sup);
  if (items) {
    items.forEach((item: string) => {
      item = item.split("[sup]").join("");
      item = item.split("[/sup]").join("");
      formatedText = formatedText.replace(
        "[sup]" + item + "[/sup]",
        "<sup>" + item + "</sup>"
      );
    });
  }

  const span = /(\[span\]*]).*?(\[\/span\]*])/gm;
  items = title.match(span);
  if (items) {
    items.forEach((item: string) => {
      item = item.split("[span]").join("");
      item = item.split("[/span]").join("");
      formatedText = formatedText.replace(
        "[span]" + item + "[/span]",
        "<span>" + item + "</span>"
      );
    });
  }

  const br = /(\[br\]*])/gm;
  formatedText = formatedText.replace(br, "<br />");

  return parse(formatedText) as JSX.Element;
}
