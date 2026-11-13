import { useEffect, useRef } from 'react';

import {
  type GestureResponderEvent,
  TouchableOpacity as RNTouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

const PRESS_LOCK_MS = 500;

export function TouchableOpacity({ onPress, ...rest }: TouchableOpacityProps) {
  const lockedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handlePress = (event: GestureResponderEvent) => {
    if (lockedRef.current) {
      return;
    }

    lockedRef.current = true;
    onPress?.(event);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      lockedRef.current = false;
    }, PRESS_LOCK_MS);
  };

  return <RNTouchableOpacity {...rest} onPress={handlePress} />;
}