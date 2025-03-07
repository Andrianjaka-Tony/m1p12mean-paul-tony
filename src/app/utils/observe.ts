export function observe(element: HTMLElement, foo: () => void) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      foo();
      observer.disconnect();
    }
  });

  observer.observe(element);
}
