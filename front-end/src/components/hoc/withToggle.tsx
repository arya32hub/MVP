"use client";

import { ComponentType, useState } from "react";

interface WithToggleProps {
  onToggleChange?: (isToggled: boolean) => void; // Callback when toggle state changes
  isChecked?: boolean;
}

const withToggle = <P extends object>(
  OnComponent: ComponentType<P>,
  OffComponent: ComponentType<P>,
) => {
  const ToggleHOC: React.FC<P & WithToggleProps> = ({
    onToggleChange,
    isChecked,
    ...props
  }) => {
    const [isToggled, setIsToggled] = useState(isChecked);

    const toggle = () => {
      const newToggleState = !isToggled;
      setIsToggled(newToggleState);

      // Call the callback if provided
      if (onToggleChange) {
        onToggleChange(newToggleState);
      }
    };

    return (
      <div onClick={toggle}>
        {isToggled ? (
          <OnComponent {...(props as P)} />
        ) : (
          <OffComponent {...(props as P)} />
        )}
      </div>
    );
  };

  return ToggleHOC;
};

export { withToggle };
