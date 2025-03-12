import gsap from 'gsap';

type Status = 'success' | 'error' | 'warning' | 'info';
const color = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
};

export function toast(
  status: Status = 'success',
  title: string = '',
  message: string = ''
) {
  const element = document.createElement('div');
  element.className = `bg-[#111] max-w-sm w-fit z-100 fixed bottom-5 right-5 rounded-lg border border-[#222] p-4`;
  element.innerHTML = `
    <div class="flex items-end text-lg leading-none gap-2">
      <div class="w-2 aspect-square -translate-y-[3px] rounded-full ${color[status]}"></div>
      <p>${title}</p>
    </div>
    <p class="text-sm font-light opacity-60 mt-2 leading-normal">${message}</p>
  `;

  document.body.appendChild(element);
  gsap.fromTo(
    element,
    { y: '200%' },
    { y: 0, duration: 0.4, ease: 'power1.out' }
  );
  setTimeout(() => {
    gsap.fromTo(
      element,
      { y: 0 },
      {
        y: '200%',
        duration: 0.4,
        ease: 'power1.out',
        onComplete: () => {
          document.body.removeChild(element);
        },
      }
    );
  }, 5000);
}
