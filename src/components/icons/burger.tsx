import React from "react";

export default function BurgerIcon({ className }: { className?: string }) {
  return (
    <svg width="25" height="18" viewBox="0 0 25 18" className={className}>
      <rect width="25" height="2.94118" />
      <rect y="7.35156" width="25" height="2.94118" />
      <rect y="14.7031" width="25" height="2.94118" />
    </svg>
  )
}
