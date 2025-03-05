export function splitRows(
  element: HTMLElement,
  styleClass: string = ''
): string[] {
  const words = element.innerText.split(' ');
  const lines = [];
  let currentLine = '';

  const tempSpan = document.createElement('span');
  tempSpan.className = `${tempSpan.className} ${styleClass}`;
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'absolute';
  tempSpan.style.whiteSpace = 'nowrap';
  document.body.appendChild(tempSpan);

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    tempSpan.innerText = testLine;

    if (tempSpan.offsetWidth > element.clientWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  lines.push(currentLine);
  document.body.removeChild(tempSpan);
  return lines;
}
