const getRandomColor = (): string => {
  const randomValue = () => Math.floor(Math.random() * 256);
  return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
};

const RandomGradient = (colors: number): string[] => {
  const gradientColors: string[] = [];
  for (let i = 0; i < colors; i++) {
    gradientColors.push(getRandomColor());
  }
  return gradientColors;
};

export default RandomGradient;
