import type { ReactNode, CSSProperties } from "react";

interface ScalableTextProps {
  children: ReactNode;
  size: number; // размер в vw единицах
  className?: string;
  style?: CSSProperties;
  marginLeft?: number; // отступ слева в vw единицах
  maxWidth?: number; // максимальная ширина в vw единицах
  leading?: number; // межстрочный интервал в vw единицах (опционально)
  autoLeading?: boolean; // автоматический расчет leading на основе размера
}

export function ScalableText({
  children,
  size,
  className = "",
  style = {},
  marginLeft = 0,
  maxWidth,
  leading,
  autoLeading = true,
}: ScalableTextProps) {
  const calculatedLeading = autoLeading ? size * 1.2 : undefined;
  const finalLeading = leading || calculatedLeading;

  const textStyle: CSSProperties = {
    fontSize: `${size}vw`,
    lineHeight: finalLeading ? `${finalLeading}vw` : undefined,
    marginLeft: marginLeft ? `${marginLeft}vw` : undefined,
    maxWidth: maxWidth ? `${maxWidth}vw` : undefined,
    margin: maxWidth ? "0 auto" : undefined,
    ...style,
  };

  return (
    <div className={className} style={textStyle}>
      {children}
    </div>
  );
}
