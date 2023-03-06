function linkifyText(text) {
  const linkTest =
    "https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}";
  return text
    .split(/\s+/)
    .map((part, index) => {
      if (part.match(linkTest)) {
        return `<a
          href="${part}"
          target="_blank"
          rel="noreferrer"
          class="text-primary"
        >
          ${part}
        </a>`;
      }
      if (part[0] === "@") {
        return `<a class="text-primary" >
          ${part}
        </a>`;
      }
      return part + " ";
    })
    .join(" ");
}
export default linkifyText;
