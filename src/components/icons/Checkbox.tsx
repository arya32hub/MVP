const CheckedBox = () => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="16" height="16" rx="4" fill="#00236C" />
      <path
        d="M4 9L6.5 11.5L12 5.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const UncheckedBox = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="1" width="15" height="15" rx="3.5" stroke="#A0AEBC" />
  </svg>
);

const UncheckAll = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#A0AEBC" />
    <path d="M5 8H11" stroke="#A0AEBC" stroke-linecap="round" />
  </svg>
);

const CheckAll = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="16" height="16" rx="4" fill="#00236C" />
    <path d="M5 8H11" stroke="white" stroke-linecap="round" />
  </svg>
);

export { CheckAll, CheckedBox, UncheckAll, UncheckedBox };
