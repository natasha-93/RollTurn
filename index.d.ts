declare module '*.svg' {
  const content: React.ComponentType<{
    width?: number;
    height?: number;
    style?: React.CSSProperties;
  }>;
  export default content;
}
