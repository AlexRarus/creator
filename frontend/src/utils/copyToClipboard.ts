function fallbackCopyTextToClipboard(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // Avoid scrolling to bottom
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '0';
  textarea.style.height = '0';
  textarea.style.position = 'fixed';

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textarea);

  return Promise.resolve();
}

export async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    return await fallbackCopyTextToClipboard(text);
  }

  return await navigator.clipboard.writeText(text);
}
