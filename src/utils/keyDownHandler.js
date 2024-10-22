// 엔터키 동작
export const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const inputs = document.querySelectorAll(
      'input[type="text"], input[type="number"],input[type="tel"], input[type="date"], textarea, select'
    );
    const currentInput = e.target;
    const index = Array.prototype.indexOf.call(inputs, currentInput);

    if (index >= 0 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  }
};
